import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOtherInfo } from "../../redux/actions/userAction";
import { RootStore, IUser } from "../../utils/TypeScript";
import SingleFollower from "./SingleFollower";

interface IProps {
  id: string;
}

const Follower: React.FC<IProps> = ({ id }) => {
  const [other, setOther] = useState<IUser>();
  const { otherInfo } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!id) return;

    if (otherInfo.every((user) => user._id !== id)) {
      dispatch(getOtherInfo(id));
    } else {
      const newUser = otherInfo.find((user) => user._id === id);
      if (newUser) setOther(newUser);
    }
  }, [id, otherInfo, dispatch]);

  if (!other) return <div>Not Found</div>
  if (other.following.length === 0)
  return <h3 className="text-center">No Followings</h3>;
  return (
    <div>
      {other.following.map((follow) => (
        <SingleFollower key={follow} id={follow} />
      ))
      }
    </div>
  );
};
export default Follower;
