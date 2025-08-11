import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Astune-Vector/Vector-Dev-Tools/VectorConvert/', // IMPORTANT: exact repo + folder path
  plugins: [react()],
})
