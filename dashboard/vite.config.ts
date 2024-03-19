import htmlInjectionPlugin from "@heyforms/vite-plugin-html-injection";
import legacy from "@vitejs/plugin-legacy";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { resolve } from "path";
import { injectManifest } from "rollup-plugin-workbox";
import { ConfigEnv, loadEnv } from "vite";
import fontOptimizationPlugin from "vite-plugin-font-optimization";
// import uploadPlugin, { UploadZone } from '@heyforms/vite-plugin-upload'
// import externalGlobals from 'rollup-plugin-external-globals'

export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  const base = env.VITE_CDN_PREFIX_URI || '/'

  return {
    base,
    plugins: [
      reactRefresh(),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      htmlInjectionPlugin({
        variables: env
      }),
      fontOptimizationPlugin({
        apply: 'build'
      }),
      // @ts-ignore
      injectManifest({
        swSrc: 'src/sw.js',
        swDest: 'dist/sw.js',
        globDirectory: 'dist',
        globIgnores: ['**/*.map', '**/*.webmanifest', '**/index.html', '**/sw.js'],
        mode: 'production',
        modifyURLPrefix: {
          'static/': base + 'static/'
        }
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
      'import.meta.env.PACKAGE_VERSION': JSON.stringify(process.env.npm_package_version),
      'process.env': {
        // @heyforms/answer-utils
        VALIDATE_CLIENT_SIDE: true
      }
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
      },
      // see https://github.com/vitejs/vite/issues/5759#issuecomment-1034461225
      commonjsOptions: {
        ignoreTryCatch: false
      }
    },
    server: {
      port: 3000,
      proxy: {
        '/graphql': {
          target: env.VITE_PROXY_TARGET,
          secure: false,
          changeOrigin: true,
          cookieDomainRewrite: {
            [env.VITE_COOKIE_DOMAIN_REWRITE]: env.VITE_COOKIE_DOMAIN
          },
          // Remove `Secure` and `SameSite from proxyRes's `set-cookie`
          // https://vitejs.dev/config/#server-proxy
          configure: proxy => {
            proxy.on('proxyReq', function(proxyReq) {
              proxyReq.setHeader('Authorization', 'Basic cm9vdDo2NjY=')
            })

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
  }
}
