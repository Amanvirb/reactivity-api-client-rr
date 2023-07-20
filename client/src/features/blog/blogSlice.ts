import { createSlice } from "@reduxjs/toolkit";
import { Blog } from "../../app/models/blog";
import { idle } from "../../app/common/options/sliceOpt";
import { router } from "../../app/layout/Routes";

interface BlogState {
  blogList: Blog[];
  blog: Blog | null;
  blogStatus: string;
  loading: boolean;
}

const initialState: BlogState = {
  blogList: [],
  blog: null,
  blogStatus: idle,
  loading: true,
};

// export const addBlog = createAsyncThunk<void, FieldValues>(
//   "blog/addBlog",
//   async (data, thunkAPI) => {
//     console.log("Data in Add Blog Slice", data);
// try {
//   await agent.blog.register(data);
//   toast.success("You have succefully registered");
// } catch (error: any) {
//   toast.error(error.data);
//   return thunkAPI.rejectWithValue({ error: error.data });
// }
//   }
// );

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogList: (state, action) => {
      state.loading = false;
      state.blogList?.push(action.payload);
      state.loading = true;
      console.log("state", state.blogList);
      router.navigate("/blog");
    },
    deleteBlog: (state, action) => {
      const itemIndex = state.blogList.findIndex(
        (x) => x.id === action.payload
      );
      console.log("id is :", itemIndex);
      // console.log("id is :", action.payload);
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
        // state.blogList[itemIndex].category = action.payload.category;
        // state.blogList[itemIndex].description = action.payload.description;
        // state.blogList[itemIndex].title = action.payload.title;
        // state.blogList[itemIndex].isPublish = action.payload.isPublish;
        
        state.blogList[itemIndex]=action.payload;
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

  //   extraReducers: (builder) => {
  //     builder.addCase(addBlog.pending, (state) => {
  //       state.blogStatus = addBlogPending;
  //     });

  //     builder.addCase(addBlog.fulfilled, (state, action) => {
  //       console.log("state", state.blogList);
  //       console.log("Action", action.meta.arg);
  //       state.blogStatus = idle;
  //     });

  //     builder.addCase(addBlog.rejected, (state, action) => {
  //       throw action.payload;
  //     });
  //   },
});

export const { setBlogList, deleteBlog, editBlog, setBlogDetail } =
  blogSlice.actions;
