import { getData } from '@/actions/actions'
import Dashboard from '@/components/dashboard/Dashboard'
import { NextPage } from 'next'
import Layout, { Content } from 'antd/es/layout/layout'
import theme from '../../theme/themeConfig'
import en_GB from 'antd/locale/en_GB'
import { ConfigProvider } from 'antd'
import Sidebar from '@/components/Sider'
import { auth } from '../../../auth'
import { redirect } from 'next/navigation'
interface Props {
    searchParams: { date?: string }
}

export const metadata = {
    title: 'Statistic',
    description: '',
}

const Page: NextPage<Props> = async (props) => {
    const session = await auth()

    if (session?.user?.name !== 'Admin') redirect('/signIn')
    return (
        <>
            <ConfigProvider locale={en_GB} theme={theme}>
                <Layout className="w-full h-max">
                    <Sidebar />
                    <Layout>
                        <Content>
                            <Dashboard />
                        </Content>
                    </Layout>
                </Layout>
            </ConfigProvider>
        </>
    )
}

export default Page
