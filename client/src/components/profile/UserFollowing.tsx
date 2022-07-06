import { useSelector } from "react-redux";


import {
    RootStore
} from "../../utils/TypeScript";

import NotFound from "../global/NotFound";
import SingleFollower from "./SingleFollower";

const UserInfo = () => {
    const { auth } = useSelector((state: RootStore) => state);
    if (!auth.user) return <NotFound />;
    if (auth.user.following.length === 0)
        return <h3 className="text-center">No Following</h3>;
    return (
        <div>
            {auth.user.following.map((follow) => (
                <>
                    <SingleFollower key={follow} id={follow} />
                    <hr />
                </>
            ))
            }
        </div>
    );
};

export default UserInfo;
