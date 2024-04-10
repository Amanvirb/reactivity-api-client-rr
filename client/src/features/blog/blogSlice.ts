import { createSlice } from "@reduxjs/toolkit";
import { Blog } from "../../app/models/blog";
import { idle } from "../../app/common/options/sliceOpt";
import { router } from "../../app/layout/Routes";

interface IBlogState {
  blogList: Blog[];
  blog: Blog | null;
  blogStatus: string;
  loading: boolean;
}

const initialState: IBlogState = {
  blogList: [],
  blog: null,
  blogStatus: idle,
  loading: true,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogList: (state, action) => {
      state.loading = false;
      state.blogList?.push(action.payload);
      state.loading = true;
      router.navigate("/blog");
    },
    deleteBlog: (state, action) => {
      const itemIndex = state.blogList.findIndex(
        (x) => x.id === action.payload
      );
      console.log("id is :", itemIndex);
      if (itemIndex === undefined || itemIndex < 0) return;

      if (itemIndex >= 0) {
        state.blogList.splice(itemIndex, 1);
      }
    },
    editBlog: (state, action) => {
      const itemIndex = state.blogList.findIndex(
        (x) => x.id === action.payload.id
      );
      console.log("payload is", action.payload);
      if (itemIndex === undefined || itemIndex < 0) return;

      if (itemIndex !== undefined) {
        // state.blogList[itemIndex] = action.payload;

        // let prevData = state.blogList[itemIndex];
        // prevData = { ...prevData, ...action.payload };
        // state.blogList[itemIndex] = prevData;

        // let prevBlogList = state.blogList;
        // prevBlogList[itemIndex] = { ...prevBlogList[itemIndex], ...action.payload };
        // state.blogList = prevBlogList;

        state.blogList[itemIndex] = {
          ...state.blogList[itemIndex],
          // ...action.payload,
          title: action.payload.title,
          description: action.payload.description,
        };
        router.navigate(`/blogdetail/${action.payload.id}`);
      }
    },
    setBlogDetail: (state, action) => {
      const currentBlog = state.blogList.find((x) => x.id === action.payload);
      if (currentBlog) {
        state.blog = currentBlog;
      }
    },
  },
});

export const { setBlogList, deleteBlog, editBlog, setBlogDetail } =
  blogSlice.actions;
