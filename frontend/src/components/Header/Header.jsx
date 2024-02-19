import "./Header.css";
// import castsImg from '../../../public/667399.png'
import frenchLogo from "/fr_logo.svg";
import dutchLogo from "/nl_logo.svg";
import backgroundContact from "/radiocontactImg1.png";
import backgroundQ from "/qmusicOpti.png";
import bechargeLogo from "/26_250w.jpg";
const Header = ({ lang, setLang, getTranslation }) => {
  const handleLang = (lang) => {
    setLang(lang);
    //console.log(lang);
  };
  const myStyle = {
    backgroundImage: `url(${lang == "fr" ? backgroundContact : backgroundQ})`,
    backgroundPosition: `${
      lang == "fr" ? "center bottom -100px" : "center bottom -73px"
    }`,
  };
  return (
    <div className="Header container" style={myStyle}>
      <img src={bechargeLogo} alt="" className="bechargeLogo" />
      <div className="language_div">
        <img src={frenchLogo} onClick={() => handleLang("fr")} />
        <img src={dutchLogo} onClick={() => handleLang("deu")} />
      </div>
      <h2>{getTranslation(lang, "ready_to_win")}</h2>
    </div>
  );
};

export default Header;
