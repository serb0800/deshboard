import { NextPage } from "next";
import SignInForm from "./form";
import { authenticate } from "../lib/actions";
import { Content } from "antd/es/layout/layout";

const SignInPage: NextPage = () => {
  return (
    <Content className="w-full">
      <SignInForm sauthenticate={authenticate} />;
    </Content>
  );
};

export default SignInPage;
