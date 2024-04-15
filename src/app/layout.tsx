import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";

const RootLayout = ({ children, ...props }: React.PropsWithChildren) => {
  console.log(props);
  return (
    <html lang="en">
      <body className=" w-[100vw]">
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
