'use client'
import React, { useState, useEffect } from "react";
import { Layout, Menu, Drawer, Button } from "antd";
import { usePathname } from "next/navigation";
import { DashboardOutlined, UserOutlined, SmileOutlined, SolutionOutlined } from "@ant-design/icons";
import Link from "next/link";
import Sider from "antd/es/layout/Sider";
import styles from "./Sider.module.css";
import LogoSVG from "@/components/LogoSvg";
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

const Sidebar: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();
  const currentPath = usePathname();

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: (
        <Link href="/dashboard">
            Dashboard
        </Link>
      ),
    },
    {
      key: "/affiliates",
      icon: <UserOutlined />,
      label: (
        <Link href="/affiliates">
          Affiliates
        </Link>
      ),
    },
    {
      key: "/agents",
      icon: <SmileOutlined />,
      label: (
        <Link href="/agents">
          Agents
        </Link>
      ),
    },
    {
      key: "/utils",
      icon: <SolutionOutlined />,
      label: (
        <Link href="/utils">
          Utils
        </Link>
      ),
    },
  ];

  return (
    <>
      {screens.xs ? (
        <>
          <Button type="primary" onClick={toggleDrawer} style={{ marginBottom: 16 }} aria-label="Open Menu">
            Open Menu
          </Button>
          <Drawer
            title={<LogoSVG />}
            placement="left"
            closable={true}
            onClose={toggleDrawer}
            open={drawerVisible}
            bodyStyle={{ padding: 0 }}
          >
            <Menu
              theme="dark"
              selectedKeys={[currentPath]} // Устанавливаем активный элемент меню
              items={menuItems}
            />
          </Drawer>
        </>
      ) : (
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
            selectedKeys={[currentPath]} // Устанавливаем активный элемент меню
            items={menuItems}
          />
        </Sider>
      )}
    </>
  );
};

export default Sidebar;