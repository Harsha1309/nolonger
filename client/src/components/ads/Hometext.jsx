import { useEffect } from "react";
const Hometext = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle my-2"
      style={{ display: "block" }}
      data-ad-client="ca-pub-3982561798373930"
      data-ad-slot="7436871156"
      data-ad-format="horizontal"
      data-full-width-responsive="false"
    ></ins>
  );
};

export default Hometext;
