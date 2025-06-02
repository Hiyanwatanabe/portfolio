
// import React from "react";
// import "./About.css";

// /* Import the three images from src/assets/ */
// import flagPic from "../assets/flag.jpg";
// import swim1   from "../assets/Swim1.jpg";
// import swim2   from "../assets/Swim2.jpg";

// export default function About() {
//   return (
//     <section id="about" className="about-section">
//       <div className="about-content-wrapper">
//         {/* LEFT SIDE: Your paragraph text */}
//         <div className="about-text">
//           <p>
//             Hi, I’m a Brazilian Computer Scientist of Japanese heritage and a
//             recent Gannon University graduate (May 2025). As a PSAC Athletic
//             Honor Roll swimmer, I blend athletic discipline with a passion for
//             data and design. I build real-time React dashboards, craft
//             high-performance SQL schemas, and develop Python/FastAPI WebSocket
//             services to turn complex signals into actionable insights. Certified
//             in Google Professional Data Analytics, I also love creating
//             engaging social-media graphics and UX designs to bring those
//             insights to life. Let’s connect and make your data your greatest
//             asset.
//           </p>
//         </div>

//         {/* RIGHT SIDE: Three images in a row (swim1, flag, swim2) */}
//         <div className="about-images">
//           {/* Swim shot #1 */}
//           <div className="image-wrapper">
//             <img src={swim1} alt="Swimming shot 1" className="about-img" />
//           </div>

//           {/* Flag in the center */}
//           <div className="image-wrapper">
//             <img src={flagPic} alt="Nationality flags" className="about-img flag-img" />
//           </div>

//           {/* Swim shot #2 */}
//           <div className="image-wrapper">
//             <img src={swim2} alt="Swimming shot 2" className="about-img" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import React from "react";
import "./About.css";

/* Import all four images from src/assets/ */
import gannonPic from "../assets/gannon.jpg";
import flagPic   from "../assets/flag.jpg";
import swim1     from "../assets/Swim1.jpg";
import swim2     from "../assets/Swim2.jpg";

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-content-wrapper">
        {/* ----- LEFT SIDE: Paragraph + Square Gannon Image ----- */}
        <div className="about-text-and-square">
          <div className="about-text">
            <p>
              Hi, I’m a Brazilian Computer Scientist of Japanese heritage and a
              recent Gannon University graduate (May 2025). As a PSAC Athletic
              Honor Roll swimmer, I blend athletic discipline with a passion for
              data and design. I build real-time React dashboards, craft
              high-performance SQL schemas, and develop Python/FastAPI WebSocket
              services to turn complex signals into actionable insights.
              Certified in Google Professional Data Analytics, I also love
              creating engaging social-media graphics and UX designs to bring
              those insights to life. Let’s connect and make your data your
              greatest asset.
            </p>
          </div>

          {/* Square “Gannon” image centered below the paragraph */}
          <div className="about-square">
            <img
              src={gannonPic}
              alt="Gannon University"
              className="square-img"
            />
          </div>
        </div>

        {/* ----- RIGHT SIDE: Three Images Stacked Vertically ----- */}
        <div className="about-images">
          {/* Swim shot #1 */}
          <div className="image-wrapper">
            <img src={swim1} alt="Swimming shot 1" className="about-img" />
          </div>

          {/* Flag in the middle */}
          <div className="image-wrapper">
            <img
              src={flagPic}
              alt="Nationality flags"
              className="about-img flag-img"
            />
          </div>

          {/* Swim shot #2 */}
          <div className="image-wrapper">
            <img src={swim2} alt="Swimming shot 2" className="about-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
