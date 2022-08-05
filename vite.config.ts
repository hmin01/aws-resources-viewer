import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import vitePluginImp from 'vite-plugin-imp';

export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [
    reactRefresh(),
    vitePluginImp({
      optimize: true,
      libList: [{
        libName: 'antd',
        libDirectory: 'es',
        style: (name) => `antd/es/${name}/style`
      }]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  server: { 
    host: '0.0.0.0'
  } 
});