import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import React from "react"; // Don't forget to import React!

const ConfettiComponent = () => {
  const { height, width } = useWindowSize();

  // Determine if the user is on a mobile device (you can adjust the breakpoint as needed)
  const isMobile = width <= 768; // Example breakpoint for mobile devices

  // Set the top position based on whether it's mobile or not
  const topPosition = isMobile ? "1000px" : "950px";

  return (
    <Confetti
      style={{ position: "absolute", top: topPosition }}
      recycle={true}
      width={width}
      height={isMobile ? height + 200 : height}
      numberOfPieces={500}
      tweenDuration={10}
    />
  );
};

export default ConfettiComponent;
