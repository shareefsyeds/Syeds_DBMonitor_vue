const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

// project deployment
// by default, we assume that your application will be deployed in the domain of the root directory,
// such as: https://www.my-app.com/
// the default: '/'
// if your application is deployed in the subpaths, requires the subpaths specified
// such as: https://www.foobar.com/my-app/
// it needs to be changed to '/ my - app/'
// iview - admin online demo package path: https://file.iviewui.com/admin-dist/
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : '/'

module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  baseUrl: BASE_URL,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // If you don't need to use eslint, lintOnSave set to false
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value The definition，Such as.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  },
  // When set to false packaging is not generated. The map file
  productionSourceMap: false,
  // Here to write your call interface basic path to solve the cross domain, if you set the agent that your local development environment axios baseUrl for "to write, or an empty string
  // devServer: {
  //   proxy: 'localhost:3000'
  // }
  devServer: {
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true
  }

}
