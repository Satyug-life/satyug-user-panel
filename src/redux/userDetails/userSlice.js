import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  collectiveId: "",
  userId: "",
  name: "",
  image: "",
  email: "",
  refer: "",
  phoneNumber:""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.token = action.payload.token;
      state.collectiveId = action.payload.collectiveId;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserImageName: (state, action) => {
      state.name = action.payload.name;
      state.image = action.payload.image;
      state.email = action.payload.email;
      state.refer = action.payload.refer;
      state.phoneNumber = action.payload.phoneNumber;

    },
    setUserReferKey: (state, action) => {
      state.refer = action.payload;
    },
  },
});

export const { setUserDetails, setUserId, setUserImageName, setUserReferKey } =
  userSlice.actions;

export default userSlice.reducer;
