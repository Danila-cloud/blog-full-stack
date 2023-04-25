import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./slices/posts";
import { useReducer } from "react";
import { authReducer } from "./slices/user";

const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
  },
});

export default store;
