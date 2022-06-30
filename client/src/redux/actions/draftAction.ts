import { Dispatch } from "redux";
import { IBlog } from "../../utils/TypeScript";
import { imageUpload } from "../../utils/ImageUpload";
import {
  postAPI,
  getAPI,
  putAPI,
  deleteAPI,
  patchAPI,
} from "../../utils/FetchData";

import { ALERT, IAlertType } from "../types/alertType";

import {
  GET_DRAFTS_USER_ID,
  IGetDraftsUserType,
  CREATE_DRAFTS_USER_ID,
  ICreateDraftsUserType,
  DELETE_DRAFTS_USER_ID,
  IDeleteDraftsUserType,
} from "../types/draftType";

import { checkTokenExp } from "../../utils/checkTokenExp";

export const createDraft =
  (blog: IBlog, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICreateDraftsUserType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    let url;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      if (blog.thumbnail)
        if (typeof blog.thumbnail !== "string") {
          const photo = await imageUpload(blog.thumbnail);
          url = photo.url;
        } else {
          url = blog.thumbnail;
        }

      const newDraft = { ...blog, thumbnail: url };

      const res = await postAPI("draft", newDraft, access_token);

      dispatch({
        type: CREATE_DRAFTS_USER_ID,
        payload: res.data,
      });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const getDraftsByUserId =
  (id: string, search: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | IGetDraftsUserType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      let limit = 3;
      let value = search ? search : `?page=${1}`;

      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await putAPI(
        `drafts/user/${id}${value}&limit=${limit}`,
        {},
        access_token
      );

      dispatch({
        type: GET_DRAFTS_USER_ID,
        payload: { ...res.data, id, search },
      });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const updateDraft =
  (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    let url;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      if (typeof blog.thumbnail !== "string") {
        const photo = await imageUpload(blog.thumbnail);
        url = photo.url;
      } else {
        url = blog.thumbnail;
      }

      const newBlog = { ...blog, thumbnail: url };

      const res = await putAPI(`draft/${newBlog._id}`, newBlog, access_token);

      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const createBlogdeleteDraft =
  (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    let url;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      if (typeof blog.thumbnail !== "string") {
        const photo = await imageUpload(blog.thumbnail);
        url = photo.url;
      } else {
        url = blog.thumbnail;
      }

      const newBlog = { ...blog, thumbnail: url };

      const res = await patchAPI(`draft/${newBlog._id}`, newBlog, access_token);

      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const deleteDraft =
  (blog: IBlog, token: string) =>
  async (dispatch: Dispatch<IAlertType | IDeleteDraftsUserType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch({
        type: DELETE_DRAFTS_USER_ID,
        payload: blog,
      });
      await deleteAPI(`draft/${blog._id}`, access_token);
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
