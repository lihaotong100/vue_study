module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:8099',
                changeOrigine: false,
                logLevel: 'debug',
                pathRewrite: { '^/api': '/' }
            }
        }
    }
}