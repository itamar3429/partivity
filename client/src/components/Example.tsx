import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import lottieJson from "./conffetti.json";

export default function Example() {
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();

  useEffect(() => {
    import("./conffetti.json").then(setAnimationData);
  }, []);

  if (!animationData) return <div>Loading...</div>;
  return (
    <Lottie
      animationData={animationData}
      play
      loop
      style={{ width: 550, height: 550 }}
    />
  );
}
//   return (
//     <div className="example">
//       <Lottie
//         loop
//         animationData={lottieJson}
//         play
//         style={{ width: 550, height: 550 }}
//       />
//     </div>
//   );
// }
