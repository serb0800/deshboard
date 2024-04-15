"use client";
import { IFilter, IFilterParam } from "@/types";
import { Button, Popover, Select, Space } from "antd";
import { BaseOptionType, SelectProps } from "antd/es/select";
import React, { FC, useMemo, useState } from "react";
import { useEffect } from "react";
import { ReactNode } from "react";
import { useCallback } from "react";

interface Props<TOption extends BaseOptionType> {
  isActive: boolean;
  buttonLabel: string;
  options: TOption[];
  optionRender?: SelectProps["optionRender"];
  renederTips?: () => ReactNode;
  onApply: (param?: TOption) => void;
  SelectProps?: SelectProps<any, TOption>;
}

const FilterPopover = <TOption extends BaseOptionType>({
  isActive,
  buttonLabel,
  options,
  onApply,
  renederTips = () => null,
  optionRender,
  SelectProps = {},
}: Props<TOption>) => {
  const [open, setOpen] = useState(false);
  const [currentOption, setCurrent] = useState<TOption | undefined>();

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const onApplyHandler = useCallback(() => {
    onApply(currentOption);
  }, [currentOption]);
  useEffect(() => {
    console.log({ currentOption });
  }, [currentOption]);

  return (
    <Popover
      arrow={false}
      content={
        <Space className=" p-2" direction="vertical">
          <Space direction="horizontal" className="max-w-[200px]">
            {renederTips()}
          </Space>
          <Space direction="horizontal">
            <Select<any, TOption>
              className="m-w-[300px]"
              showSearch
              placeholder="Select a value"
              optionFilterProp="children"
              defaultValue={null}
              options={options}
              optionRender={optionRender}
              onChange={(val, option) => {
                console.log({ option });
                setCurrent(option as TOption);
              }}
              {...SelectProps}
              // filterOption={filterOption}
            />
            <Button onClick={onApplyHandler} type="primary">
              Apply
            </Button>
          </Space>
        </Space>
      }
      open={open}
      onOpenChange={handleOpenChange}
      trigger="click"
    >
      <Button type={isActive ? "primary" : "default"}>{buttonLabel}</Button>
    </Popover>
  );
};

export default FilterPopover;
