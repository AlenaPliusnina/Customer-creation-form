const path = require('path');

module.exports = {
    publicPath: '/Customer-creation-form/',
    configureWebpack: {
		resolve: {
			alias: {
				"@components": path.resolve(__dirname, 'src', 'components'),
			}
		}
	},
    css: {
        loaderOptions: {
            sass: {
                additionalData: '@import "./src/assets/styles"'
            }
        }
    }
}
