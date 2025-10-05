'use client'
import React, { useState, useEffect } from 'react'
import { Layout, Menu, Drawer, Button } from 'antd'
import { usePathname } from 'next/navigation'
import {
    DashboardOutlined,
    UserOutlined,
    SmileOutlined,
    SolutionOutlined,
    LogoutOutlined,
    TeamOutlined,
    UsergroupAddOutlined,
    ContactsOutlined,
    ApiOutlined,
    SettingOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import Sider from 'antd/es/layout/Sider'
import styles from './Sider.module.css'
import LogoSVG from '@/components/LogoSvg'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { signOut } from 'next-auth/react'

const Sidebar: React.FC = () => {
    const [drawerVisible, setDrawerVisible] = useState(false)
    const screens = useBreakpoint()
    const currentPath = usePathname()

    const handleLogout = async () => {
        await signOut({ redirect: false }) // перенаправление на главную страницу после выхода
    }

    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible)
    }

    const menuItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
        },
        {
            key: '/statistic',
            icon: <DashboardOutlined />,
            label: <Link href="/statistic">Statistic</Link>,
        },
        {
            key: '/campaigns',
            icon: <UserOutlined />,
            label: <Link href="/campaigns">Campaigns</Link>,
        },
        {
            key: '/agents',
            icon: <SmileOutlined />,
            label: <Link href="/agents">Agents</Link>,
        },
        {
            key: 'utils',
            icon: <SolutionOutlined />,
            label: 'Utils',
        },
        {
            key: 'affiliates',
            icon: <TeamOutlined />,
            label: 'Affiliates',
        },
        {
            key: 'employees',
            icon: <UsergroupAddOutlined />,
            label: 'Employees',
        },
        {
            key: 'leads',
            icon: <ContactsOutlined />,
            label: 'Leads',
        },
        {
            key: 'integrations',
            icon: <ApiOutlined />,
            label: 'Integrations',
        },
        {
            key: 'system-settings',
            icon: <SettingOutlined />,
            label: 'System Settings',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: (
                <Link role="button" rel="" onClick={handleLogout} href={''}>
                    Logout
                </Link>
            ),
        },
    ]

    return (
        <>
            {screens.xs ? (
                <>
                    <Button
                        type="primary"
                        onClick={toggleDrawer}
                        style={{ marginBottom: 16 }}
                        aria-label="Open Menu"
                    >
                        Menu
                    </Button>
                    <Drawer
                        title={<LogoSVG />}
                        placement="left"
                        closable={true}
                        classNames={{
                            body: styles.drawerbg,
                            header: styles.drawerbg,
                        }}
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
    )
}

export default Sidebar
