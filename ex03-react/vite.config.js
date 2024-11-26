/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_APP_AUTH0_DOMAIN': JSON.stringify(process.env.VITE_APP_AUTH0_DOMAIN),
    'process.env.VITE_APP_AUTH0_CLIENT_ID': JSON.stringify(process.env.VITE_APP_AUTH0_CLIENT_ID),
    'process.env.VITE_APP_AUTH0_AUDIENCE': JSON.stringify(process.env.VITE_APP_AUTH0_AUDIENCE),
    'process.env.VITE_APP_REDIRECT_URI': JSON.stringify(process.env.VITE_APP_REDIRECT_URI),
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
  },
})
