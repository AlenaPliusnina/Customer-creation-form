const path = require('path');

module.exports = {
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
    },
    publicPath: '/Customer-creation-form/'
}
