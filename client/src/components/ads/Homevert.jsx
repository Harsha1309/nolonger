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
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3982561798373930"
        data-ad-slot="6177057546"
        data-ad-format="auto"
        data-full-width-responsive="false"
      ></ins>
      <ins
        class="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="fluid"
        data-ad-layout-key="-gt-a+u-44+8x"
        data-ad-client="ca-pub-3982561798373930"
        data-ad-slot="8626647989"
      ></ins>
      <script></script>
    </div>
  );
};

export default Homevert;
