import legacy from '@vitejs/plugin-legacy'
import reactRefresh from '@vitejs/plugin-react-refresh'
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
        secure: false,
        changeOrigin: true,
        cookieDomainRewrite: {
          '.heyformapp.com': '127.0.0.1'
        },
        // Remove `Secure` and `SameSite from proxyRes's `set-cookie`
        // https://vitejs.dev/config/#server-proxy
        configure: proxy => {
          // https://github.com/http-party/node-http-proxy/pull/1166#issuecomment-328764776
          proxy.on('proxyRes', function (proxyRes) {
            const removeSecure = str => str.replace(/; Secure|; SameSite=[^;]/gi, '')
            const set = proxyRes.headers['set-cookie']

            if (set) {
              proxyRes.headers['set-cookie'] = Array.isArray(set)
                ? set.map(removeSecure)
                : removeSecure(set)
            }
          })
        }
      }
    }
  }
})
