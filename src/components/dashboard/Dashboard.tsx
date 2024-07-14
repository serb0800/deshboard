"use client";

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
import React, { FC, useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import FilterPopover from "../FilterPopover";
import { useCallback } from "react";
import { useMemo } from "react";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";

interface Props {
  data: IData[];
  AffiliateList: string[];
  CountryList: string[];
}

const defaultDate = {
  start: dayjs().subtract(3, "M"),
  end: dayjs(),
};

type GroupCol =
  | keyof Pick<IData, "Affiliate" | "Country" | "Date_UTC">
  | "Date";
const groupedCols: GroupCol[] = ["Date", "Affiliate", "Country"];

const Dashboard: FC<Props> = ({ data, CountryList, AffiliateList }) => {
  const [ActiveGrouped, setGroupes] = useState<GroupCol[]>([
    // "Date",
    "Affiliate",
    "Country",
  ]);
  const [range, setRange] = useState<{
    start: Dayjs | undefined | null;
    end: Dayjs | undefined | null;
  }>(() => {
    return {
      start: defaultDate.start,
      end: defaultDate.end,
    };
  });
  const [filters, setFilters] = useState<IFilter>({
    Affiliate: [],
    country: [],
  });
  const renerFilter = {
    Affiliate: useCallback(
      () =>
        filters.Affiliate.map((name) => {
          return (
            <Tag
              closable
              onClose={() =>
                setFilters((prev) => ({
                  ...prev,
                  Affiliate: prev.Affiliate.filter((c) => c !== name),
                }))
              }
            >
              {name}
            </Tag>
          );
        }),
      [filters.Affiliate],
    ),
    country: useCallback(
      () =>
        filters.country.map((iso2) => {
          return (
            <Tag
              closable
              onClose={() =>
                setFilters((prev) => ({
                  ...prev,
                  country: prev.country.filter((c) => c !== iso2),
                }))
              }
            >
              {<ReactCountryFlag svg countryCode={iso2} />}
            </Tag>
          );
        }),
      [filters.country],
    ),
  };

  const filtredData = useMemo(() => {
    console.log({ filters });
    const isActiveFilter = Boolean(
      filters.Affiliate.length + filters.country.length > 0,
    );
    if (!isActiveFilter) return data;
    return data.filter(({ Affiliate, country }) => {
      return (
        filters.Affiliate.includes(Affiliate) ||
        filters.country.includes(country.iso2)
      );
    });
  }, [data, filters.Affiliate, filters.country, range.end, range.start]);

  const onRemoveFilter = useCallback(
    (object: keyof IFilter, removeVal: string) => {
      setFilters((prev) => ({
        ...prev,
        [object]: prev[object].filter((val) => val !== removeVal),
      }));
    },
    [],
  );
  const columns: TableProps<IData>["columns"] = useMemo(() => {
    return [
      {
        title: "Date",
        dataIndex: "Date_UTC",
        key: "Date_UTC",
        render: (text) => (
          <p>{new Date(text as string).toLocaleDateString()}</p>
        ),
        sorter: (a, b) => {
          return Date.parse(a.Date_UTC) - Date.parse(b.Date_UTC);
        },
      },
      {
        title: "Country",
        dataIndex: "Country",
        key: "Country",
        render: (_, { country }) =>
          country?.iso2 && (
            <Typography.Text>
              <ReactCountryFlag countryCode={country.iso2} svg /> {country.iso2}
            </Typography.Text>
          ),
        sorter: (a, b) => a.Country.localeCompare(b.Country),
      },
      {
        title: "Affiliate",
        dataIndex: "Affiliate",
        key: "Affiliate",
        sorter: (a, b) => a.Affiliate.localeCompare(b.Affiliate),
      },
      {
        title: "Deposits",
        dataIndex: "Deposits",
        key: "Deposits",
        sorter: (a, b) => {
          if (
            typeof a.Deposits === "string" &&
            typeof b.Deposits === "string"
          ) {
            return parseInt(a.Deposits) - parseInt(b.Deposits);
          }
          return a.Deposits - b.Deposits;
        },
      },
      {
        title: "Leads",
        dataIndex: "Leads",
        key: "Leads",
        sorter: (a, b) => {
          if (typeof a.Leads === "string" && typeof b.Leads === "string") {
            return parseInt(a.Leads) - parseInt(b.Leads);
          }
          return a.Leads - b.Leads;
        },
      },
      {
        title: "Conversion Rate",
        dataIndex: "Conversion_Rate",
        key: "Conversion_Rate",
        render: (val) => `${val}%`,
        sorter: (a, b) => {
          return a.Conversion_Rate - b.Conversion_Rate;
        },
      },
    ];
  }, []);

  useEffect(() => {
    console.log(data);
  }, []);
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
                    Affiliate: [],
                    country: [],
                  });
                }}
                icon={<ReloadOutlined />}
              />
              <DatePicker.RangePicker
                minDate={dayjs().subtract(1, "year")}
                maxDate={defaultDate.end}
                format={{
                  type: "mask",
                  format: "DD-MM-YYYY",
                }}
                value={[range.start, range.end]}
                onChange={(dates, dateStrings) => {
                  setRange({
                    start: dates ? dates[0] : undefined,
                    end: dates ? dates[1] : undefined,
                  });
                  console.log({ dates, dateStrings, d: dayjs().millisecond });
                }}
              />
            </Space>
            <Space>
              <Text>Filters</Text>
              <FilterPopover
                isActive={!!filters.Affiliate.length}
                buttonLabel="Affiliate"
                key="Affiliate"
                options={AffiliateList.map((name, i) => ({
                  value: name,
                  label: name,
                  key: i,
                }))}
                renederTips={renerFilter.Affiliate}
                onApply={(option) => {
                  console.log(option);
                  if (option?.value) {
                    setFilters((prev) => {
                      const Affiliate = new Set<string>(prev.Affiliate).add(
                        option.value,
                      );
                      return {
                        ...prev,
                        Affiliate: Array.from(Affiliate),
                      };
                    });
                  }
                }}
              />
              <FilterPopover
                isActive={!!filters.country.length}
                buttonLabel="Country"
                SelectProps={{
                  labelRender: ({ value }) => (
                    <Space>
                      <ReactCountryFlag countryCode={value as string} svg />
                      {value}
                    </Space>
                  ),
                }}
                key="country"
                renederTips={renerFilter.country}
                optionRender={({ value }) => {
                  return (
                    <Space>
                      <ReactCountryFlag countryCode={value as string} svg />
                      {value}
                    </Space>
                  );
                }}
                options={CountryList.map((iso2, i) => {
                  return {
                    value: iso2,
                    label: iso2,
                    key: i,
                  };
                })}
                onApply={(option) => {
                  console.log(option);
                  if (option?.value) {
                    setFilters((prev) => {
                      const country = new Set<string>(prev.country).add(
                        option.value,
                      );
                      return {
                        ...prev,
                        country: Array.from(country),
                      };
                    });
                  }
                }}
              />
            </Space>
          </Space>
          <Space direction="horizontal">
  {ActiveGrouped.map((col, i) => (
    <Select
      key={`select-${i}`}
      className="min-w-2"
      style={{ minWidth: '120px' }} // Пример установки минимальной ширины
      allowClear={i > 0}
      onChange={(val) => {
        setGroupes((prev) => [...prev.filter((n) => col !== n), val]);
      }}
      onClear={() => {
        setGroupes((prev) => prev.filter((name) => name !== col));
      }}
      options={groupedCols
        .filter((n) => !ActiveGrouped.includes(n))
        .map((name, index) => ({
          key: `option-${index}`,
          label: name,
          value: name,
          disabled: ActiveGrouped.includes(name),
        }))
      }
    />
  ))}
  <Button
    onClick={() => {
      const unused = groupedCols.filter((name) => !ActiveGrouped.includes(name));
      const el = unused[0];
      if (!el) return;
      setGroupes((prev) => [...prev, el]);
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
            {filters.country.map((iso2, i) => (
              <Tag
                onClose={() => onRemoveFilter("country", iso2)}
                key={i + "c"}
                closable
              >
                <ReactCountryFlag countryCode={iso2} svg />
              </Tag>
            ))}
            {filters.Affiliate.map((name, i) => (
              <Tag
                onClose={() => onRemoveFilter("Affiliate", name)}
                key={i + "a"}
                closable
              >
                {name}
              </Tag>
            ))}
          </Space>
        </Space>
        <Table
          // className="max-h-[200px]"
          dataSource={filtredData.filter(({ date_ms }) => {
            let res = true;

            if (range.start) {
              res = range.start.valueOf() <= date_ms;
            }
            if (range.end) {
              res = range.end.valueOf() >= date_ms;
            }
            return res;
          })}
          columns={columns}
        />
      </Space>
    </Content>
  );
};

export default Dashboard;
