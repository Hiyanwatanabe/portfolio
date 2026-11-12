import { Caption, Diagram, Node, Packet, Wire } from "./primitives";

// The online front desk: the product a shop uses (top) and the go-to-market engine that finds and
// reaches shops (bottom). Generic names only: no shops, leads or customers.
export function FrontDeskDiagram() {
  const top = 112;
  const bot = 352;
  const low = 462;
  return (
    <Diagram label="Online front desk architecture. Top, the product: a customer requests a quote online, the shop owner works one call-back list oldest first, marks jobs booked, customers get automatic texts and a review request, and a weekly report shows what it brought in. Bottom, the go-to-market engine: shops come from OpenStreetMap, chains and dealers are filtered out, each website is crawled for a public email and checked for existing shop software, and a capped, slow send queue emails the explainer video through the Gmail API with a send-only scope.">
      <Caption x={24} y={36}>The product · for the shop owner</Caption>
      <text x={936} y={36} textAnchor="end" fontSize={10.5} style={{ fill: "var(--gold)", letterSpacing: ".08em" }}>VALUE: JOBS NOT LOST TO MISSED CALLS</text>

      <Node x={95} y={top} w={150} label="Customer" sub="any time of day" />
      <Node x={280} y={top} w={160} label="Quote request" sub="car · problem · photo" accent />
      <Node x={470} y={top} w={160} label="Call-back list" sub="oldest first · tap call" accent />
      <Node x={655} y={top} w={150} label="Booked" sub="or follow-up" />
      <Node x={850} y={top} w={160} label="Auto texts" sub="car ready · review ask" />
      <Wire d={`M 170 ${top} H 198`} accent />
      <Wire d={`M 360 ${top} H 388`} accent />
      <Wire d={`M 550 ${top} H 578`} accent />
      <Wire d={`M 730 ${top} H 768`} />
      <Node x={655} y={top + 90} w={300} label="Weekly report" sub="jobs booked · what they were worth" gold />
      <Wire d={`M 655 ${top + 27} V ${top + 61}`} dashed />
      <text x={24} y={top + 100} fontSize={10.5} className="muted-t">Built on Google tools the shop already has · no new phone system</text>

      <line x1={24} x2={936} y1={262} y2={262} className="lane-line" strokeDasharray="3 6" />

      <Caption x={24} y={292}>The go-to-market engine · local Node app</Caption>
      <text x={936} y={292} textAnchor="end" fontSize={10.5} style={{ fill: "var(--gold)", letterSpacing: ".08em" }}>COST PER LEAD ≈ $0</text>

      <Node x={95} y={bot} w={150} label="OpenStreetMap" sub="free · no API key" gold />
      <Node x={280} y={bot} w={160} label="Filter" sub="no chains · no dealers" />
      <Node x={470} y={bot} w={160} label="Enrich" sub="site crawl · email rank" accent />
      <Node x={655} y={bot} w={150} label="Qualify" sub="shop software? skip" />
      <Node x={850} y={bot} w={160} h={60} label="Send queue" sub="25/day · 1.5–4 min gaps" accent />
      <Wire d={`M 170 ${bot} H 198`} />
      <Wire d={`M 360 ${bot} H 388`} />
      <Wire d={`M 550 ${bot} H 578`} accent />
      <Wire d={`M 730 ${bot} H 768`} accent />

      <Node x={280} y={low} w={170} label="Google Places" sub="fallback · cap 900/mo" gold />
      <Wire d={`M 365 ${low} C 420 ${low}, 470 ${low - 30}, 470 ${bot + 29}`} dashed />
      <Node x={600} y={low} w={170} label="Explainer video" sub="Remotion · 75 s · 4.4 MB" />
      <Node x={850} y={low} w={160} label="Gmail API" sub="send-only · logged" accent />
      <Wire d={`M 685 ${low} H 768`} />
      <Wire d={`M 850 ${bot + 30} V ${low - 29}`} accent />
      <text x={24} y={520} fontSize={10.5} className="muted-t">Never the same address twice · permanent do-not-email list · opt-out line in every email</text>

      <Packet path={`M 20 ${top} H 930`} dur={5.2} />
      <Packet path={`M 20 ${bot} H 850 V ${low}`} dur={5.8} delay={1.4} gold />
    </Diagram>
  );
}
