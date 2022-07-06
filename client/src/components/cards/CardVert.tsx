import React from "react";
import { Link } from "react-router-dom";

import { IBlog } from "../../utils/TypeScript";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Onlytick from "../profile/Onlytick";
import Homeuser from "../profile/SingleFollower"
TimeAgo.addDefaultLocale(en)
interface IProps {
  blog: IBlog;
}

const CardVert: React.FC<IProps> = ({ blog }) => {
  const timeAgo = new TimeAgo('en-US')
  return (
    <div className="card">
      <Homeuser id={typeof blog.user !== "string" ? blog.user._id : blog.user} />
      <Link
        to={`/blog/${blog._id}`}

        style={{
          textDecoration: "none",
          textTransform: "capitalize",
        }}
      >
        <div className="mt-2 position-relative">
          <div className="position-absolute" style={{ bottom: 0, right: 0 }}>

            {typeof blog.category !== "string" && <Link to={`/blogs/${blog.category.name ? blog.category.name : "#"}`} className="btn btn-dark btn-sm" >{blog.category.name}</Link>}

          </div>

          {typeof blog.thumbnail === "string" && (
            <img
              src={blog.thumbnail}
              className="card-img"
              alt="..."
              style={{ height: "180px", objectFit: "cover" }}
            />
          )}
        </div>

      </Link>

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
