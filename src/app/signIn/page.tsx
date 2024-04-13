import { NextPage } from "next";
import SignInForm from "./form";
import { authenticate } from "../lib/actions";

const SignInPage: NextPage = () => {
  return <SignInForm authenticate={authenticate} />;
};

export default SignInPage;
