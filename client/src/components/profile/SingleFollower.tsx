import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getOtherInfo } from "../../redux/actions/userAction";

import {
    RootStore,
    IUser
} from "../../utils/TypeScript";

import Follow from "./Follow";
interface IProps {
    id: string;
}

const UserInfo: React.FC<IProps> = ({ id }) => {
    const [follower, setFollower] = useState<IUser>();
    const { otherInfo } = useSelector((state: RootStore) => state);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!id) return;
        if (otherInfo.every((user) => user._id !== id)) {
            dispatch(getOtherInfo(id));
        } else {
            const newUser = otherInfo.find((user) => user._id === id);
            if (newUser) setFollower(newUser);
        }
    }, [id, otherInfo, dispatch, history]);

    if (!follower) return <div>Not Found</div>;

    return (
        <div className="container" key={follower._id}>
            <div className="d-flex flex-row justify-content-between align-items-center">
                <Link to={`/profile/${follower._id}`} className="text-decoration-none">
                <div className="d-flex flex-row align-items-center"><img className="rounded-circle" src={follower.avatar} width="55" height="55" />
                    <div className="d-flex flex-column align-items-start ml-2"><span className="font-weight-bold">{follower.name}</span><span className="followers text-dark">{follower.follower.length} Followers</span></div>
                </div>
                </Link>
                <div className="d-flex flex-row align-items-center mt-2"><Follow user={follower} /></div>
            </div>
            <hr />
        </div>
    );
};

export default UserInfo;
