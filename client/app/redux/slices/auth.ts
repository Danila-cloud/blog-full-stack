import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '~/axios';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params: any) => {
  const { data } = await instance.post('/login', params);
  
  return data;
});

const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [fetchAuth.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    // @ts-ignore
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    // @ts-ignore
    [fetchAuth.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
  },
});

export const selectIsAuth = (state: any) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;