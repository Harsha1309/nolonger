import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IUser } from "../../utils/TypeScript";
import { addfollowing, removefollowing } from "../../redux/actions/userAction";
import { RootStore } from "../../utils/TypeScript";
import { ALERT } from "../../redux/types/alertType";
import { useHistory } from "react-router-dom";

export interface IProps {
  user: IUser;
}

const Follow: React.FC<IProps> = ({ user }) => {
  const dispatch = useDispatch();
  let { auth, otherInfo } = useSelector((state: RootStore) => state);
  let history = useHistory();
  const [follow, setFollow] = useState(false);
  useEffect(() => {
    setFollow(false);
    auth.user?.following.forEach((id) => {
      if (id === user._id) {
        setFollow(true);
      }
    });
  }, [auth, dispatch, history, otherInfo]);

  const handleClick = () => {
    if (auth.access_token) {
      dispatch(addfollowing(user, auth.access_token, auth));
    }
    else
      dispatch({ type: ALERT, payload: { errors: "Please LogIn to continue." } })
  };
  const unfollow = () => {
    if (auth.access_token) {
      dispatch(removefollowing(user, auth.access_token, auth));
    }
  };

  return (
    <>
      {(!follow && user._id !== auth.user?._id) &&
        < button
          className="btn btn-outline-success btn-sm follow mt-2"
          style={{ height: "31px", borderRadius: "22px" }}
          onClick={handleClick}
        >
          Follow
        </button>
      }

      {
        (follow && user._id !== auth.user?._id) &&
        <button
          className="btn btn-outline-danger  btn-sm follow mt-2"
          style={{ height: "31px", borderRadius: "22px" }}
          onClick={unfollow}
        >
          Unfollow
        </button>
      }
    </>
  );
};

export default Follow;
