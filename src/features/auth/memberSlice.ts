// src/features/auth/memberSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MemberService from "../../services/MemberService";
import type { LoginInput, Member, MemberInput } from "../../lib/types/member";

const memberService = new MemberService();

//* SIGN UP
export const signup = createAsyncThunk(
  "member/signup",
  async (input: MemberInput) => {
    return await memberService.signup(input);
  },
);

//* LOGIN
export const login = createAsyncThunk(
  "member/login",
  async (input: LoginInput) => {
    return await memberService.login(input);
  },
);

//* CHECK AUTH
export const fetchMe = createAsyncThunk("member/fetchMe", async () => {
  return await memberService.getMe();
});

//* LOGOUT
export const logout = createAsyncThunk("member/logout", async () => {
  await memberService.logout();
});

//* SLICE
const memberSlice = createSlice({
  name: "member",
  initialState: {
    user: null as Member | null,
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default memberSlice.reducer;
