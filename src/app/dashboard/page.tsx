
import { getData } from "@/actions/actions";
import Dashboard from "@/components/dashboard/Dashboard";
import { NextPage } from "next";
import Layout, { Content } from "antd/es/layout/layout";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import LogoSVG from "@/components/LogoSvg";
import theme from '../../theme/themeConfig';
import en_GB from 'antd/locale/en_GB';
import { ConfigProvider } from "antd";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import SmileOutlined from "@ant-design/icons/lib/icons/SmileOutlined";
import { SolutionOutlined } from "@ant-design/icons";
import Sidebar from "@/components/Sider";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
interface Props {
  searchParams: { date?: string };
}

const Page: NextPage<Props> = async (props) => {
  const session = await auth()
  console.log('session', session)
  if (session?.user?.name !== 'Admin') redirect('/signin')
  return (
    <>
     <ConfigProvider locale={en_GB} theme={theme}>
      <Layout className="w-full h-max">
      <Sidebar/>
        <Layout>
          <Content>
            <Dashboard
            />
          </Content>
        </Layout>
      </Layout>
      </ConfigProvider>
    </>
  );
};

export default Page;
