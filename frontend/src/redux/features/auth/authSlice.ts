import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userInfo: any | null; 
  activeProfile: any | null;
}

const initialState: AuthState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null,
  activeProfile: localStorage.getItem("activeProfile")
    ? JSON.parse(localStorage.getItem("activeProfile")!)
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));

      if (action.payload.activeProfile) {
        state.activeProfile = action.payload.activeProfile;
        localStorage.setItem("activeProfile", JSON.stringify(action.payload.activeProfile));
      }

      const expireTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem('expireTime', expireTime.toString());
    },
    logout: (state) => {
      state.userInfo = null;
      state.activeProfile = null;
      localStorage.clear();
    },
    setActiveProfile: (state, action: PayloadAction<any>) => {
      state.activeProfile = action.payload;
      localStorage.setItem("activeProfile", JSON.stringify(action.payload));
    },
  },
});

export const { setCredentials, logout, setActiveProfile } = authSlice.actions;
export default authSlice.reducer;
