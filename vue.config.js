module.exports = {
    publicPath: './',

    devServer: {
        // axios 跨域代理
        proxy: {
            '/api': {
                target: 'http://192.168.10.129:5000',
                changeOrigin: true
            }
        }
    }
}