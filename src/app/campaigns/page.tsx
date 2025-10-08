'use client'
import { getData } from '@/actions/actions'
import { NextPage } from 'next'
import Layout, { Content } from 'antd/es/layout/layout'

import theme from '../../theme/themeConfig'
import en_GB from 'antd/locale/en_GB'
import { ConfigProvider } from 'antd'
import Sidebar from '@/components/Sider'
import Affilete from '@/components/affilete/Affilete'
interface Props {
    searchParams: { date?: string }
}

const Page: NextPage<Props> = async (props) => {
    return (
        <>
            <ConfigProvider locale={en_GB} theme={theme}>
                <Layout className="w-full h-max">
                    <Sidebar />
                    <Layout>
                        <Content>
                            <Affilete />
                        </Content>
                    </Layout>
                </Layout>
            </ConfigProvider>
        </>
    )
}

export default Page
