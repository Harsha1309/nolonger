import { useEffect } from "react";
import { useSelector } from 'react-redux'
const Homevert = () => {
  const { darkMode } = useSelector((state) => state);
  const { isdarkMode } = darkMode;
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div
      className={`card mb-2 border-1 border-md-1 bg-${
        isdarkMode ? "dark" : "light"
      }`}
      style={{ border: isdarkMode ? "2px solid white" : "2px solid black" }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3982561798373930"
        data-ad-slot="6177057546"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default Homevert;
