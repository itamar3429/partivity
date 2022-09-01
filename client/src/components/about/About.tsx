import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import WelcomeTemplate from "../welcomeTemplate/WelcomeTemplate";
import hat from "../../assets/icons/hat.png";

function About() {
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();

  useEffect(() => {
    import("./aboutUs.json").then(setAnimationData);
  }, []);

  if (!animationData)
    return (
      <ul className="loader">
        <li className="loader-item"></li>
        <li className="loader-item"></li>
        <li className="loader-item"></li>
      </ul>
    );
  return (
    <WelcomeTemplate>
      <div className="center-section">
        <div className="text">
          <p className="title">Who Are we?</p>
          <div className="text-content">
            <p>
              Let's face it, if you've come this far - it's a sign that you have
              a strong need to celebrate.
              <br /> So where do we come into the picture? What if we told you
              that a team of developers programmed a tool that connects you, the
              party fans, to a social network that brings <br />
              together all the people with the need to party - just like you!
              <br />
              Sounds crazy and beyond imagination isn't it? So, please meet{" "}
              <span className="nav-logo">
                <span className="nav-logo-text custom-font">
                  P
                  <img
                    src={hat}
                    className="nav-logo-img custom-icon"
                    style={{ height: 15 }}
                  />
                  RTIVITY
                </span>
              </span>{" "}
              .
              <br /> Now all you have to do is follow the steps on the way to
              the next celebration... <br />
              without unnecessary headaches of planning. The party fire will
              never go out! Let's Rock!
            </p>
          </div>
        </div>
        <Lottie
          className="about-animation"
          animationData={animationData}
          play={true}
          loop={true}
        />
      </div>
      {/* <div className="about-section">
        <div className="about-body">
          <h1 className="about-header">Who Are we?</h1>
          <div className="about-content">
            <p>
              Let's face it, if you've come this far - it's a sign that you have
              a strong need to celebrate.
              <br /> So where do we come into the picture? What if we told you
              that a team of developers programmed a tool that connects you, the
              party fans, to a social network that brings <br />
              together all the people with the need to party - just like you!
              <br />
              Sounds crazy and beyond imagination isn't it? So, please meet{" "}
              <span className="nav-logo">
                <span className="nav-logo-text custom-font">
                  P
                  <img
                    src={hat}
                    className="nav-logo-img custom-icon"
                    style={{ height: 15 }}
                  />
                  RTIVITY
                </span>
              </span>{" "}
              .
              <br /> Now all you have to do is follow the steps on the way to
              the next celebration... <br />
              without unnecessary headaches of planning. The party fire will
              never go out! Let's Rock!
            </p>
            <Lottie
              className="about-animation"
              animationData={animationData}
              play={true}
              loop={true}
            />
          </div>
        </div>
      </div> */}
    </WelcomeTemplate>
  );
}

export default About;
