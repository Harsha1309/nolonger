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
      <ins
        class="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3982561798373930"
        data-ad-slot="8003831451"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <ins
        class="adsbygoogle"
        style="display:block"
        data-ad-format="fluid"
        data-ad-layout-key="-gw-3+1f-3d+2z"
        data-ad-client="ca-pub-3982561798373930"
        data-ad-slot="3393684365"
      ></ins>
    </div>
  );
};

export default Homevert;
