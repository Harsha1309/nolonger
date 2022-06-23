import { NONAME } from "dns";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CREATE_CATEGORY } from "../../redux/types/categoryType";

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
  const { categories } = useSelector((state: RootStore) => state);

  // const initState = {
  //   [
  //     name: "",
  //   createdAt: new Date().toISOString(),
  //   updatedAt: new Date().toISOString(),
  // ]
  // };

  const [categor, setCategor] = useState(categories);
  //console.log(categor);
  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleChangeCat = (e: InputChange) => {
    const { value, name } = e.target;
    setBlog({ ...blog, [name]: value });
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
    const app = document.getElementById("app");
    if(app){
    app.style.display = "block";
    }
  }

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
          type="text"
          list="categor"
          className="form-control me-2 w-100"
          value={blog.category}
          placeholder="Enter your search..."
          onChange={(e) => handleChangeCat(e)}
          onFocus={(e) => showhide()}
        />
        <div
          className="position-absolute pt-2 px-1 w-100 rounded"
          id="app"
          style={{
            background: "black",
            zIndex: 10,
            maxHeight: "calc(100vh - 100px)",
            maxWidth: 300,
            overflow: "auto",
            paddingBottom: 2,
            display: "none",
          }}
        >
          {categor.map((category) => (
            <span
              key={category._id}
              style={{ margin: 1, border: 1, backgroundColor: "white" }}
            >
              {category.name}
            </span>
          ))}
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
