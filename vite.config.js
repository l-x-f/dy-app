import { resolve } from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

const pathResolve = dir => resolve(__dirname, '.', dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: pathResolve('src') + '/'
      },
      {
        find: 'variables',
        replacement: pathResolve('src') + '/styles/variables.module.scss'
      },
      {
        find: 'mixin',
        replacement: pathResolve('src') + '/styles/mixin.scss'
      }
    ]
  },
  build: {
    assetsInlineLimit: 40 * 1024
  }
})
