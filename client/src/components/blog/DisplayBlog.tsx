import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "./Sidebar";
import { IBlog, RootStore, IUser, IComment } from "../../utils/TypeScript";

import Input from "../comments/Input";
import Comments from "../comments/Comments";
import Loading from "../global/Loading";
import Pagination from "../global/Pagination";

import { createComment, getComments } from "../../redux/actions/commentAction";
import { getAPI, patchAPI, putAPI } from "../../utils/FetchData";
import { Timer, Time, TimerOptions } from 'timer-node';

interface IProps {
  blog: IBlog;
}
const timer = new Timer({ label: 'usertime' });
const DisplayBlog: React.FC<IProps> = ({ blog }) => {
  const { auth, comments, darkMode } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const { isdarkMode } = darkMode;
  const [showComments, setShowComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const history = useHistory();

  const handleComment = (body: string) => {
    if (!auth.user || !auth.access_token) return;

    const data = {
      content: body,
      user: auth.user,
      blog_id: blog._id as string,
      blog_user_id: (blog.user as IUser)._id,
      replyCM: [],
      createdAt: new Date().toISOString(),
    };

    setShowComments([data, ...showComments]);
    dispatch(createComment(data, auth.access_token));
  };

  useEffect(() => {
    setShowComments(comments.data);
  }, [comments.data]);

  const fetchComments = useCallback(
    async (id: string, num = 1) => {
      setLoading(true);
      await dispatch(getComments(id, num));
      setLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    timer.start();
    setTimeout(function () {
      putAPI("addv", { blog })
    }, 10000)
    return () => {
      const t = timer.ms();
      patchAPI("adduser", { blog, t });
    }
  }, [])
  useEffect(() => {
    if (!blog._id) return;
    const num = history.location.search.slice(6) || 1;
    fetchComments(blog._id, num);
  }, [blog._id, fetchComments, history]);

  const handlePagination = (num: number) => {
    if (!blog._id) return;
    fetchComments(blog._id, num);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      <div style={{ flex: 9 }}>
        <div style={{ maxWidth: 850, margin: "20px", minWidth: 250 }}>
          <h2
            className="text-center my-3 text-capitalize fs-1"
            style={{ color: isdarkMode ? 'white' : 'black', fontSize: 30 }}
          >
            <b>{blog.title}</b>
          </h2>


          <hr style={{ color: isdarkMode ? 'white' : 'black' }} /><br />



          <div className='ql-snow'>
            <div className='ql-editor p-0' dangerouslySetInnerHTML={{ __html: blog.content }} style={{ fontSize: "18px", color: isdarkMode ? 'white' : 'black' }} />
          </div>

          <hr className="my-1" />
          <h3 style={{ color: "#ff7a00" }}>✩ Comments ✩</h3>

          {auth.user ? (
            <Input callback={handleComment} />
          ) : (
            <h5 className={`text-${isdarkMode ? 'light' : 'dark'}`}>
              Please <Link to={`/login?blog/${blog._id}`}>login</Link> to
              comment.
            </h5>
          )}

          {loading ? (
            <Loading />
          ) : (
            showComments?.map((comment, index) => (
              <Comments key={index} comment={comment} />
            ))
          )}
          {comments.total > 1 && (
            <Pagination total={comments.total} callback={handlePagination} />
          )}
        </div>
      </div>
      <Sidebar blog={blog} />
    </div>
  );
};

export default DisplayBlog;
