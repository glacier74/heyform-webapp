import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [reactRefresh()],
  define: {
    global: {
      // Disable react-page-scroller polyfill
      // see https://github.com/VikLiegostaiev/react-page-scroller/blob/master/src/index.js#L14
      _babelPolyfill: true
    }
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  }
})
