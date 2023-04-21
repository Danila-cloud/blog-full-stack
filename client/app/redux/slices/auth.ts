import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "~/axios";

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (params: any) => {
    const { data } = await instance.post("/login", params);

    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [fetchUserData.pending]: (state: any) => {
      state.items = [];
      state.status = "loading";
    },
    // @ts-ignore
    [fetchUserData.fulfilled]: (state: any, action: any) => {
      state.items = action.payload;
      state.status = "loaded";
    },
    // @ts-ignore
    [fetchUserData.rejected]: (state: any) => {
      state.items = [];
      state.status = "error";
    },
  },
});

export const selectIsAuth = (state: any) => Boolean(state.data);

export const authReducer = authSlice.reducer;
