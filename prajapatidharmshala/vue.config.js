module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    resolve: {
       symlinks: false
    }
  },
  devServer: {
        proxy: 'http://127.0.0.1:8000/',
  },
  transpileDependencies: [
    '@coreui/utils',
    '@coreui/vue'
  ]
}
