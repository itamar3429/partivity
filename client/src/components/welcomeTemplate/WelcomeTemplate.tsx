import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomLink from "../Link";
import hat from "../../assets/icons/hat.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Lottie from "react-lottie-player";

function WelcomeTemplate({ children }: React.PropsWithChildren<{}>) {
  const [show, setShow] = useState(false);
  const closeNav = () => setShow(false);
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();

  useEffect(() => {
    import("./ballons-mobile.json").then(setAnimationData);
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
    <div className="main">
      <div className="nav-section">
        <Link
          to="/welcome"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <div className="nav-logo">
            <div className="nav-logo-text">
              P<img src={hat} className="nav-logo-img" />
              RTIVITY
            </div>
          </div>
        </Link>
        <div className={"nav-bar" + (show ? " show" : " hide")}>
          <div className="balloon-outer">
            <Lottie
              className="balloons-mobile"
              animationData={animationData}
              play={true}
              loop={true}
              rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
            />
          </div>
          <nav>
            <ul>
              <li>
                <CustomLink
                  onClick={closeNav}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  to="/about"
                >
                  What We Do
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  onClick={closeNav}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  to="/welcome/providers"
                >
                  Providers
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  onClick={closeNav}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  to="/my-parties"
                >
                  Lets Party
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  onClick={closeNav}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  to="/login"
                >
                  Login
                </CustomLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="nav-icon">
          <IconButton
            onClick={() => setShow((pre) => !pre)}
            style={show ? { position: "fixed", right: "5%", top: "35px" } : {}}
          >
            {!show ? (
              <MenuIcon></MenuIcon>
            ) : (
              <CloseIcon style={{ color: "white" }}></CloseIcon>
            )}
          </IconButton>
        </div>
      </div>
      {children}
    </div>
  );
}

export default WelcomeTemplate;
