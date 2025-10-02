import { NextPage } from 'next'
import SignInForm from './form'
import { authenticate } from '../lib/actions'
import { Content } from 'antd/es/layout/layout'
import { auth } from '../../../auth'
import { redirect } from 'next/navigation'

export const metadata = {
    title: 'LUCRUM | Admin',
    description: '',
}
const SignInPage: NextPage = async () => {
    const session = await auth()

    if (session?.user?.name === 'Admin') redirect('/statistic')
    return (
        <Content className="w-full">
            <SignInForm authenticate={authenticate} />;
        </Content>
    )
}

export default SignInPage
