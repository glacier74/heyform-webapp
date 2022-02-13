import reactRefresh from '@vitejs/plugin-react-refresh'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
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
