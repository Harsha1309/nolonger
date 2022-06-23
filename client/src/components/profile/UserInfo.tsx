import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  RootStore,
  InputChange,
  IUserProfile,
  FormSubmit,
} from "../../utils/TypeScript";

import NotFound from "../global/NotFound";

import { updateUser, resetPassword } from "../../redux/actions/userAction";
import Monetary from "./Monetary";

const UserInfo = () => {
  const initState = {
    name: "",
    account: "",
    avatar: "",
    password: "",
    cf_password: "",
    about: "",
    paytm: "",
    referer:''
  };

  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const [user, setUser] = useState<IUserProfile>(initState);
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleChangeFile = (e: InputChange) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;

    if (files) {
      const file = files[0];
      setUser({ ...user, avatar: file });
    }
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (avatar || name || about || paytm) dispatch(updateUser(avatar as File, name, paytm, about, auth));

    if (password && auth.access_token)
      dispatch(resetPassword(password, cf_password, auth.access_token));
  };

  const { name, avatar, password, cf_password, paytm, about } = user;

  if (!auth.user) return <NotFound />;

  return (
    <div className="profile_info position-relative">
      <div className="position-absolute" style={{ right: 3, top: 3 }}>
        <Monetary />
      </div>

      <form  onSubmit={handleSubmit}>

        <div className="info_avatar">
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt="avatar"
          />

          <span>
            <i className="fas fa-camera" />
            <p>Change</p>
            <input
              type="file"
              accept="image/*"
              name="file"
              id="file_up"
              onChange={handleChangeFile}
            />
          </span>
        </div>

        <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            defaultValue={auth.user.name}
            onChange={handleChangeInput}
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="account">Account</label>
          <input
            type="text"
            className="form-control"
            id="account"
            name="account"
            defaultValue={auth.user.account}
            onChange={handleChangeInput}
            disabled={true}
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="about">About</label>
          <textarea className="form-control" id="about"
            name="about" defaultValue={auth.user.about}
            onChange={handleChangeInput} rows={4} maxLength={200} ></textarea>
        </div>

        {auth.user.type !== "register" && (
          <small className="text-danger">
            * Quick login account with {auth.user.type} can't use this function *
          </small>
        )}

        <div className="form-group my-3">
          <label htmlFor="password">Password</label>

          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={handleChangeInput}
              disabled={auth.user.type !== "register"}
            />

            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? "Hide" : "Show"}
            </small>
          </div>
        </div>

        <div className="form-group my-3">
          <label htmlFor="cf_password">Confirm Password</label>

          <div className="pass">
            <input
              type={typeCfPass ? "text" : "password"}
              className="form-control"
              id="cf_password"
              name="cf_password"
              value={cf_password}
              onChange={handleChangeInput}
              disabled={auth.user.type !== "register"}
            />

            <small onClick={() => setTypeCfPass(!typeCfPass)}>
              {typeCfPass ? "Hide" : "Show"}
            </small>
          </div>
        </div>

        <button className="btn btn-dark w-100" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UserInfo;
