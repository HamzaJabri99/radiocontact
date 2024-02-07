import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
const ConfettiComponent = () => {
  const { height, width } = useWindowSize();
  return (
    <Confetti
      style={{ position: "absolute", top: "600px" }}
      recycle={true}
      width={width}
      height={height}
      numberOfPieces={500}
    />
  );
};
export default ConfettiComponent;
