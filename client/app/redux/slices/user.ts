import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "~/axios";

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (params: any) => {
    const { data } = await instance.post("/login", params);

    return data;
  }
);

export const fetchLogin = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await instance.get("/my-profile");

  return data;
});

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params: any) => {
    const { data } = await instance.post("/register", params);

    return data;
  }
);

export const updateEmail = createAsyncThunk(
  "updateEmail",
  async (params: any) => {
    const { data } = await instance.patch(
      `/change-email/${window.localStorage.getItem("id")}`,
      params
    );

    return data;
  }
);

export const updateName = createAsyncThunk(
  "updateName",
  async (params: any) => {
    const { data } = await instance.patch(
      `/change-name/${window.localStorage.getItem("id")}`,
      params
    );

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
  reducers: {
    logout: (state: any) => {
      state.data = null;

      window.localStorage.removeItem("token");
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
      window.localStorage.removeItem("id");
    },
  },
  extraReducers: {
    // @ts-ignore
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    // @ts-ignore
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    // @ts-ignore
    [fetchAuth.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    // @ts-ignore
    [fetchLogin.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    // @ts-ignore
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    // @ts-ignore
    [fetchLogin.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    // @ts-ignore
    [fetchRegister.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    // @ts-ignore
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    // @ts-ignore
    [fetchRegister.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    // @ts-ignore
    [updateEmail.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    // @ts-ignore
    [updateEmail.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    // @ts-ignore
    [updateEmail.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    // @ts-ignore
    [updateName.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    // @ts-ignore
    [updateName.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    // @ts-ignore
    [updateName.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const { logout } = authSlice.actions;

export const selectIsAuth = (state: any) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;
