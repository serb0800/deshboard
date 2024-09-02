import { getData } from "@/actions/actions";
import Dashboard from "@/components/dashboard/Dashboard";
import { NextPage } from "next";
import Layout, { Content } from "antd/es/layout/layout";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import VideoCameraOutlined from "@ant-design/icons/lib/icons/VideoCameraOutlined";
import DashboardOutlined from "@ant-design/icons/lib/icons/DashboardOutlined";
import Link from "antd/es/typography/Link";
import Menu from "antd/es/menu/menu";
import Sider from "antd/es/layout/Sider";
import styles from "./Sider.module.css"; // Импорт CSS модуля
import LogoSVG from "@/components/LogoSvg";
interface Props {
  searchParams: { date?: string };
}

const Page: NextPage<Props> = async (props) => {
  console.log(props);
  const { data, AffiliateList, CountryList } = await getData();
  return (
    <>
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


            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <DashboardOutlined />,
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
        <Layout>
          <Content>
            <Dashboard
              data={data}
              AffiliateList={AffiliateList}
              CountryList={CountryList}
            />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Page;
