'use client'
import { getData } from "@/actions/actions";
import Dashboard from "@/components/dashboard/Dashboard";
import { NextPage } from "next";
import Layout, { Content } from "antd/es/layout/layout";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";

import DashboardOutlined from "@ant-design/icons/lib/icons/DashboardOutlined";
import Link from "antd/es/typography/Link";
import Menu from "antd/es/menu/menu";
import Sider from "antd/es/layout/Sider";
import styles from "./Sider.module.css"; // Импорт CSS модуля
import LogoSVG from "@/components/LogoSvg";
import theme from '../../theme/themeConfig';
import en_GB from 'antd/locale/en_GB';
import { ConfigProvider } from "antd";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import SmileOutlined from "@ant-design/icons/lib/icons/SmileOutlined";
import { SolutionOutlined } from "@ant-design/icons";
interface Props {
  searchParams: { date?: string };
}

const Page: NextPage<Props> = (props) => {
  return (
    <>
     <ConfigProvider locale={en_GB} theme={theme}>

    
      <Layout className="w-full h-max">
        <Sider
          className={styles.siderCustom}
          width={250}
          trigger={null}
          collapsible={false}
        >
          <div className={styles.logoContainer}>
            <LogoSVG />
          </div>
          <Menu

            theme="dark"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <DashboardOutlined />,
                label: <Link href="/dashboard">Dashboard</Link>,
              },
              {
                key: "2",
                icon: <UserOutlined />,
                label: "Affiliates",
              },
              {
                key: "3",
                icon: <SmileOutlined />,
                label: "Agents",
              },
              {
                key: "4",
                icon: <SolutionOutlined />,
                label: "Utils",
              },
            ]}
          />
        </Sider>
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
