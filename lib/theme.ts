import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  colors: {
    brand: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
    },
    accent: {
      50: '#fce4ec',
      100: '#f8bbd0',
      200: '#f48fb1',
      300: '#f06292',
      400: '#ec407a',
      500: '#e91e63',
      600: '#d81b60',
      700: '#c2185b',
      800: '#ad1457',
      900: '#880e4f',
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('white', 'gray.900')(props),
        color: mode('gray.800', 'whiteAlpha.900')(props),
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'md',
      },
      variants: {
        solid: (props: StyleFunctionProps) => ({
          bg: props.colorScheme === 'blue' ? 'brand.500' : `${props.colorScheme}.500`,
          color: 'white',
          _hover: {
            bg: props.colorScheme === 'blue' ? 'brand.600' : `${props.colorScheme}.600`,
            _disabled: {
              bg: props.colorScheme === 'blue' ? 'brand.500' : `${props.colorScheme}.500`,
            },
          },
          _active: {
            bg: props.colorScheme === 'blue' ? 'brand.700' : `${props.colorScheme}.700`,
          },
        }),
        outline: (props: StyleFunctionProps) => ({
          borderColor: props.colorScheme === 'blue' ? 'brand.500' : `${props.colorScheme}.500`,
          color: props.colorScheme === 'blue' ? 'brand.500' : `${props.colorScheme}.500`,
          _hover: {
            bg: mode(`${props.colorScheme}.50`, `${props.colorScheme}.900`)(props),
          },
        }),
      },
    },
    Card: {
      baseStyle: (props: StyleFunctionProps) => ({
        container: {
          bg: mode('white', 'gray.800')(props),
          borderRadius: 'lg',
          boxShadow: mode('sm', 'dark-lg')(props),
          overflow: 'hidden',
        },
      }),
    },
  },
})

export default theme