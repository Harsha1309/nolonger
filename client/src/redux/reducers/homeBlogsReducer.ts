import {
  GET_HOME_BLOGS,
  IGetHomeBlogsType,
  IHomeBlogs,
} from "../types/blogType";

const initialState = {
  blogs: [],
  total: 0, //total number of pages present in the data base
  count: 0, //page scrolled
};

const homeBlogsReducer = (
  state: IHomeBlogs = initialState,
  action: IGetHomeBlogsType
): IHomeBlogs => {
  switch (action.type) {
    case GET_HOME_BLOGS:
      return {
        total: action.payload.total,
        count: state.count + 1,
        blogs: [...state.blogs, ...action.payload.blogs],
      };

    default:
      return state;
  }
};

export default homeBlogsReducer;
