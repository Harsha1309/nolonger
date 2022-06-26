import UserBlogs from "../profile/SimilarBlogs";
import { Link } from "react-router-dom";
import "./sidebar.css";
import Follow from "../profile/Follow";

export default function Sidebar({ blog }) {

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT AUTHOR</span>
        <Link
          to={`/profile/${blog.user._id}`}
          style={{
            textDecoration: "none",
            textTransform: "capitalize",
          }}
        >
          <img
            src={`${blog.user.avatar}`}
            alt="Author Image"
            style={{ width: 200, height: 200, borderRadius: "50%" }}
          />
        </Link>
        <Link
          to={`/profile/${blog.user._id}`}
          style={{
            textDecoration: "none",
            textTransform: "capitalize",
            fontSize:20
          }}
        >
          <b>{`${blog.user.name}`}</b>
        </Link>
        <small className="ms-2 my-1">
          Blog Created At : {new Date(blog.createdAt).toLocaleString()}
        </small>

        <div className="mx-3 my-1" style={{ textAlign: "center" }}>
          <p>{`${blog.user.about}`}</p>
        </div>

        <div className="row my-3" style={{ textAlign: "center" }}>
          
          <div className="col-6">
            <b>Followers</b>
            <p>{blog.user.follower.length}</p>
          </div>
          <div className="col-6">
            <b>Following</b>
            <p>{blog.user.following.length}</p>
          </div>
        </div>
        <Follow user={blog.user} />
      </div>
      <br />
      <div className="sidebarItem">
        <span className="sidebarTitle">RELATED BLOGS</span>
        <UserBlogs user_id={blog.user._id} />
      </div>
    </div>
  );
}
