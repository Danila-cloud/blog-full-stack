import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "~/axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await instance.get("/posts");

  return data;
});

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [fetchPosts.pending]: (state: any) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    // @ts-ignore
    [fetchPosts.fulfilled]: (state: any, action: any) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    // @ts-ignore
    [fetchPosts.rejected]: (state: any) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
  },
});

export const postReducer = postsSlice.reducer;
