import { getData } from "@/actions/actions";
import Dashboard from "@/components/dashboard/Dashboard";
import { NextPage } from "next";

import { Content, Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import Space from "antd/es/space";

interface Props {}

const Page: NextPage<Props> = async ({}) => {
  const { data, AffiliateList, CountryList } = await getData();
  return (
    <>
      <Content>
        <Dashboard
          data={data}
          AffiliateList={AffiliateList}
          CountryList={CountryList}
        />
      </Content>
    </>
  );
};

export default Page;
