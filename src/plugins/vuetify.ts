/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify, type ThemeDefinition } from 'vuetify'

const pumpkinTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#f8fafa',
    surface: '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#e7b083',
    'on-surface-variant': '#f4eef8',
    primary: '#e7b083',
    'primary-darken-1': '#cea4eb',
    secondary: '#f1d8c4',
    'secondary-darken-1': '#90ebec',
    error: '#e75c5c',
    info: '#f1d8c4',
    success: '#c1fdb9',
    warning: '#fcd29e',
  },
  variables: {
    'border-color': '#000000',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.60,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#000000',
  }
}

const strawberryTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#118181ff',
    surface: '#7e1717ff',
    'surface-bright': '#7a0808ff',
    'surface-light': '#EEEEEE',
    'surface-variant': '#5c3312ff',
    'on-surface-variant': '#581b81ff',
    primary: '#723a0cff',
    'primary-darken-1': '#400868ff',
    secondary: '#502d10ff',
    'secondary-darken-1': '#177779ff',
    error: '#641414ff',
    info: '#964a0dff',
    success: '#259916ff',
    warning: '#9e5b09ff',
  },
  variables: {
    'border-color': '#751212ff',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.60,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#0b2e52ff',
    'theme-on-kbd': '#8a0f0fff',
    'theme-code': '#7c0404ff',
    'theme-on-code': '#261297ff',
  }
}


// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'pumpkinTheme',
    themes: {
      pumpkinTheme,
      strawberryTheme
    },
  },
})
