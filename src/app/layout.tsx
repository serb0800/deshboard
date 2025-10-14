import React from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import './globals.css'
import { auth } from '../../auth'
import { redirect } from 'next/navigation'

const RootLayout = async ({ children, ...props }: React.PropsWithChildren) => {
    return (
        <html lang="en">
            <body className=" w-[100vw]">
                <AntdRegistry>{children}</AntdRegistry>
            </body>
        </html>
    )
}

export default RootLayout
