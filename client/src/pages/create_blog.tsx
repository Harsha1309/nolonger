import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootStore, IBlog, IUser } from "../utils/TypeScript";
import { validCreateBlog, shallowEqual } from "../utils/Valid";
import { getAPI } from "../utils/FetchData";

import NotFound from "../components/global/NotFound";
import CreateForm from "../components/cards/CreateForm";
import CardHoriz from "../components/cards/CardHoriz";

import ReactQuill from "../components/editor/ReactQuill";

import { ALERT } from "../redux/types/alertType";

import { createBlog, updateBlog } from "../redux/actions/blogAction";

interface IProps {
  id?: string;
}
const CreateBlog: React.FC<IProps> = ({ id }) => {
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

  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const [oldData, setOldData] = useState<IBlog>(initState);

  useEffect(() => {
    if (!id) return;

    getAPI(`blog/${id}`)
      .then((res) => {
        setBlog(res.data);
        setBody(res.data.content);
        setOldData(res.data);
      })
      .catch((err) => console.log(err));

    const initData = {
      user: "",
      title: "",
      content: "",
      description: "",
      thumbnail: "",
      category: "",
      createdAt: new Date().toISOString(),
    };

    return () => {
      setBlog(initData);
      setBody("");
      setOldData(initData);
    };
  }, [id]);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    const text = div?.innerText as string;
    setText(text);
  }, [body]);

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
      content: body.replaceAll("<img src", '<img width="100%" src'),
    };

    if (id) {
      if ((blog.user as IUser)._id !== auth.user?._id)
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

      dispatch(updateBlog(newData, auth.access_token));
    } else {
      dispatch(createBlog(newData, auth.access_token));
    }
  };

  if (!auth.access_token) return <NotFound />;

  return (
    <div
      className="my-4 create_blog"
      style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
    >
      <div style={{ flex: 10, maxWidth: "900px" }}>
        <div className="row mt-4">
          <div className="col-md-6">
            <h5>Create</h5>
            <CreateForm blog={blog} setBlog={setBlog} />
          </div>

          <div className="col-md-6">
            <h5>Preview</h5>
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

        <small>{text.length}</small>
      </div>
      <div style={{ flex: 2, maxWidth: 330, margin: 15 }}>
        <h5>Blog Policy</h5>
        <div
          className="blogpolicy"
          style={{
            backgroundColor: "#cbcaca",
            borderRadius: 5,
            padding: 10,
            color: "black",
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
          <br />
          <br />
          <button
            className="btn btn-light mt-3 d-block mx-auto"
            onClick={handleSubmit}
          >
            {id ? "Update Post" : "Create Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
