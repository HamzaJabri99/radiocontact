import ReactPlayer from "react-player";
const Video = ({ setVideoEnded,lang }) => {
  const handleVideoEnded = () => {
    setVideoEnded(true);
  };

  return (
    <ReactPlayer
      className="react-player"
      width="100%"
      height="100%"
      url={lang=="fr"?"https://www.youtube.com/embed/ZDpQj4q2rYM":"https://www.youtube.com/embed/uwElq9XQsLM"}
      loop={false}
      onEnded={handleVideoEnded}
    />
  );
};
export default Video;
