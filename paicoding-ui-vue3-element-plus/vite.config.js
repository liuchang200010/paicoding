import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  // eslint-disable-next-line no-undef
  const viteEnv = loadEnv(configEnv.mode, process.cwd())
  return {
    plugins: [
      vue(),
      vueJsx(),
      UnoCSS(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: Number(viteEnv.VITE_APP_PORT),
      open: true,
      proxy: {
        [viteEnv.VITE_APP_TARGET_BASE_API]: {
          changeOrigin: true,
          target: viteEnv.VITE_APP_TARGET_URL,
          rewrite: (path) =>
            path.replace(
              new RegExp('^' + viteEnv.VITE_APP_BASE_API),
              viteEnv.VITE_APP_TARGET_BASE_API
            )
        }
      }
    }
  }
})
