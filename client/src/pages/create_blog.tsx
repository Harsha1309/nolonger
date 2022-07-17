import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootStore, IBlog, IUser } from "../utils/TypeScript";
import { validCreateBlog, shallowEqual, validSaveDraft } from "../utils/Valid";
import { getAPI } from "../utils/FetchData";

import NotFound from "../components/global/NotFound";
import CreateForm from "../components/cards/CreateForm";
import CardHoriz from "../components/cards/CardHoriz";

import ReactQuill from "../components/editor/ReactQuill";

import { ALERT } from "../redux/types/alertType";

import { createBlog, deleteBlog, updateBlog } from "../redux/actions/blogAction";
import { createDraft, deleteDraft, getDraftsByUserId, updateDraft } from "../redux/actions/draftAction";
import UserDrafts from "../components/profile/UserDrafts";
import UserBlogs from "../components/profile/SimilarBlogs";
import { useHistory } from "react-router-dom";
import Helmetglobal from "../components/global/Helmetglobal";

interface IProps {
  id?: string;
  draft?: boolean;
}
const CreateBlog: React.FC<IProps> = ({ id, draft }) => {

  const initState = {
    user: "",
    title: "",
    content: "",
    description: "",
    thumbnail: "",
    category: "",
    createdAt: new Date().toISOString(),
  };

  const [blog, setBlog] = useState<IBlog>(initState);
  const [body, setBody] = useState("");
  const divRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");

  const { auth, draftsUser, blogsUser, darkMode } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const { isdarkMode } = darkMode;
  const [oldData, setOldData] = useState<IBlog>(initState);
  const history = useHistory();
  const search = history.location.search;
  useEffect(() => {
    if (id && draft === undefined) {
      getAPI(`blog/${id}`)
        .then((res) => {
          setBlog(res.data);
          setBody(res.data.content);
          setOldData(res.data);
        })
        .catch((err) => console.log(err));
    }
    else if (id && draft) {
      getAPI(`draft/${id}`, auth.access_token)
        .then((res) => {
          setBlog(res.data);
          setBody(res.data.content);
          setOldData(res.data);
        })
        .catch((err) => console.log(err));
    }

  }, [auth]);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    const text = div?.innerText as string;
    setText(text);
  }, [body]);
  const regex = /style=".*?"/ig;
  const handleSubmit = async () => {
    if (!auth.access_token) return;

    const check = validCreateBlog({ ...blog, content: text });
    if (check.errLength !== 0) {
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } });
    }
    const checkbox = document.getElementById(
      "consent"
    ) as HTMLInputElement | null;
    if (checkbox != null) {
      if (!checkbox.checked) {
        return dispatch({
          type: ALERT,
          payload: { errors: "Must accept the Blog Policy." },
        });
      }
    }
    let newData = {
      ...blog,
      content: body.replaceAll("<img src", '<img width="100%" src').replaceAll(regex, "")
    };

    if (id && !draft) {
      if (blog.user === auth.user?._id || typeof blog.user !== 'string' && blog.user._id === auth.user?._id) {

      }
      else return dispatch({
        type: ALERT,
        payload: { errors: "Invalid Authentication." },
      });

      const result = shallowEqual(oldData, newData);
      if (result)
        return dispatch({
          type: ALERT,
          payload: { errors: "The data does not change." },
        });

      dispatch(updateBlog(newData, auth.access_token));

    } else if (id && draft) {
      if (blog.user !== auth.user?._id)
        return dispatch({
          type: ALERT,
          payload: { errors: "Invalid Authentication." },
        });

      dispatch(createBlog(newData, auth.access_token));
      dispatch(deleteDraft(newData, auth.access_token));
      history.push(`/profile/${auth.user._id}`)
    }
    else {
      dispatch(createBlog(newData, auth.access_token));
      history.push(`/profile/${auth.user?._id}`)
    }
  };

  const handleDraft = async () => {
    if (!auth.access_token) return;


    const check = validSaveDraft({ ...blog, content: text });
    if (check.errLength !== 0) {
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } });
    }
    let newData = {
      ...blog,
      content: body.replaceAll("<img src", '<img width="100%" src').replaceAll(regex, ""),
    };
    if (id && draft) {
      console.log(blog.user)
      if (blog.user !== auth.user?._id)
        return dispatch({
          type: ALERT,
          payload: { errors: "Invalid Authentication." },
        });

      const result = shallowEqual(oldData, newData);
      if (result)
        return dispatch({
          type: ALERT,
          payload: { errors: "The data does not change." },
        });
      dispatch(updateDraft(newData, auth.access_token));
    } else if (id && draft === undefined) {
      dispatch(createDraft(newData, auth.access_token));
      dispatch(deleteBlog(newData, auth.access_token));
      history.push(`/profile/${auth.user?._id}`)
    }
    else {
      dispatch(createDraft(newData, auth.access_token));
      history.push(`/profile/${auth.user?._id}`)

    }

  };
  let url = history.location.pathname;
  url = url.substring(1);

  if (!auth.access_token) history.push(`/login?create_blog`);

  return (
    <div
      className="my-4 create_blog"
      style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
    >
      <Helmetglobal title="Create Blog" description="Write a grate post and let your words meet the whole world." keyword="create,Blog,Earn" />

      <div style={{ flex: 10, maxWidth: "900px" }}>
        <div className="row mt-4">
          <div className="col-md-6">
            <h5 className={`text-${isdarkMode ? 'white' : 'black'} text-center`}>Create</h5>
            <CreateForm blog={blog} setBlog={setBlog} />
          </div>

          <div className="col-md-6">
            <h5 className={`text-${isdarkMode ? 'white' : 'black'}  text-center`}>Preview</h5>
            <CardHoriz blog={blog} />
          </div>
        </div>

        <ReactQuill setBody={setBody} body={body} />

        <div
          ref={divRef}
          dangerouslySetInnerHTML={{
            __html: body,
          }}
          style={{ display: "none" }}
        />

        <small className={`text-muted text-${isdarkMode ? 'light' : 'dark'}`}>{text.length}</small>
      </div>
      <div style={{ flex: 2, maxWidth: 330, margin: 15 }} className={`bg-${isdarkMode ? 'dark' : 'light'}`}>
        <h5 className={`text-${isdarkMode ? 'white' : 'black'} my-2 text-center`}>Blog Policy</h5>
        <div
          className={`blogpolicy bg-${isdarkMode ? 'dark' : 'light'}`}
          style={{
            borderRadius: 5,
            padding: 10,
            color: isdarkMode ? 'white' : 'black',
            marginTop: 22,
            minWidth: 250,
          }}
        >
          <ol>
            <li>
              I have not copied any piece of content from any source available
              on the internet. The entire content is my own creativity.
            </li>
            <br />
            <li>I have not used any image from the internet in my blog.</li>
            <br />
            <li>
              I am ensuring that the content is not Violent, Repulsive, Hateful,
              Abusive, Harassment or Bullying, Harmful, Dangerous or promoting
              any Terrorism activity.
            </li>
            <br />
            <li>
              I am aware that if any of the above condition is found wrong in
              the content, my account may get blocked and the revenue generated
              from my content will not get paid to me.
            </li>
            <br />
          </ol>

          <input
            type="checkbox"
            id="consent"
            name="consent"
            value="consent"
            style={{
              padding: 4,
              margin: 3,
              marginLeft: 12,
              height: 18,
              width: 18,
            }}
          />
          <label htmlFor="consent">I accept the above conditions.</label>
          <br />
          <br />
          <button
            className="btn btn-light mt-3 d-block mx-auto"
            onClick={handleDraft}
          >
            {(id && draft === undefined) ? "Convert Draft" : "Save Draft"}
          </button>
          <button
            className="btn btn-light mt-3 d-block mx-auto"
            onClick={handleSubmit}
          >
            {(id && !draft) ? "Update Post" : "Create Post"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
