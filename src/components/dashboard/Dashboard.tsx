"use client";
import en_GB from 'antd/locale/en_GB';
import { IData, IFilter, IFilterParam } from "@/types";
import { PlusCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import {
  Button,
  Space,
  Table,
  TableProps,
  Typography,
  DatePicker,
  Tag,
  Flex,
  Select,
} from "antd";
import { Content } from "antd/es/layout/layout";
import dayjs, { Dayjs } from "dayjs";
import React, { FC, Ref, useEffect, useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import FilterPopover from "../FilterPopover";
import { useCallback } from "react";
import { useMemo } from "react";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import { getListReport, groupByKey, GroupedData } from "@/actions/request";
import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { SortOrder } from 'antd/es/table/interface';
import { countryNameToCode } from '@/app/lib/contryNameToCode';
import axios from 'axios';

interface Props {
 
}

const defaultDate = {
  start: dayjs().subtract(3, "M"),
  end: dayjs(),
};

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
  const actionRef:Ref<ActionType | undefined> = useRef()
  const [ActiveGrouped, setGroupes] = useState<groupByKey[]>([
    "day",
    // "Affiliate",
    // "Country",
  ]);
  const [enums, setEnums] = useState<IEnums>({
    advertisers: [],
    affiliates: [],
    countries: []
  })

  useEffect(() => {
    (async () => {
      const data = await axios('api/enums')
      setEnums(data.data)
    })()
  },[])
  
  const [range, setRange] = useState<{
    start: Dayjs | undefined | null;
    end: Dayjs | undefined | null;
  }>(() => {
    return {
      start: defaultDate.start,
      end: defaultDate.end,
    };
  });
  const [filter, setFilters] = useState<IFilter>({
   advertiserIds: [],
   affiliateIds: [],
   country: [],
   isTest: false,
   timeframe: [dayjs().subtract(1, 'month').toISOString(),dayjs().toISOString()]
  });
  const renerFilter = {
    Affiliate: useCallback(
      () =>
        filter.affiliateIds?.map((name) => {
          return (
            <Tag
              closable
              onClose={() =>
                setFilters((prev) => ({
                  ...prev,
                  Affiliate: prev.affiliateIds?.filter((c) => c !== name),
                }))
              }
            >
              {name}
            </Tag>
          );
        }),
      [filter.affiliateIds],
    ),
    country: useCallback(
      () =>
        filter.country?.map((name) => {
          return (
            <Tag
              closable
              onClose={() =>
                setFilters((prev) => ({
                  ...prev,
                  country: prev?.country?.filter((c) => c !== countryNameToCode[name]),
                }))
              }
            >
              {<ReactCountryFlag svg countryCode={countryNameToCode[name]} />}
            </Tag>
          );
        }),
      [filter.country],
    ),
  };

  const [isLoading, setIsLoading] = useState<boolean>(false)

 useEffect(() => {
  (async () => {
    setIsLoading(true)
    
    setIsLoading(false)
  })
 }, [])

  const onRemoveFilter = useCallback(
    (object: keyof IFilter, removeVal: string) => {
      setFilters((prev) => ({
        ...prev,
        [object]: prev[object]?.filter((val) => val !== removeVal),
      }));
    },
    [],
  );
  const columns: ProColumns<GroupedData>[] = useMemo(() => {
    return [
      {
        title: "Date",
        dataIndex: "Date",
        key: "Date",
        hideInTable: !ActiveGrouped.includes('day'),
        order: ActiveGrouped.indexOf('day'),
        render: (text) => (
          <p>{new Date(text as string).toLocaleDateString()}</p>
        ),
        sorter: (a, b) => {
          return Date.parse(a.Date) - Date.parse(b.Date);
        },
      },
      {
        title: "Country",
        dataIndex: "Country",
        key: "Country",
        order: ActiveGrouped.indexOf('country'),
        hideInTable: !ActiveGrouped.includes('country'),
        render: (_, { Country, ConversionRate }) =>
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
    ];
  }, [ActiveGrouped]);

  useEffect(() => {
    actionRef.current?.reload()
  },[ActiveGrouped, Object.values(filter)])
  return (
      <Content className="p-6 overflow-hidden">
          <Space>
              <Title>Report Admin</Title>
          </Space>
          <Space className=" w-full " direction="vertical">
              <Space direction="vertical">
                  <Space direction="vertical">
                      <Space>
                          <Button
                              onClick={() => {
                                  setFilters({
                                      affiliateIds: [],
                                      country: [],
                                      advertiserIds: [],
                                      isTest: false,
                                  })
                              }}
                              icon={<ReloadOutlined />}
                          />
                          <DatePicker.RangePicker
                              minDate={dayjs().subtract(1, 'year')}
                              maxDate={defaultDate.end}
                              format={{
                                  type: 'mask',
                                  format: 'DD-MM-YYYY',
                              }}
                              value={[range.start, range.end]}
                              onChange={(dates, dateStrings) => {
                                  setRange({
                                      start: dates ? dates[0] : undefined,
                                      end: dates ? dates[1] : undefined,
                                  })
                                  console.log({
                                      dates,
                                      dateStrings,
                                      d: dayjs().millisecond,
                                  })
                              }}
                          />
                      </Space>
                      <Space>
                          <Text>Filters</Text>
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
                                  console.log(option)
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
                                      <Space>
                                          <ReactCountryFlag
                                              countryCode={countryNameToCode[value] as string}
                                              svg
                                          />
                                          {value}
                                      </Space>
                                  ),
                              }}
                              key="country"
                              renederTips={renerFilter.country}
                              optionRender={({ value }) => {
                                console.log(value)
                                  return (
                                      <Space>
                                          <ReactCountryFlag
                                              countryCode={value as string}
                                              svg
                                          />
                                          {value}
                                      </Space>
                                  )
                              }}
                              options={enums.countries.map((name, i) => {
                                  return {
                                      value: countryNameToCode[name],
                                      label: name,
                                      key: i,
                                  }
                              })}
                              onApply={(option) => {
                                  console.log(option)
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
                  </Space>
                  <Space direction="horizontal">
                      {ActiveGrouped.filter(Boolean).map((col, i) => (
                          <Select
                              key={`select-${col}-${i}`}
                              className="min-w-2"
                              style={{ minWidth: '120px' }} // Пример установки минимальной ширины
                              allowClear={i > 0}
                              onChange={(val) => {
                                  setGroupes((prev) => [
                                      ...prev.filter((n) => col !== n),
                                      val,
                                  ])
                              }}
                              onClear={() => {
                                console.log('$$clear')
                                  setGroupes((prev) =>{
                                    console.log( prev.filter((name) => name !== col))
                                    return prev.filter((name) => name !== col)
                                  })
                              }}
                              value={col}
                              options={groupedCols
                                  .map(({label, value}, index) => ({
                                      key: `option-${index}`,
                                      label,
                                      value,
                                      disabled: ActiveGrouped.includes(value),
                                  }))}
                          />
                      ))}
                      <Button
                          onClick={() => {
                              const unused = groupedCols.filter(
                                  ({value}) => !ActiveGrouped.includes(value)
                              )
                              const el = unused[0]
                              if (!el) return
                              setGroupes((prev) => [...prev, el.value])
                          }}
                          icon={<PlusCircleOutlined />}
                      />
                  </Space>
                  {/* <Space direction="horizontal">
            {ActiveGrouped.map((col, i) => (
              <Select
                key={i}
                className="min-w-2"
                allowClear={i > 0}
                onChange={(val) => {
                  setGroupes((prev) => [...prev.filter((n) => col !== n), val]);
                }}
                onClear={() => {
                  setGroupes((prev) => prev.filter((name) => name !== col));
                }}
                options={groupedCols
                  .filter((n) => !ActiveGrouped.includes(n))
                  .map((name, i) => ({
                    key: i,
                    label: name,
                    value: name,
                    disabled: ActiveGrouped.includes(name),
                  }))}
              />
            ))}
            <Button
              onClick={() => {
                const unused = groupedCols.filter((name) => {
                  return !ActiveGrouped.includes(name);
                });
                const el = unused[0];
                if (!el) return;
                setGroupes((prev) => {
                  return [...prev, el];
                });
              }}
              icon={<PlusCircleOutlined />}
            />
          </Space> */}
                  <Space>
                      {filter?.country?.map((name, i) => (
                          <Tag
                              onClose={() => onRemoveFilter('country', name)}
                              key={i + 'c'}
                              closable
                          >
                              <ReactCountryFlag countryCode={countryNameToCode[name]} svg />
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
              </Space>
              <ProTable<GroupedData>
                  // className="max-h-[200px]"
                  actionRef={actionRef}
                  locale={en_GB.Table}
                  rowKey={'id'}
                  columns={columns}
                  request={async ({current, pageSize}, sort) => {
                    const data = await getListReport({ input: {
                      filter,
                      groupBy: ActiveGrouped,
                      offset: current && pageSize  && (current - 1) * pageSize || 0,
                      limit: pageSize || 50,
                      sortBy: Object.keys(sort)[0] || 'Date',
                      sortOrder: Object.values(sort)[0]
                    }});

                    return {
                      data: data.items || [],
                      success: true,
                      total: data.total
                    }
                  }}
                  pagination={{
                    defaultPageSize: 50,
                    defaultCurrent: 1
                  }}
                  search={false}
                  ghost
                  toolbar={{
                    settings: []
                    
                  }}
              />
          </Space>
      </Content>
  )
};

export default Dashboard;
