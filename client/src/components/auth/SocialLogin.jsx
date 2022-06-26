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
      } // customization attributes
    );
  }, []);

  // window.FB.login(function (response) {
  //   const { accessToken, userID } = response.authResponse;
  //   dispatch(facebookLogin(accessToken, userID));
  // });

  return (
    <div className="row mx-md-2">
      {/* <div id="fb-root"></div> */}
      <div className="bg-light justify-content-between row">
        <div className="col-1"></div>
        <div className="my-2 col-11" id="buttonDiv"></div>
        <div className="col-1"></div>
      </div>
      {/*} <div
        className="fb-login-button"
        data-width=""
        data-size="large"
        data-button-type="continue_with"
        data-layout="default"
        data-auto-logout-link="false"
        data-use-continue-as="true"
      ></div> */}
      {/* <div className="my-2 col-5"> */}
      {/* <FacebookLogin appId="716024296293298" onSuccess={onFBSuccess} /> */}
      {/* </div> */}
    </div>
  );
};

export default SocialLogin;
