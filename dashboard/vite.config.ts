import legacy from '@vitejs/plugin-legacy'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { resolve } from 'path'
import { injectManifest } from 'rollup-plugin-workbox'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    reactRefresh(),
    // @ts-ignore
    injectManifest({
      swSrc: 'src/sw.js',
      swDest: 'dist/sw.js',
      globDirectory: 'dist',
      globIgnores: ['**/*.map', '**/*.webmanifest', '**/index.html', '**/sw.js'],
      mode: 'production'
    })
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  },
  define: {
    // https://github.com/smnhgn/vite-plugin-package-version/blob/5baa976dbb22917a2bd00dfa25cf05774c229b1d/src/index.ts#L11
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(process.env.npm_package_version)
  },
  css: {
    preprocessorOptions: {
      scss: {
        // example : additionalData: `@import "./src/design/styles/variables";`
        // dont need include file extend .scss
        additionalData: `@import "./src/styles/base";`
      }
    }
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  },
  build: {
    target: 'es2015',
    assetsDir: 'static',
    minify: 'terser',
    terserOptions: {
      ecma: 5,
      format: {
        comments: false
      }
    }
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
