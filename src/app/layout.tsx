import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout, Menu } from "antd";
import "./globals.css";

import { Content } from "antd/es/layout/layout";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Sider from "antd/es/layout/Sider";

const RootLayout = ({ children, ...props }: React.PropsWithChildren) => {
  console.log(props);
  return (
    <html lang="en">
      <body className="min-h-[100vh] w-[100vw]">
        <AntdRegistry>
          <Layout className="w-full h-[100vh]">
            <Sider trigger={null} collapsible collapsed={true}>
              <div className="demo-logo-vertical" />
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                items={[
                  {
                    key: "1",
                    icon: <UserOutlined />,
                    label: <Link href="/dashboard">Dashboard</Link>,
                  },
                  {
                    key: "2",
                    icon: <VideoCameraOutlined />,
                    label: "nav 2",
                  },
                  {
                    key: "3",
                    icon: <UploadOutlined />,
                    label: "nav 3",
                  },
                ]}
              />
            </Sider>
            <Layout>{children}</Layout>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
