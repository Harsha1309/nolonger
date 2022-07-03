import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import LoginPass from "../components/auth/LoginPass";
import SocialLogin from "../components/auth/SocialLogin";

import { RootStore } from "../utils/TypeScript";
import Helmetglobal from "../components/global/Helmetglobal";

const Login = () => {
  const [sms, setSms] = useState(false);
  const history = useHistory();

  const { auth } = useSelector((state: RootStore) => state);

  useEffect(() => {
    if (auth.access_token) {
      let url = history.location.search.replace("?", "/");
      return history.push(url);
    }
  }, [auth.access_token, history]);

  return (
    <div className="auth_page">
      <Helmetglobal title="Login-PediaGeek" description="Login to pediageek to write a blog an dearn." keyword="Login" />
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4">Login</h3>
        <SocialLogin referer="" />
        <LoginPass />

        <small className="row my-2 text-primary" style={{ cursor: "pointer" }}>
          <span className="col-6">
            <Link to="/forgot_password">Forgot password?</Link>
          </span>
        </small>

        <p>
          {`You don't have an account? `}
          <Link
            to={`/register${history.location.search}`}
            style={{ color: "crimson" }}
          >
            Register Now
          </Link>
        </p>
      </div>
    </div >
  );
};

export default Login;
