import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff, Code } from "lucide-react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { useRef } from "react";


const socket = io("http://localhost:4000"); // 🔁 Replace with your deployed URL

export default function ByFriendInterview() {
  const { sessionId } = useParams();
  const [userApproach, setUserApproach] = useState("");
  const [code, setCode] = useState("");
  const [listening, setListening] = useState(false);
  const [browserSupport, setBrowserSupport] = useState({
    speechRecognition: false,
    microphone: false,
  });
  const [micEnabled, setMicEnabled] = useState(true);
  const localStream = useRef<MediaStream | null>(null);
  const peerRef = useRef<Peer | null>(null);



  // ✅ Check mic & speech support
  useEffect(() => {
    const checkSupport = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());

        const speechSupport =
          "webkitSpeechRecognition" in window || "SpeechRecognition" in window;

        setBrowserSupport({ speechRecognition: speechSupport, microphone: true });
      } catch {
        setBrowserSupport((prev) => ({ ...prev, microphone: false }));
      }
    };
    checkSupport();
  }, []);

  // ✅ Handle voice-to-text
  useEffect(() => {
    if (!listening || !browserSupport.speechRecognition) return;

    let recognition: any = null;

    if ("webkitSpeechRecognition" in window) {
      recognition = new (window as any).webkitSpeechRecognition();
    } else if ("SpeechRecognition" in window) {
      recognition = new (window as any).SpeechRecognition();
    }


    if (!recognition) return;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        }
      }
      setUserApproach((prev) => {
        const updated = prev + finalTranscript;
        socket.emit("update-approach", { sessionId, approach: updated });
        return updated;
      });
    };

    recognition.onerror = () => setListening(false);
    recognition.start();

    return () => recognition.stop();
  }, [listening, browserSupport.speechRecognition]);

  useEffect(() => {
    return () => {
      peerRef.current?.destroy();
      socket.disconnect();
    };
  }, []);
  
  const toggleListening = () => {
    if (!browserSupport.microphone || !browserSupport.speechRecognition) return;
    setListening((prev) => !prev);
  };

  // ✅ Join session + listen for updates
  useEffect(() => {
    if (!sessionId) return;

    socket.emit("join-session", sessionId);

    socket.on("remote-approach-update", (newApproach) => {
      setUserApproach(newApproach);
    });

    socket.on("remote-code-update", (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.off("remote-approach-update");
      socket.off("remote-code-update");
    };
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) return;

    // Step 1: Get audio stream
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        localStream.current = stream;

        socket.emit("join-voice-room", sessionId);

        socket.on("other-user", (userId: string) => {
          const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: micEnabled ? stream : undefined,
          });

          peer.on("signal", (signal) => {
            socket.emit("send-signal", {
              userToSignal: userId,
              signal,
              sessionId,
            });
          });

          peer.on("stream", (remoteStream) => {
            const audio = new Audio();
            audio.srcObject = remoteStream;
            audio.play();
          });

          peerRef.current = peer;
        });

        socket.on("user-joined", ({ signal, callerId }) => {
          const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: micEnabled ? stream : undefined,
          });

          peer.on("signal", (signalData) => {
            socket.emit("return-signal", { signal: signalData, callerId });
          });

          peer.on("stream", (remoteStream) => {
            const audio = new Audio();
            audio.srcObject = remoteStream;
            audio.play();
          });

          peer.signal(signal);
          peerRef.current = peer;
        });

        socket.on("received-returned-signal", (signal) => {
          peerRef.current?.signal(signal);
        });
      });
  }, [sessionId, micEnabled]);
  
  // ✅ Update + broadcast
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    socket.emit("update-code", { sessionId, code: newCode });
  };

  const handleApproachChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newApproach = e.target.value;
    setUserApproach(newApproach);
    socket.emit("update-approach", { sessionId, approach: newApproach });
  };

  return (
    <div className="h-screen bg-black text-white p-4">
      {/* Session Share */}
      <div className="mb-4 p-4 bg-zinc-800 rounded-lg text-white flex items-center justify-between">
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
        <Button
          variant={micEnabled ? "secondary" : "destructive"}
          onClick={() => {
            setMicEnabled((prev) => {
              const enabled = !prev;
              if (localStream.current) {
                localStream.current.getAudioTracks()[0].enabled = enabled;
              }
              return enabled;
            });
          }}
        >
          {micEnabled ? (
            <MicOff className="w-4 h-4" />
          ) : (
            <Mic className="w-4 h-4" />
          )}
          {micEnabled ? "Mic Off" : "Mic On"}
        </Button>
      </div>

      {/* Grid Layout */}
      <div className="grid lg:grid-cols-2 gap-4 h-full">
        {/* Approach Panel */}
        <Card className="bg-zinc-900 border-zinc-700 flex flex-col">
          <CardHeader>
            <CardTitle className="text-white">Your Approach</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <Textarea
              value={userApproach}
              onChange={handleApproachChange}
              className="min-h-[120px] resize-none bg-zinc-900 text-white"
              placeholder="Start speaking or type your approach..."
            />
            <div className="mt-4 flex gap-2">
              <Button
                variant={listening ? "destructive" : "secondary"}
                onClick={toggleListening}
              >
                {listening ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
                {listening ? "Stop" : "Voice"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Code Panel */}
        <Card className="bg-zinc-900 border-zinc-700 flex flex-col">
          <CardHeader>
            <CardTitle className="text-white flex gap-2 items-center">
              <Code className="w-5 h-5" />
              Collaborative Code Editor
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
