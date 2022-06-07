import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import tailwindConfig from './tailwind.config.js'

const [schema, host] = process.env.GITPOD_WORKSPACE_URL.split('://')
const publicUrl = `3000-${host}`

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    hmr: {
      clientPort: host ? 443 : 24678,
      host: host
        ? publicUrl
        : "localhost",
    }
  },
  css: {
    postcss: {
      plugins: [tailwind(tailwindConfig), autoprefixer],
    }

  }
})