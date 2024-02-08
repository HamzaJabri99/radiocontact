import "./Description.css";
const Description = ({ getTranslition, lang }) => {
  return (
    <div className="Description container">
      <h1>{getTranslition(lang, "participation_header")}</h1>
      <p>{getTranslition(lang, "p1")}</p>

      <p>{getTranslition(lang, "p2")}</p>

      <p>{getTranslition(lang, "p3")}</p>

      <p>{getTranslition(lang, "p4")}</p>

      <p>{getTranslition(lang, "p5")}</p>

      <p>{getTranslition(lang, "p6")}</p>
    </div>
  );
};

export default Description;
