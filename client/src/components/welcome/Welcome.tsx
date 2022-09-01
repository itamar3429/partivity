import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { Link } from "react-router-dom";
import CustomLink from "../Link";
import WelcomeTemplate from "../welcomeTemplate/WelcomeTemplate";

export default function Welcome() {
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();

  useEffect(() => {
    import("./dance-party.json").then(setAnimationData);
  }, []);

  if (!animationData)
    return (
      <div className="main">
        <div className="center-section">
          <ul className="loader">
            <li className="loader-item"></li>
            <li className="loader-item"></li>
            <li className="loader-item"></li>
          </ul>
        </div>
      </div>
    );
  return (
    <WelcomeTemplate>
      <div className="center-section">
        <div className="logos">
          <div className="center-logo-main">PARTIVITY</div>
          <div className="center-logo-subs">
            <div className="center-logo-sub1">Party.</div>
            <div className="center-logo-sub2">Simple.</div>
          </div>
        </div>
        <Lottie
          className="dance-party"
          animationData={animationData}
          play={true}
          loop={true}
        />
      </div>
    </WelcomeTemplate>
  );
}
