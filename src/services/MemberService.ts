// src/services/MemberService.ts
import axios from "axios";

import type { LoginInput, Member, MemberInput } from "../lib/types/member";

const serverApi = import.meta.env.VITE_SERVER_API as string;

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  //! ------- signup -------
  public async signup(input: MemberInput): Promise<Member> {
    try {
      const url = `${this.path}/member/signup`;
      const result = await axios.post(url, input, { withCredentials: true });
      const member = result.data.member;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.log("ERROR, signup:", err);
      throw err;
    }
  }

  //! ------- login -------
  public async login(input: LoginInput): Promise<Member> {
    try {
      const url = `${this.path}/member/login`;
      const result = await axios.post(url, input, { withCredentials: true });
      const member = result.data.member;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.log("ERROR, login:", err);
      throw err;
    }
  }

  //! ------- getMe -------
  public async getMe(): Promise<Member> {
    try {
      const url = `${this.path}/member/me`;
      const result = await axios.get(url, { withCredentials: true });
      const member = result.data.member;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.log("ERROR, getMe:", err);
      throw err;
    }
  }

  //! ------- logout -------
  public async logout(): Promise<void> {
    try {
      const url = `${this.path}/member/logout`;
      await axios.post(url, {}, { withCredentials: true });
      localStorage.removeItem("memberData");
    } catch (err) {
      console.log("ERROR, logout:", err);
      throw err;
    }
  }
}

export default MemberService;
