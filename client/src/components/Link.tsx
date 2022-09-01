import React from "react";
import {
  Link as RouterLink,
  LinkProps,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { fadeOut, fadeIn } from "../redux/slices/Link.slice";

type TProps = {
  to: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: Function;
};

const CustomLink = (props: React.PropsWithChildren<TProps>) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const location = useLocation();

  return (
    <a
      href={props.to}
      className={props.className}
      style={props.style || {}}
      onClick={(e) => {
        e.preventDefault();
        props.onClick && props.onClick();
        const pathname = window.location.pathname + window.location.search;
        const href = window.location.href;
        const isDiff = props.to != pathname && props.to != href;

        if (isDiff) {
          dispatch(fadeOut());
          setTimeout(() => {
            dispatch(fadeIn());
            navigate(props.to);
          }, 500);
        }
      }}
    >
      {props.children}
    </a>
  );
};

export default CustomLink;
