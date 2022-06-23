import React from "react";
import { Link } from "react-router-dom";

import { IBlog } from "../../utils/TypeScript";

interface IProps {
  blog: IBlog;
}

const CardVert: React.FC<IProps> = ({ blog }) => {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return (
    // <div className="card h-100">
    //   {typeof blog.thumbnail === "string" && (
    //     <img
    //       src={blog.thumbnail}
    //       className="card-img-top"
    //       alt="..."
    //       style={{ height: "180px", objectFit: "cover" }}
    //     />
    //   )}
    //   <div className="card-body">
    // <h5 className="card-title">
    //   {" "}
    //   <Link
    //     to={`/blog/${blog._id}`}
    //     style={{
    //       textDecoration: "none",
    //       textTransform: "capitalize",
    //     }}
    //   >
    //     {blog.title.slice(0, 50) + "..."}
    //   </Link>
    // </h5>
    //     <p className="card-text">{blog.description.slice(0, 100) + "..."}</p>
    //   </div>
    //   <div className="card-footer justify-content-between row" style={{overflow:'hidden'}}>
    //     <small className="text-muted text-capitalize col-4">
    //       {typeof blog.user !== "string" && (
    //         <Link
    //           to={`/profile/${blog.user._id}`}
    //           style={{
    //             textDecoration: "none",
    //             textTransform: "capitalize",
    //           }}
    //         >
    //           <i className="fa fa-user" aria-hidden="true">
    //             {" "}
    //           </i>{" "}
    //           {blog.user.name}
    //         </Link>
    //       )}
    //     </small>
    //     <small className="text-muted text-capitalize col-4">
    //       <i className="fa fa-eye" aria-hidden="true">
    //         {" "}
    //       </i>{" "}
    //       {blog.views}
    //     </small>

    //     <small className="text-muted col-4">
    //       <i className="fa fa-clock-o" aria-hidden="true"></i>
    //       {new Date(blog.createdAt).toLocaleString()}
    //     </small>
    //   </div>
    // </div>


    <div className="card">
      {typeof blog.thumbnail === "string" && (
        <img
          src={blog.thumbnail}
          className="card-img"
          alt="..."
          style={{ height: "180px", objectFit: "cover" }}
        />
      )}
      {/* <img className="card-img" src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/pasta.jpg" alt="Bologna"/> */}
      {/* <div className="card-img-overlay">
        <a href="#" className="btn btn-light btn-sm">{blog.category}</a>
      </div> */}
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
        <div className="views">{new Date(blog.createdAt).toLocaleString()}
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
