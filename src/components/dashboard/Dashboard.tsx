'use client'

import { IData } from '@/types'
import { ReloadOutlined } from '@ant-design/icons'
import { Button, Space, Table, TableProps, Typography, DatePicker } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import React, { FC, useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
const lookup = require('country-code-lookup')


interface Props {
    data: IData[]
}

// Affiliate: 'Affiliate',
//         Country: 'Country',
//         Date_UTC: 'Date',
//         Deposits: 'Deposits',
//         Leads: 'Leads',
//         Conversion_Rate: 'Conversion Rate'


const Dashboard:FC<Props> = ({ data }) => {

    const [] = useState()
    
    const columns: TableProps<IData>['columns'] = [
        {
            title: 'Country',
            dataIndex: 'Country',
            key: 'Country',
            render: (text) => <Typography.Text><ReactCountryFlag countryCode={lookup.byCountry(text).iso2} svg /> {lookup.byCountry(text).iso2}</Typography.Text>,
            sorter: (a,b) => a.Country.localeCompare(b.Country)
        },
        {
            title: 'Affiliate',
            dataIndex: 'Affiliate',
            key: 'Affiliate',
            sorter: (a,b) => a.Affiliate.localeCompare(b.Affiliate)
        },
        {
            title: 'Deposits',
            dataIndex: 'Deposits',
            key: 'Deposits',
            sorter: (a,b) => {
               if ( typeof a.Deposits === 'string' && typeof b.Deposits === 'string') {
                return  parseInt(a.Deposits) - parseInt(b.Deposits)
               }
               return a.Deposits - b.Deposits
            }
        },
        {
            title: 'Date_UTC',
            dataIndex: 'Date_UTC',
            key: 'Date_UTC',
            render: (text) => <p>{new Date(text as string).toLocaleDateString()}</p>,
            sorter: (a,b) => {
                return Date.parse(a.Date_UTC) - Date.parse(b.Date_UTC)
             }
        },
        {
            title: 'Leads',
            dataIndex: 'Leads',
            key: 'Leads',
            sorter: (a,b) => {
                if ( typeof a.Leads === 'string' && typeof b.Leads === 'string') {
                 return  parseInt(a.Leads) - parseInt(b.Leads)
                }
                return a.Leads - b.Leads
             }
        },
        {
            title: 'Conversion_Rate',
            dataIndex: 'Conversion_Rate',
            key: 'Conversion_Rate',
            render: (val,) => `${val}%`,
            sorter: (a,b) => {
                return a.Conversion_Rate - b.Conversion_Rate
             }
        },
        
    ]
    useEffect(() => {
           console.log(data)
    }, [])
    return (
        <Space className='p-6' direction='vertical'>
            <Space>
                <Space>
                    <Button icon={<ReloadOutlined />}/>
                    <DatePicker.RangePicker
                        minDate={dayjs().subtract(3, 'y')}
                        maxDate={dayjs().add(1,'d')}
                        onChange={(dates, dateStrings) => {
                            console.log({dates, dateStrings})
                        }}
                     />
                </Space>
            </Space>
            <Table
                dataSource={data.map((d) => ({
                    ...d,
                    Conversion_Rate: Math.round(((d.Deposits * 100) / d.Leads)*100)/100
                }))}
                columns={columns}
                
            />
        </Space>
    )
}

export default Dashboard