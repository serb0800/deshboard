'use client'
import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import en_GB from 'antd/locale/en_GB';
import ru_Ru from 'antd/locale/ru_RU';

import theme from '../theme/themeConfig';
import { SessionProvider } from 'next-auth/react';

const App = ({ Component, pageProps: { session, ...pageProps} }: AppProps) => (
  <SessionProvider session={session}>

  <ConfigProvider locale={ru_Ru} theme={theme}>
    <Component {...pageProps} />
  </ConfigProvider>
  </SessionProvider>
);

export default App;