import { extendTheme } from '@chakra-ui/react';
const theme = extendTheme({
  styles: {
    global: {
      body: {
        overflowX: 'hidden',
      },
    },
  },
  fonts: {
    body: 'Rubik',
  },
  colors: {
    brand: {
      light: '#9fb4e2',
      medium: '#2d47a5',
      dark: '#1c2c66',
    },
    mainColor: {
      500: '#2d47a5',
    },
  },
  components: {
    Input: {
      baseStyle: {
        field: {
          border: '1px solid',
          fontFamily: 'Rubik',
          borderRadius: '8px',
        },
      },
      sizes: {
        md: {
          field: {
            borderRadius: '8px',
            borderColor: 'gray.200',
          },
        },
      },
      variant: {},
      defaultProps: {
        size: 'md',
      },
    },
  },
});
export default theme;
