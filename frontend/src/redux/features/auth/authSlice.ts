import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userInfo: any | null; 
}

const initialState: AuthState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));

      const expireTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem('expireTime', expireTime.toString());
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
