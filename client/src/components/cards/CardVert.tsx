import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { IBlog, ICategory, RootStore } from "../../utils/TypeScript";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Onlytick from "../profile/Onlytick";
import Homeuser from "../profile/SingleFollower"
import Follow from "../profile/Follow";
import { useSelector } from "react-redux";
import DarkMode from "../global/DarkMode";
TimeAgo.addDefaultLocale(en)
interface IProps {
  blog: IBlog;
  ispromoted?: boolean;
}

const CardVert: React.FC<IProps> = ({ blog, ispromoted }) => {
  const timeAgo = new TimeAgo('en-US')

  let mode=localStorage.getItem('theme');
  console.log(mode);
  return (
    <div className="card mb-2 border-0 border-md-1">
      {typeof blog.user !== "string" &&
        < div className="mx-2">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <Link to={`/profile/${blog.user._id}`} className="text-decoration-none">
              <div className="d-flex flex-row align-items-center"><img className="rounded-circle" src={blog.user.avatar} width="40" height="40" />
                <div className="d-flex flex-column align-items-start ml-2"><span className="font-weight-bold">{blog.user.name.slice(0, 12)}..<Onlytick role={blog.user.role} /></span><span className="followers text-muted"><small>{blog.user.follower.length} Followers{ispromoted && ', Ads'}</small></span></div>
              </div>
            </Link>
            <div className="d-flex flex-row align-items-center mt-2"><Follow user={blog.user} /></div>
          </div>
        </div>
      }
      <Link
        to={`/blog/${blog._id}`}
        style={{
          textDecoration: "none",
          textTransform: "capitalize",
        }}
      >
        <div className=" mt-2 position-relative">
          {typeof blog.thumbnail === "string" && (
            <img
              src={blog.thumbnail}
              className="card-img"
              alt={blog.title}
              style={{ height: "180px", objectFit: "cover" }}
            />
          )}
        </div>
      </Link>
      <div className="card-body container">
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
        <div className="text-muted d-flex justify-content-between">
          <div className="views"> {timeAgo.format(new Date(blog.createdAt))}
          </div>
          <div className="stats">
            <i className="far fa-eye"></i> {blog.views}
          </div>
        </div>
        <p className={`card-text `}>{blog.description.slice(0, 100) + "..."}</p>
      </div>
      <div className="card-footer text-muted d-flex justify-content-between bg-light border-top-0">
      </div>
    </div >

  );
};

export default CardVert;
