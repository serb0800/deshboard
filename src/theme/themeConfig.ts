// theme/themeConfig.ts
import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: '#05F4D4',
  },
  components: {
    Menu: {
      itemSelectedColor: '#05F4D4'
    }
  }
};

export default theme;