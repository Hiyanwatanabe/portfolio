import { Caption, Diagram, Node, Packet, Wire } from "./primitives";

export function CogniSenseDiagram() {
  return (
    <Diagram label="CogniSense pipeline: an 8-channel EEG headset streams over Lab Streaming Layer to a FastAPI service that computes beta over alpha band power and streams it by WebSocket to a Next.js dashboard; tasks, NASA-TLX and facial expression feed a combined report.">
      <Caption x={24} y={36}>Signals</Caption>
      <Caption x={300} y={36}>Python service · FastAPI</Caption>
      <Caption x={710} y={36}>Researchers</Caption>
      <Node x={110} y={110} w={170} label="EEG headset" sub="8 channels · 500 Hz" />
      <Node x={110} y={220} w={170} label="Lab Streaming Layer" sub="stream type: EEG" />
      <Wire d="M 110 137 V 191" />

      <rect x={300} y={80} width={340} height={210} rx={12} className="box" />
      <Node x={470} y={130} w={300} h={46} label="Rolling buffer per channel" sub="5 s window" />
      <Node x={470} y={190} w={300} h={46} label="Welch PSD on the last second" sub="β 13–30 Hz ÷ α 8–12 Hz" accent />
      <Node x={470} y={250} w={300} h={46} label="Average across channels" sub="cognitive load ratio" />
      <Wire d="M 195 220 H 298" accent />

      <Node x={810} y={150} w={200} label="Live dashboard" sub="Next.js · Chart.js" accent />
      <Wire d="M 640 190 C 690 190, 680 150, 708 150" accent />
      <text x={650} y={210} fontSize={10.5} className="muted-t">WebSocket</text>

      <Caption x={24} y={360}>Session</Caption>
      <Node x={110} y={420} w={170} label="Webcam" sub="facial expression" />
      <Node x={310} y={420} w={170} label="Cognitive tasks" sub="levels · distractions" />
      <Node x={510} y={420} w={170} label="NASA-TLX" sub="weighted workload" />
      <Node x={810} y={420} w={200} label="Session report" sub="combined score · PDF" gold />
      <Wire d="M 110 447 V 480 H 760 V 449" dashed />
      <Wire d="M 310 447 V 470 H 740" dashed />
      <Wire d="M 595 420 H 708" />
      <Wire d="M 810 177 V 391" />
      <text x={820} y={290} fontSize={10.5} className="muted-t">EEG score</text>

      <Packet path="M 110 110 V 220 H 470 V 250" dur={2.4} />
      <Packet path="M 640 190 C 690 190, 680 150, 810 150" dur={1.6} delay={0.8} />
    </Diagram>
  );
}
