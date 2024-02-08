import "./Header.css";
// import castsImg from '../../../public/667399.png'
import frenchLogo from "/french_flag.png";
import dutchLogo from "/dutch_flag.png";
const Header = ({ lang, setLang,getTranslation }) => {
 const handleLang=(lang)=>{
  setLang(lang)
  console.log(lang)
 }
  return (
    <div className="Header container">
      <div className="language_div">
        <img src={frenchLogo} onClick={() => handleLang("fr")} />
        <img src={dutchLogo} onClick={() => handleLang("deu")} />
      </div>
      <h2>{getTranslation(lang,'ready_to_win')}</h2>
    </div>
  );
};

export default Header;
