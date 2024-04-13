import { getData } from '@/actions/actions'
import Dashboard from '@/components/dashboard/Dashboard'
import { NextPage } from 'next'

import { Content } from 'antd/es/layout/layout';

interface Props {}



const Page: NextPage<Props> = async ({}) => {
    const data = await getData()
  return (<>
    <Content>
        <Dashboard  data={data}/>
    </Content>
  </>)
}

export default Page