declare module "simple-peer" {
  import { Duplex } from "stream";

  interface SignalData {
    type: "offer" | "answer" | "candidate";
    sdp?: string;
    candidate?: any;
  }

  interface Options {
    initiator?: boolean;
    trickle?: boolean;
    stream?: MediaStream;
  }

  export default class Peer {
    constructor(opts?: Options);

    signal(data: SignalData): void;
    on(event: "signal", cb: (data: SignalData) => void): void;
    on(event: "stream", cb: (stream: MediaStream) => void): void;
    on(event: "connect", cb: () => void): void;
    on(event: "close", cb: () => void): void;
    on(event: "error", cb: (err: any) => void): void;

    destroy(): void;
    send(data: string | Buffer): void;
  }
}
