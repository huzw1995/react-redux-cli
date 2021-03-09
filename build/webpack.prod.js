const baseConfig = require("./webpack.base.js");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "production", // 生产模式
  devtool: "cheap-module-source-map",
  output: {
    publicPath: "./",
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 指定生成的文件所依赖哪一个html文件模板，模板类型可以是html、jade、ejs等
      template: "./src/index.html",
      favicon: "./src/favicon.ico",
      // 清除 html 一些没用的代码
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    // 每次打包输出文件清空上次打包文件的插件
    new CleanWebpackPlugin(),
    // 压缩单独的css文件
    new OptimizeCssAssetsWebpackPlugin({
      cssProcessPluginOptions: {
        preset: [
          "default",
          {
            // 对注释的处理
            discardComments: { removeAll: true },
          },
        ],
      },
    }),
    // 使用交互式可缩放树映射可视化Webpack输出文件的大小
    new BundleAnalyzerPlugin(),
  ],
  // code splitting 代码分割
  optimization: {
    //设置为 true, 一个 chunk 打包后就是一个文件，一个chunk对应`一些js css 图片`等
    runtimeChunk: true,
    minimize: true,
    minimizer: [
      //压缩js文件
      new TerserPlugin({
        terserOptions: {
          cache: true,
          parallel: true,
          compress: {
            drop_console: true,
            drop_debugger: true,
            dead_code: true,
            pure_funcs: ["console.log"],
          },
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
      }),
    ],
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~", //名称分隔符，默认是~
      name: true, //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔
      cacheGroups: {
        vendor: {
          name: "vendor",
          chunks: "initial",
          priority: 10,
          minChunks: 2, //最少被几个chunk引用
          reuseExistingChunk: true, //  如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
          test: /node_modules\/(.*)\.js/,
        },
        styles: {
          name: "index",
          test: /\.(less|css)$/,
          chunks: "all",
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
});
