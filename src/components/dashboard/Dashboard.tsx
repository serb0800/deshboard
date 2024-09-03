"use client";
import en_GB from 'antd/locale/en_GB';
import { CloseOutlined, PlusCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import {
  Button,
  Space,
  Typography,
  DatePicker,
  Tag,
  Select,
  Grid,
  Flex,
} from "antd";
import { Content } from "antd/es/layout/layout";
import dayjs, { Dayjs } from "dayjs";
import React, { FC, Ref, useEffect, useRef, useState, useMemo, useCallback } from "react";
import ReactCountryFlag from "react-country-flag";
import FilterPopover from "../FilterPopover";
import Title from "antd/es/typography/Title";
import { getListReport, groupByKey, GroupedData } from "@/actions/request";
import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import axios from 'axios';
import { countryNameToCode } from '@/app/lib/contryNameToCode';
import { IFilter } from '@/types';

interface Props {}

interface IGroupByOption {
  label: string,
  value: groupByKey
}

const groupedCols: IGroupByOption[] = [
  { label: 'Day', value: 'day' },
  { label: 'Affiliate', value: 'affiliateId' },
  { label: 'Advertiser', value: 'advertiserId' },
  { label: 'Country', value: 'country' },
]

interface IEnums {
  countries: string[]
  affiliates: string[]
  advertisers: string[]
}

const Dashboard: FC<Props> = () => {
  const actionRef: Ref<ActionType | undefined> = useRef();
  const [ActiveGrouped, setGroupes] = useState<groupByKey[]>(["day", "affiliateId", "country"]);
  const [enums, setEnums] = useState<IEnums>({ advertisers: [], affiliates: [], countries: [] });
  const [range, setRange] = useState<{ start: Dayjs | undefined | null; end: Dayjs | undefined | null }>({
    start: undefined,
    end: undefined,
  });
  const [filter, setFilters] = useState<IFilter>({ advertiserIds: [], affiliateIds: [], country: [], isTest: false });
  const screens = Grid.useBreakpoint();

  useEffect(() => {
    (async () => {
      const data = await axios('api/enums');
      setEnums(data.data);
    })();
  }, []);

  const renerFilter = {
    Affiliate: useCallback(
      () => filter.affiliateIds?.map((name) => (
        <Tag closable onClose={() => onRemoveFilter('affiliateIds', name)}>
          {name}
        </Tag>
      )), [filter.affiliateIds]
    ),
    country: useCallback(
      () => filter.country?.map((name) => (
        <Tag closable onClose={() => onRemoveFilter('country', name)}>
          <ReactCountryFlag svg countryCode={name} />
        </Tag>
      )), [filter.country]
    ),
  };

  const onRemoveFilter = useCallback((object: keyof IFilter, removeVal: string) => {
    setFilters((prev) => ({
      ...prev,
      [object]: prev[object]?.filter((val) => val !== removeVal),
    }));
  }, []);

  const columns: ProColumns<GroupedData>[] = useMemo(() => [
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
      hideInTable: !ActiveGrouped.includes('day'),
      order: ActiveGrouped.indexOf('day'),
      render: (text) => <p>{new Date(text as string).toLocaleDateString()}</p>,
      sorter: (a, b) => Date.parse(a.Date) - Date.parse(b.Date),
    },
    {
      title: "Country",
      dataIndex: "Country",
      key: "Country",
      order: ActiveGrouped.indexOf('country'),
      hideInTable: !ActiveGrouped.includes('country'),
      render: (_, { Country }) =>
        Country && (
          <Typography.Text>
            <ReactCountryFlag countryCode={countryNameToCode[Country]} svg /> {Country}
          </Typography.Text>
        ),
    },
    {
      title: "Affiliate",
      dataIndex: "Affiliate",
      order: ActiveGrouped.indexOf('affiliateId'),
      hideInTable: !ActiveGrouped.includes('affiliateId'),
      key: "Affiliate",
    },
    {
      title: "Advertiser",
      dataIndex: "Advertiser",
      hideInTable: !ActiveGrouped.includes('advertiserId'),
      order: ActiveGrouped.indexOf('advertiserId'),
      key: "Advertiser",
    },
    {
      title: "Deposits",
      dataIndex: "TotalDeposits",
      key: "TotalDeposits",
    },
    {
      title: "Leads",
      dataIndex: "TotalLeads",
      key: "TotalLeads",
    },
    {
      title: "Conversion Rate",
      dataIndex: "ConversionRate",
      key: "ConversionRate",
      render: (val) => `${val}%`,
    },
  ], [ActiveGrouped]);

  useEffect(() => {
    actionRef.current?.reload();
  }, [ActiveGrouped, Object.values(filter)]);

  const disableFilter = useMemo(() => {
    return !Boolean(filter.advertiserIds?.length || filter.affiliateIds?.length || filter.country?.length || filter.timeframe?.[0] || filter.timeframe?.[1]);
  }, [filter]);

  return (
      <Content className="p-4 sm:p-6 overflow-hidden">
          <Title level={screens.xs ? 3 : 1}>Statistic</Title>
          <Space
              direction={ 'horizontal'}
              size="middle"
              align="start"
              className="w-full p-y-2"
          >
              <DatePicker.RangePicker
                  minDate={dayjs().subtract(1, 'year')}
                  maxDate={dayjs()}
                  format="DD-MM-YYYY"
                  value={[range.start, range.end]}
                  onChange={(dates) => {
                      setFilters((prev) => ({
                          ...prev,
                          timeframe: dates
                              ? [
                                    dates[0]?.toISOString() || '',
                                    dates[1]?.toISOString() || '',
                                ]
                              : undefined,
                      }))
                      setRange({
                          start: dates ? dates[0] : undefined,
                          end: dates ? dates[1] : undefined,
                      })
                  }}
                  className="w-full sm:w-auto"
              />
              <Button
                  onClick={() => {
                      setRange({ end: undefined, start: undefined })
                      setFilters({
                          affiliateIds: [],
                          country: [],
                          advertiserIds: [],
                          isTest: false,
                      })
                  }}
                  disabled={disableFilter}
                  icon={<ReloadOutlined/>}
              />
          </Space>
          <Space rootClassName='mt-4' direction="vertical" className="w-full">
              <Space
                  direction="horizontal"
                  wrap={false}
                  className="w-full"
                  style={{
                      overflowX: screens.xs ? 'auto' : 'unset',
                      whiteSpace: screens.xs ? 'nowrap' : 'normal',
                      paddingBottom: '8px',
                  }}
                  size="middle"
              >
                  <Typography.Text strong>Filters:</Typography.Text>
                  <FilterPopover
                      isActive={!!filter?.affiliateIds?.length}
                      buttonLabel="Affiliate"
                      key="Affiliate"
                      options={enums.affiliates.map((name, i) => ({
                          value: name,
                          label: name,
                          key: i,
                      }))}
                      renederTips={renerFilter.Affiliate}
                      onApply={(option) => {
                          if (option?.value) {
                              setFilters((prev) => {
                                  const Affiliate = new Set<string>(
                                      prev.affiliateIds
                                  ).add(option.value)
                                  return {
                                      ...prev,
                                      affiliateIds: Array.from(Affiliate),
                                  }
                              })
                          }
                      }}
                  />
                  <FilterPopover
                      isActive={!!filter?.country?.length}
                      buttonLabel="Country"
                      SelectProps={{
                          labelRender: ({ value }) => (
                              <Space key={value}>
                                  <ReactCountryFlag
                                      countryCode={value as string}
                                      svg
                                  />
                                  {value}
                              </Space>
                          ),
                      }}
                      key="country"
                      renederTips={renerFilter.country}
                      optionRender={({ value }) => (
                          <Space>
                              <ReactCountryFlag
                                  countryCode={value as string}
                                  svg
                              />
                              {value}
                          </Space>
                      )}
                      options={enums.countries.map((name, i) => ({
                          value: countryNameToCode[name],
                          label: name,
                          key: i,
                      }))}
                      onApply={(option) => {
                          if (option?.value) {
                              setFilters((prev) => {
                                  const country = new Set<string>(
                                      prev.country
                                  ).add(option.value)
                                  return {
                                      ...prev,
                                      country: Array.from(country),
                                  }
                              })
                          }
                      }}
                  />
              </Space>
              <Space
                  direction="horizontal"
                  wrap={false}
                  className="w-full"
                  style={{
                      overflowX: screens.xs ? 'auto' : 'unset',
                      whiteSpace: screens.xs ? 'nowrap' : 'normal',
                      paddingBottom: '8px',
                  }}
                  size="middle"
              >
                  <Typography.Text strong>Group by:</Typography.Text>
                  {ActiveGrouped.filter(Boolean).map((col, i) => (
                      <Flex align='center' key={`select-${col}-${i}`}>
                          <Select
                              key={`select-${col}-${i}`}
                              className="min-w-2 w-full sm:w-auto"
                              style={{ minWidth: '120px' }}
                              allowClear={i > 0}
                              onChange={(val) =>
                                  setGroupes((prev) => [
                                      ...prev.filter((n) => col !== n),
                                      val,
                                  ])
                              }
                              onClear={() =>
                                  setGroupes((prev) =>
                                      prev.filter((name) => name !== col)
                                  )
                              }
                              value={col}
                              options={groupedCols.map(
                                  ({ label, value }, index) => ({
                                      key: `option-${index}`,
                                      label,
                                      value,
                                      disabled: ActiveGrouped.includes(value),
                                  })
                              )}
                          />
                          <Button
                              type="text"
                              size='small'
                              className='ml-1'
                              onClick={() => {
                                setGroupes((prev) =>
                                  prev.filter((name) => name !== col)
                              )
                              }}
                              icon={<CloseOutlined size={4}  style={{ color: 'red' }} />}
                          />
                      </Flex>
                  ))}
                  <Button
                      onClick={() => {
                          const unused = groupedCols.filter(
                              ({ value }) => !ActiveGrouped.includes(value)
                          )
                          const el = unused[0]
                          if (!el) return
                          setGroupes((prev) => [...prev, el.value])
                      }}
                      icon={<PlusCircleOutlined />}
                      className="w-full sm:w-auto"
                  />
              </Space>
              <Space wrap className="w-full">
            {filter?.country?.map((name, i) => (
              <Tag
                onClose={() => onRemoveFilter('country', name)}
                key={i + 'c'}
                closable
              >
                <ReactCountryFlag countryCode={name} svg />
              </Tag>
            ))}
            {filter?.affiliateIds?.map((name, i) => (
              <Tag
                onClose={() => onRemoveFilter('affiliateIds', name)}
                key={i + 'a'}
                closable
              >
                {name}
              </Tag>
            ))}
          </Space>
              <ProTable<GroupedData>
                  actionRef={actionRef}
                  locale={en_GB.Table}
                  rowKey={'id'}
                  columns={columns}
                  request={async ({ current, pageSize }, sort) => {
                      const data = await getListReport({
                          input: {
                              filter,
                              groupBy: ActiveGrouped,
                              offset:
                                  (current &&
                                      pageSize &&
                                      (current - 1) * pageSize) ||
                                  0,
                              limit: pageSize || 50,
                              sortBy: Object.keys(sort)[0] || 'Date',
                              sortOrder: Object.values(sort)[0],
                          },
                      })

                      return {
                          data: data.items || [],
                          success: true,
                          total: data.total,
                      }
                  }}
                  pagination={{
                      defaultPageSize: 50,
                      defaultCurrent: 1,
                  }}
                  search={false}
                  ghost
                  toolbar={{
                      settings: [],
                  }}
                  tableLayout="auto"
                  scroll={{ x: screens.xs ? 800 : undefined }}
              />
          </Space>
      </Content>
  )
};

export default Dashboard;