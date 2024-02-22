import "./Header.css";
// import castsImg from '../../../public/667399.png'
import frenchLogo from "/french_flag_last.svg";
import dutchLogo from "/nl_flag_last.svg";
import backgroundContact from "/radiocontact_background_latest1.png";
import backgroundQ from "/qmusicOpti.png";
import bechargeLogo from "/26_250w.jpg";
import useWindowSize from "react-use/lib/useWindowSize";
import qMusicLogo from "/qMusicLogo.png";
const Header = ({ lang, setLang, getTranslation }) => {
  const { width, height } = useWindowSize();
  const handleLang = (lang) => {
    setLang(lang);
    //console.log(lang);
  };
  const myStyle = {
    background: lang == "deu" && width <= 480 ? "#E53828" : "",
    backgroundImage: `url(${
      lang == "fr"
        ? backgroundContact
        : lang == "deu" && width <= 480
        ? "red"
        : backgroundQ
    })`,
    backgroundPosition: `${
      lang == "fr" ? "center bottom -100px" : "center bottom -73px"
    }`,
    paddingTop: lang == "deu" && width <= 500 ? "8rem" : "",
  };
  return (
    <div className="Header container" style={myStyle}>
      <img src={bechargeLogo} alt="" className="bechargeLogo" />
      <div className="language_div">
        {lang !== "fr" && (
          <div onClick={() => handleLang("fr")}>
            <img src={frenchLogo} /> <span>Francais</span>
          </div>
        )}
        {lang !== "deu" && (
          <div onClick={() => handleLang("deu")}>
            <img src={dutchLogo} /> <span>Nederlands</span>
          </div>
        )}
      </div>
      <h2 style={{marginBottom:lang == "deu" && width <= 500 ? "0" : "",}}>{getTranslation(lang, "ready_to_win")}</h2>
      {lang == "deu" && width <= 500 ? (
        <img
          src={qMusicLogo}
          width={"100px"}
          height={"auto"}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
