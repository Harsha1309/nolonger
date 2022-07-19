import { useEffect } from "react";
import { useSelector } from "react-redux";
import Hometext from "./Hometext";
const Homevert = () => {
  const { darkMode } = useSelector((state) => state);
  const { isdarkMode } = darkMode;
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div
      className={`card border-0 position-relative bg-${
        isdarkMode ? "dark" : "light"
      }`}
    >
      <div className="container">
        <ins
          className="adsbygoogle mt-3"
          style={{ display: "block" }}
          data-ad-client="ca-pub-3982561798373930"
          data-ad-slot="6423172384"
          data-ad-format="rectangle"
          data-full-width-responsive="false"
        ></ins>
        <Hometext />
      </div>
    </div>
  );
};

export default Homevert;
