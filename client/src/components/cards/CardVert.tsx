import React from "react";
import { Link } from "react-router-dom";

import { IBlog } from "../../utils/TypeScript";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)
interface IProps {
  blog: IBlog;
}

const CardVert: React.FC<IProps> = ({ blog }) => {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const timeAgo = new TimeAgo('en-US')
  return (
    <div className="card">
      {typeof blog.thumbnail === "string" && (
        <img
          src={blog.thumbnail}
          className="card-img"
          alt="..."
          style={{ height: "180px", objectFit: "cover" }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">
          {" "}
          <Link
            to={`/blog/${blog._id}`}
            style={{
              textDecoration: "none",
              textTransform: "capitalize",
            }}
          >
            {blog.title.slice(0, 50) + "..."}
          </Link>
        </h5>
        <small className="text-muted cat my-1">
          <i className="far fa-clock text-info"></i> <b>{(blog.content.length / 700).toFixed(2)} minutes {'  '}</b>
          {typeof blog.user !== "string" && <><i className="fas fa-user text-info"></i> {' '}
            <Link
              to={`/profile/${blog.user._id}`}
              style={{
                textDecoration: "none",
                textTransform: "capitalize",
              }}><b>
                {blog.user.name}</b></Link></>}
        </small>
        <p className="card-text my-2">{blog.description.slice(0, 100) + "..."}</p>
      </div>
      <div className="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
        <div className="views"> {timeAgo.format(new Date(blog.createdAt))}

        </div>
        <div className="stats">
          <i className="far fa-eye"></i> {blog.views}
          {/* <i className="far fa-comment"></i> 12 */}
        </div>

      </div>
    </div>

  );
};

export default CardVert;
