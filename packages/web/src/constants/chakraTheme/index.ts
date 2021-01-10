import { css } from '@emotion/react';
import { theme } from '@chakra-ui/react';

import { blue, gray } from 'constants/chakraTheme/colors';

// NOTE: for some reasons, config global styles inside chakraTheme will cause some css work incorrectly
export const globalCss = css`
  *::selection {
    background-color: ${theme.colors.blue[400]};
    color: white;
  }
  html {
    font-size: 14px;
  }
  body {
    height: 100%;
    min-height: 100vh;
    background-color: #e3ebf2;
  }

  .StripeElement {
    padding: ${theme.space[3]};
    border-radius: 5px;
    border: 1px solid ${theme.colors.gray[100]};
    transition: all 0.2s;
  }
  .StripeElement:hover {
    box-shadow: ${theme.shadows.sm};
  }
  .StripeElement--focus {
    box-shadow: ${theme.shadows.md};
    border-color: ${theme.colors.blue[400]};
  }
  .StripeElement--invalid {
    border-color: ${theme.colors.red[400]};
  }
`;

const chakraTheme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    heading:
      'Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,Helvetica Neue, sans-serif',
    body:
      'Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,Helvetica Neue, sans-serif',
  },
  width: {
    wrapper: '1140px',
  },
  fontSizes: {
    ...theme.fontSizes,
    '4xl': '28px',
    xl: '16px',
  },
  colors: {
    ...theme.colors,
    blue: {
      ...theme.colors.blue,
      ...blue,
    },
    gray: {
      ...theme.colors.gray,
      ...gray,
    },
  },
};

export default chakraTheme;
