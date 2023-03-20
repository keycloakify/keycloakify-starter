import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


const htmlPlugin = ()=>{
    return {
        name:'html-plugin',
        transformIndexHtml(html){
            return html.replace('/assets','${url.resourcesPath}/build/static')
        }
    }
}
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), htmlPlugin()],
    assetsInclude:'**/*.md',
    base:'/',
    define:{
        'process.env': {}
    },
    build:{
        outDir:'build',
        target:'es2021',
        assetsDir: 'static'
    }
})
