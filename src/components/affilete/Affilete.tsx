'use client'
import en_GB from 'antd/locale/en_GB'
import {
    CloseOutlined,
    PlusCircleOutlined,
    ReloadOutlined,
} from '@ant-design/icons'
import {
    Button,
    Space,
    Typography,
    DatePicker,
    Tag,
    Select,
    Grid,
    Flex,
} from 'antd'
import { Content } from 'antd/es/layout/layout'
import dayjs, { Dayjs } from 'dayjs'
import React, {
    FC,
    Ref,
    useEffect,
    useRef,
    useState,
    useMemo,
    useCallback,
} from 'react'
import ReactCountryFlag from 'react-country-flag'
import FilterPopover from '../FilterPopover'
import Title from 'antd/es/typography/Title'
import { getListReport, groupByKey, GroupedData } from '@/actions/request'
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components'
import axios from 'axios'
import { ContryCodeToName, countryNameToCode } from '@/app/lib/contryNameToCode'
import { IFilter } from '@/types'

interface Props {}

interface IGroupByOption {
    label: string
    value: groupByKey
}

const groupedCols: IGroupByOption[] = [
    { label: 'Day', value: 'day' },
    { label: 'Campaign', value: 'affiliateId' },
    { label: 'Advertiser', value: 'advertiserId' },
    { label: 'Country', value: 'country' },
]

interface IEnums {
    countries: string[]
    affiliates: string[]
    advertisers: string[]
}

const Affilete: FC<Props> = () => {
    const actionRef: Ref<ActionType | undefined> = useRef()

    const screens = Grid.useBreakpoint()

    return (
        <Content className="p-4 sm:p-6 overflow-hidden">
            <Title level={screens.xs ? 3 : 1}>Campaigns</Title>
            <ProTable<GroupedData>
                locale={en_GB.Table}
                rowKey={'id'}
                columns={[
                    {
                        key: 'id',
                        dataIndex: 'id',
                        title: 'ID',
                    },
                    {
                        title: 'Name',
                        key: 'name',
                        dataIndex: 'name',
                        render: (val) => <Button type="link">{val}</Button>,
                    },
                ]}
                request={async ({ current, pageSize }, sort) => {
                    const data = await axios.get('/api/enums')
                    const d = data.data.affiliates
                    return {
                        data:
                            d.map((name: string, id: number) => ({
                                id,
                                name,
                            })) || [],
                        success: true,
                        total: d.total,
                    }
                }}
                search={false}
                ghost
                toolbar={{}}
                tableLayout="auto"
                scroll={{ x: screens.xs ? 800 : undefined, y: '80%' }}
            />
        </Content>
    )
}

export default Affilete
