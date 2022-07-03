import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin } from "../../redux/actions/authAction";
import { useHistory } from "react-router-dom";

const GooglePrompt = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { auth } = useSelector((state) => state);

  const onSuccess = (response) => {
    dispatch(googleLogin(response.credential, ""));
  };

  useEffect(() => {
    window.google?.accounts?.id.initialize({
      client_id:
        "470831587453-n1i1ee8jvgdoh3c0q7rv50h1ttfrusk3.apps.googleusercontent.com",
      callback: onSuccess,
    });
    if (auth.access_token === undefined) {
      window.google?.accounts.id.prompt();
    } else {
      window.google?.accounts.id.cancel();
    }
  }, [history, auth]);

  return <div></div>;
};
export default GooglePrompt;
