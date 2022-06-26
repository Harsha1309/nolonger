import { NONAME } from "dns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAPI } from "../../utils/FetchData";
import Category from "../../pages/category";
//import { updateCategory } from "../../redux/actions/categoryAction";
import { CREATE_CATEGORY } from "../../redux/types/categoryType";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../redux/actions/categoryAction";
import { Dispatch } from "react";
import { ALERT, IAlertType } from "../../redux/types/alertType";
import {
  RootStore,
  IBlog,
  InputChange,
  ICategory,
} from "../../utils/TypeScript";

interface IProps {
  blog: IBlog;
  setBlog: (blog: IBlog) => void;
}

const CreateForm: React.FC<IProps> = ({ blog, setBlog }) => {
  const dispatch = useDispatch();
  const { categories, auth } = useSelector((state: RootStore) => state);
  const app = document.getElementById("app");
  //const cat = document.getElementById("inputcat");
  // const initState = {
  //   [
  //     name: "",
  //   createdAt: new Date().toISOString(),
  //   updatedAt: new Date().toISOString(),
  // ]
  // };

  const [categor, setCategor] = useState(categories);
  const [catname, setCatname] = useState("");
  //console.log(categor);
  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleChangeCat = (e: any) => {
    const value = e.target.id;
    setBlog({ ...blog, category: value });
    //console.log(blog);
    if(app)
    app.style.display='none';
    setCatname(e.target.innerText);
  };

  const handleChangeThumbnail = (e: InputChange) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      const file = files[0];
      setBlog({ ...blog, thumbnail: file });
    }
  };

  function showhide() {
    if (app) app.style.display = "block";
  }
  function close() {
    if (app) app.style.display = "none";
  }

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      try {
        const res = await getAPI(`categoryarray?categor=${catname}`);
        setCategor(res.data);
      } catch (err) {
        console.log(err);
      }
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [catname, dispatch, categories]);

  const addcat = () => {
    if(app)
    app.style.display='none';
    if (auth.access_token) dispatch(createCategory(catname, auth.access_token));
  };

  return (
    <form>
      <div className="form-group position-relative">
        <input
          type="text"
          className="form-control"
          value={blog.title}
          name="title"
          onChange={handleChangeInput}
          placeholder="Title..."
        />

        <small
          className="text-muted position-absolute"
          style={{ bottom: 0, right: "3px", opacity: "0.3" }}
        >
          {blog.title.length}/50
        </small>
      </div>

      <div className="form-group my-3">
        <label htmlFor="thumbnail">Thumbnail</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleChangeThumbnail}
          id="thumbnail"
        />
      </div>

      <div className="form-group position-relative">
        <textarea
          className="form-control"
          rows={4}
          value={blog.description}
          style={{ resize: "none" }}
          name="description"
          onChange={handleChangeInput}
          placeholder="Description..."
        />

        <small
          className="text-muted position-absolute"
          style={{ bottom: 0, right: "3px", opacity: "0.3" }}
        >
          {blog.description.length}/200
        </small>
      </div>

      <div className="form-group my-3">
        <input
          autoComplete="off"
          id="inputcat"
          type="text"
          className="form-control me-2 w-100"
          value={catname}
          placeholder="Enter your search..."
          //onBlur={(e) => showhide()}
          onFocus={(e) => showhide()}
          onChange={(e) => setCatname(e.target.value)}
        />
        <div
          className="container pt-2 px-1 w-100 rounded position-relative"
          id="app"
          style={{
            marginTop: 2,
            background: "#cbcaca",
            zIndex: 10,
            maxHeight: "calc(100vh - 100px)",
            maxWidth: 450,
            overflow: "auto",
            paddingBottom: 3,
            display: "none",
          }}
        >
          <span className="btn btn-secondary p-1 position-absolute px-3" style={{right:5}} onClick={e=>{close()}}>&times;</span>
         
           {categor.length &&
          <p style={{ color: "black" }}>Select One...</p>
           }
          {categor.map((category) => (
            <span
              className="btn btn-success py-1 m-1"
              key={category._id}
              id={category._id}
              // style={{ margin: 1, border: 1, backgroundColor: "white",borderRadius:2 ,padding:2}}
              onClick={(e) => {
               // console.log(e);
               
                handleChangeCat(e);
              }}
            >
              {category.name}
            </span>
          ))}
          { !categor.length ?
            (<span className="btn btn-light py-2 m-1 pb-2" onClick={(e) => addcat()}>
              Add Category
            </span>) : ""
          }
        </div>
      </div>

      {/* //       blogs.map((blog) => <CardHoriz key={blog._id} blog={blog} />)
        //     ) : (
        //       <h3 className="text-center">Add Category</h3>
        //     )}
        //   </div>
        // )} */}

      {/* <input
          className="form-control text-capitalize"
          name="category"
          onChange={handleChangeCat}
          id="category"
          list="category"
        /> */}

      {/* <option value="">Choose a category</option>
          {
            categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))
          } */}
    </form>
  );
};

export default CreateForm;
