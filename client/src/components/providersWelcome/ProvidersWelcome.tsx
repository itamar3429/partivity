import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import WelcomeTemplate from "../welcomeTemplate/WelcomeTemplate";
import hat from "../../assets/icons/hat.png";

function ProvidersWelcome() {
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();

  useEffect(() => {
    import("./providers.json").then(setAnimationData);
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
          <p className="title">Hello Providers</p>
          <div className="text-content">
            <p>
              Before we dive into the details, you have reached the place where
              you can get closest to your customers. And by extension, the
              virtual system of{" "}
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
              Allows you to perform almost any action that you would probably
              perform on your phone, only that instead of a call - here you will
              perform it in a few clicks. Sounds more comfortable, doesn't it?
              But wait, everything discussed until now was part of a complete
              package deal that you receive just because you are registered with
              us. Ready for it? You will be published in the proposals of the
              party organizers, you will be able to receive well-arranged
              opinions from both the system and the customers, and you are not
              obligated to anything. Most service providers at this point of
              reading are already filling out the registration form, so what are
              you waiting for?
            </p>
          </div>
        </div>
        <Lottie
          className="providers-animation"
          animationData={animationData}
          play={true}
          loop={true}
        />
      </div>
    </WelcomeTemplate>
  );
}

export default ProvidersWelcome;
