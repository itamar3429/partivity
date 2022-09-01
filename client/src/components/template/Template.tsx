import React from "react";
import { useAppSelector } from "../../redux/hooks";

type TProps = {};

function Template(props: React.PropsWithChildren<TProps>) {
  const className = useAppSelector((state) => state.transition.className);

  return <div className={className}>{props.children}</div>;
}

export default Template;
