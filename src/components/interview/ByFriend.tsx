import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Code, Mic, MicOff } from "lucide-react";
import { io, Socket } from "socket.io-client";

export default function ByFriendInterview() {
  const { sessionId } = useParams();

  const [code, setCode] = useState("");
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [friendConnected, setFriendConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");

  const socketRef = useRef<Socket | null>(null);
  const localAudioRef = useRef<HTMLAudioElement | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  const initializeWebRTC = async () => {
    try {
      setConnectionStatus("connecting");

      // Get local audio stream with better audio settings
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        video: false,
      });
      localStreamRef.current = stream;

      if (localAudioRef.current) {
        localAudioRef.current.srcObject = stream;
      }

      // Create peer connection with better configuration
      const peerConnection = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
          { urls: "stun:stun2.l.google.com:19302" },
        ],
        iceCandidatePoolSize: 10,
      });

      // Add local stream to connection
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      // Handle remote stream
      peerConnection.ontrack = (event) => {
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = event.streams[0];
          setConnectionStatus("connected");
          setIsCallActive(true);
        }
      };

      // ICE candidate handling
      peerConnection.onicecandidate = (event) => {
        if (event.candidate && socketRef.current) {
          socketRef.current.emit("ice-candidate", {
            roomId: sessionId,
            candidate: event.candidate,
          });
        }
      };

      // Connection state handling
      peerConnection.onconnectionstatechange = () => {
        switch (peerConnection.connectionState) {
          case "connected":
            setConnectionStatus("connected");
            break;
          case "disconnected":
          case "failed":
            setConnectionStatus("disconnected");
            setIsCallActive(false);
            break;
          case "closed":
            setConnectionStatus("disconnected");
            setIsCallActive(false);
            break;
        }
      };

      // Debugging logs
      peerConnection.oniceconnectionstatechange = () => {
        console.log("ICE connection state:", peerConnection.iceConnectionState);
      };
      peerConnection.onicegatheringstatechange = () => {
        console.log("ICE gathering state:", peerConnection.iceGatheringState);
      };
      peerConnection.onsignalingstatechange = () => {
        console.log("Signaling state:", peerConnection.signalingState);
      };

      peerConnectionRef.current = peerConnection;
      setIsMicEnabled(true);
    } catch (error) {
      console.error("Error initializing WebRTC:", error);
      setConnectionStatus("failed");
    }
  };

  const cleanupWebRTC = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
    setIsCallActive(false);
    setIsMicEnabled(false);
    setConnectionStatus("disconnected");
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      const newMuteState = !audioTracks[0].enabled;
      audioTracks.forEach((track) => {
        track.enabled = newMuteState;
      });
      setIsMuted(newMuteState);
    }
  };

  useEffect(() => {
    socketRef.current = io("http://localhost:4000", {
      withCredentials: true,
      transports: ["websocket"],
    });
    const socket = socketRef.current;

    if (sessionId) {
      socket.emit("join-room", sessionId);
    }

    socket.on("chat-message", (message: string) => {
      setChatMessages((prev) => [...prev, `Friend: ${message}`]);
    });

    socket.on("code-update", (incomingCode: string) => {
      setCode(incomingCode);
    });

    socket.on("friend-connected", () => {
      setFriendConnected(true);
      initializeWebRTC();
    });

    // WebRTC signaling handlers
    socket.on("offer", async (offer) => {
      if (!peerConnectionRef.current) return;

      try {
        await peerConnectionRef.current.setRemoteDescription(offer);
        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);
        socket.emit("answer", { roomId: sessionId, answer });
      } catch (error) {
        console.error("Error handling offer:", error);
      }
    });

    socket.on("answer", async (answer) => {
      if (!peerConnectionRef.current) return;
      try {
        await peerConnectionRef.current.setRemoteDescription(answer);
      } catch (error) {
        console.error("Error handling answer:", error);
      }
    });

    socket.on("ice-candidate", async (candidate) => {
      if (!peerConnectionRef.current) return;
      try {
        await peerConnectionRef.current.addIceCandidate(candidate);
      } catch (error) {
        console.error("Error adding ICE candidate:", error);
      }
    });

    socket.on("create-offer", async () => {
      if (!peerConnectionRef.current) return;

      try {
        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);
        socket.emit("offer", { roomId: sessionId, offer });
      } catch (error) {
        console.error("Error creating offer:", error);
      }
    });

    return () => {
      cleanupWebRTC();
      socket.disconnect();
    };
  }, [sessionId]);

  const sendMessage = () => {
    if (chatInput.trim() === "") return;
    setChatMessages((prev) => [...prev, `You: ${chatInput}`]);
    socketRef.current?.emit("chat-message", {
      roomId: sessionId,
      message: chatInput,
    });
    setChatInput("");
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    socketRef.current?.emit("code-change", {
      roomId: sessionId,
      code: newCode,
    });
  };

  return (
    <div className="h-screen bg-black text-white p-4">
      <div className="text-sm text-green-400 mb-2">
        {friendConnected ? "✅ Friend Connected" : "⏳ Waiting for friend..."}
      </div>

      <div className="mb-4 p-4 bg-zinc-800 rounded-lg flex items-center justify-between">
        <span>Session Link:</span>
        <div className="flex gap-2 items-center">
          <code className="text-blue-400 text-sm bg-zinc-900 px-2 py-1 rounded">
            {window.location.href}
          </code>
          <Button
            size="sm"
            onClick={() => navigator.clipboard.writeText(window.location.href)}
          >
            Copy Link
          </Button>
        </div>
      </div>

      {/* Audio controls */}
      <div className="mb-4 p-4 bg-zinc-800 rounded-lg flex items-center gap-4">
        <Button
          onClick={toggleMute}
          variant={isMuted ? "destructive" : "default"}
          className="flex items-center gap-2"
          disabled={!isMicEnabled}
        >
          {isMuted ? (
            <MicOff className="w-4 h-4" />
          ) : (
            <Mic className="w-4 h-4" />
          )}
          {isMuted ? "Unmute" : "Mute"}
        </Button>
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              connectionStatus === "connected"
                ? "bg-green-500"
                : connectionStatus === "connecting"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          />
          <span className="text-sm">
            {connectionStatus === "connected"
              ? "Voice call active"
              : connectionStatus === "connecting"
              ? "Connecting..."
              : "Voice call disconnected"}
          </span>
        </div>
      </div>

      {/* Hidden audio elements */}
      <audio ref={localAudioRef} autoPlay muted />
      <audio ref={remoteAudioRef} autoPlay />

      {/* Grid Layout */}
      <div className="grid lg:grid-cols-2 gap-4 h-full">
        {/* Chat */}
        <Card className="bg-zinc-900 border-zinc-700 flex flex-col">
          <CardHeader>
            <CardTitle className="text-white">Chat Room</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-800 text-white p-2 rounded-lg"
                >
                  {msg}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 text-white"
                placeholder="Type your message..."
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </CardContent>
        </Card>

        {/* Code Editor */}
        <Card className="bg-zinc-900 border-zinc-700 flex flex-col">
          <CardHeader>
            <CardTitle className="text-white flex gap-2 items-center">
              <Code className="w-5 h-5" />
              Code Editor
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <Textarea
              value={code}
              onChange={handleCodeChange}
              className="min-h-[300px] font-mono bg-gray-900 text-green-400"
              placeholder="// Start coding here..."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
