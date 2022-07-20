import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IBlog, IParams, RootStore } from "../../utils/TypeScript";

import { deleteBlog } from "../../redux/actions/blogAction";


interface IProps {
    blog: IBlog;
}

const CardHoriz: React.FC<IProps> = ({ blog }) => {
    const { slug } = useParams<IParams>();
    const { auth, darkMode } = useSelector((state: RootStore) => state);
    const dispatch = useDispatch();

    const { isdarkMode } = darkMode;

    const handleDelete = () => {
        if (!auth.user || !auth.access_token) return;

        if (slug !== auth.user._id)
            return dispatch({
                type: "ALERT",
                payload: { errors: "Invalid Authentication." },
            });

        if (window.confirm("Do you want to delete this post?")) {
            dispatch(deleteBlog(blog, auth.access_token));
        }
    };

    return (
        <div className={`card mb-3 bg-${isdarkMode ? 'dark' : 'light'} text-${isdarkMode ? 'white' : 'black'}`}>
            <div className="row g-0 p-2">
                <div
                    className="col-4"
                    style={{
                        minHeight: "150px",
                        maxHeight: "170px",
                        overflow: "hidden",
                    }}
                >
                    {blog.thumbnail && (
                        <>
                            {typeof blog.thumbnail === "string" ? (
                                <Link to={`/blog/${blog._id}`}>
                                    <img
                                        src={blog.thumbnail}
                                        className="w-100 h-100"
                                        alt="thumbnail"
                                        style={{ objectFit: "cover" }}
                                    />
                                </Link>
                            ) : (
                                <img
                                    src={URL.createObjectURL(blog.thumbnail)}
                                    className="w-100 h-100"
                                    alt="thumbnail"
                                    style={{ objectFit: "cover" }}
                                />
                            )}
                        </>
                    )}
                </div>
                <div className="col-8">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link
                                to={`/blog/${blog._id}`}
                                className="text-capitalize text-decoration-none"
                            >
                                {blog.title.slice(0, 50) + "..."}
                            </Link>
                        </h5>
                        <p className="card-text">
                            {blog.description.slice(0, 40) + "..."}
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CardHoriz;
