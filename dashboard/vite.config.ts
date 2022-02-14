import reactRefresh from '@vitejs/plugin-react-refresh'
import legacy from '@vitejs/plugin-legacy'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['ie >= 11']
    }),
    reactRefresh()
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  },
  build: {
    target: 'es2015',
    assetsDir: 'static'
  },
  server: {
    proxy: {
      '/graphql': {
        target: 'https://dev.heyformapp.com',
        changeOrigin: true,
        cookieDomainRewrite: {
          '.heyformapp.com': '127.0.0.1'
        }
      }
    }
  }
})
