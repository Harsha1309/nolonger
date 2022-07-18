import { useEffect } from "react";
import { useSelector } from "react-redux";
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
          class="adsbygoogle"
          style={{ display: block }}
          data-ad-client="ca-pub-3982561798373930"
          data-ad-slot="8003831451"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
};

export default Homevert;
