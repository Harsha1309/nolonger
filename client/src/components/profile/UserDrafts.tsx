import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { IParams, RootStore, IBlog } from "../../utils/TypeScript";

import { getDraftsByUserId } from "../../redux/actions/draftAction";

import CardHoriz from "../cards/CardHoriz";
import Loading from "../global/Loading";
import Pagination from "../global/Pagination";
import DraftCard from "../cards/DraftCard";

const UserDrafts = () => {
    const { draftsUser, auth,darkMode } = useSelector((state: RootStore) => state);
    const dispatch = useDispatch();
    const user_id = useParams<IParams>().slug;
    const {isdarkMode}=darkMode;
    const [blogs, setBlogs] = useState<IBlog[]>();

    const [total, setTotal] = useState(0);
    const history = useHistory();
    const { search } = history.location;

    useEffect(() => {

        if (!user_id) return;
        if (
            draftsUser.every((item) => {
                return item.id !== user_id;
            })
        ) {
            if (auth.access_token)
                dispatch(getDraftsByUserId(user_id, search, auth.access_token));
        } else {

            const data = draftsUser.find((item) => item.id === user_id);
            if (!data) return;
            setBlogs(data.blogs);
            setTotal(data.total);
            if (data.search) history.push(data.search);
        }
    }, [user_id, draftsUser, dispatch, search, history]);

    const handlePagination = (num: number) => {
        const search = `?page=${num}`;
        if (auth.access_token)
            dispatch(getDraftsByUserId(user_id, search, auth.access_token));
    };

    if (!blogs) return <Loading />;

    if (blogs.length === 0 && total < 1)
        return <h3 className={`text-center text-${isdarkMode?'white':'black'}`}>Nothing Draft</h3>;

    return (
        <div>
            <div>
                {blogs.map((blog) => (
                    <DraftCard key={blog._id} blog={blog} />
                ))}
            </div>

            <div>
                <Pagination total={total} callback={handlePagination} />
            </div>
        </div>
    );
};

export default UserDrafts;
