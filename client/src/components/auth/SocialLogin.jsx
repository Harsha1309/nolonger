import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { googleLogin } from "../../redux/actions/authAction";

const SocialLogin = (referer) => {
  const dispatch = useDispatch();
  const onSuccess = (response) => {
    dispatch(googleLogin(response.credential, referer));
  };

  useEffect(() => {
    window.google?.accounts?.id.initialize({
      client_id:
        "470831587453-n1i1ee8jvgdoh3c0q7rv50h1ttfrusk3.apps.googleusercontent.com",
      callback: onSuccess,
    });
    window.google?.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      {
        theme: "filled_blue",
        size: "large",
        shape: "rectangular",
        text: "continue_with",
      }
    );
  }, []);

  return (
    <div className="row ml-md-3">
      <div className="bg-light justify-content-center row">
        <div className="col-1"></div>
        <div className="my-2 col-11" id="buttonDiv"></div>
        <div className="col-1"></div>
      </div>
    </div>
  );
};

export default SocialLogin;
