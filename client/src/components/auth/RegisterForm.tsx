import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { InputChange, FormSubmit, IUser, RootStore } from "../../utils/TypeScript";
import { register } from "../../redux/actions/authAction";
import SocialLogin from "./SocialLogin";
import { getOtherInfo } from "../../redux/actions/userAction";
import { Link, useHistory } from "react-router-dom";

const RegisterForm = () => {
  const history = useHistory();
  const { otherInfo } = useSelector((state: RootStore) => state);
  const variable = history.location.search.replace('?', "").split('=')[0];
  const answer = history.location.search.replace('?', "").split('=')[1];
  const initialState = {
    name: "",
    account: "",
    password: "",
    cf_password: "",
    referer: variable === 'ref' ? answer : ''
  };
  const dispatch = useDispatch();
  const [userRegister, setUserRegister] = useState(initialState);
  const { name, account, password, cf_password, referer } = userRegister;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);
  const [refered, setRefered] = useState<IUser>()


  useEffect(() => {
    setRefered(undefined)
    if (variable !== 'ref') return;
    if (otherInfo.every((user) => user._id !== referer)) {
      dispatch(getOtherInfo(referer));
    } else {
      const newUser = otherInfo.find((user) => user._id === referer);
      if (newUser) setRefered(newUser);

    }

  }, [history, history.location.search, otherInfo, referer]);



  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserRegister({ ...userRegister, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    dispatch(register(userRegister));
  };

  return (
    <>
      {variable === 'ref' && refered && <div className="alert alert-success pb-1">
        <p>You have been refered by : </p>
        <div className="d-flex flex-row justify-content-between align-items-center">

          <Link to={`/profile/${refered?._id}`} className="text-decoration-none">
            <div className="d-flex flex-row align-items-center"><img className="rounded-circle" src={refered?.avatar} width="55" height="55" />
              <div className="d-flex flex-column align-items-start ml-2">
                <span className="font-weight-bold">{refered?.name}</span>
                <span className="followers text-dark">{refered?.follower.length} Followers</span>
              </div>
            </div>
            <hr />
          </Link>

        </div>
        <p><small>If not correct tell the friend to send the correct link.</small></p>
      </div>
      }

      <div style={{ margin: 'auto' }}>
        <SocialLogin referer={ referer } />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="container my-2" style={{ textAlign: 'center' }}><h4>- - - OR - - -</h4>

        </div>
        <div className="form-group mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>

          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={handleChangeInput}
            placeholder="Your name is up to 20 chars."
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="account" className="form-label">
            Email
          </label>

          <input
            type="text"
            className="form-control"
            id="account"
            name="account"
            value={account}
            onChange={handleChangeInput}
            placeholder="Example@gmail.com"
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>

          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={handleChangeInput}
              placeholder="Password must be at least 6 chars."
            />

            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? "Hide" : "Show"}
            </small>
          </div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>

          <div className="pass">
            <input
              type={typeCfPass ? "text" : "password"}
              className="form-control"
              id="cf_password"
              name="cf_password"
              value={cf_password}
              onChange={handleChangeInput}
              placeholder="Your confirm password."
            />

            <small onClick={() => setTypeCfPass(!typeCfPass)}>
              {typeCfPass ? "Hide" : "Show"}
            </small>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="referal" className="form-label">
              Referal Id
            </label>

            <input
              type="text"
              className="form-control"
              id="referal"
              name="referer"
              value={referer}
              onChange={handleChangeInput}
              placeholder="Enter the referal ID"
            />


          </div>
        </div>

        <button type="submit" className="btn btn-dark w-100 my-1">
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
