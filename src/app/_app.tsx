import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import en_GB from 'antd/locale/en_GB';
import ru_Ru from 'antd/locale/ru_RU';

import theme from '../theme/themeConfig';

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider locale={ru_Ru} theme={theme}>
    <Component {...pageProps} />
  </ConfigProvider>
);

export default App;