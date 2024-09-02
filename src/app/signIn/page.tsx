import { NextPage } from "next";
import SignInForm from "./form";
import { authenticate } from "../lib/actions";
import { Content } from "antd/es/layout/layout";
import { auth } from "../../../auth"
import { redirect } from "next/navigation";

const SignInPage: NextPage = async () => {
  const session = await auth()
  console.log('session', session)
  if (session?.user?.name === 'Admin') redirect('/dashboard')
  return (
    <Content  className="w-full">
      <SignInForm authenticate={authenticate} />;
    </Content>
  );
};

export default SignInPage;
