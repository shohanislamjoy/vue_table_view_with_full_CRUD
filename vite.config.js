import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // Import path module

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        port: 3000,
        
    },
    resolve: { // Fix: Add colon here
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
    },
})