const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle[contenthash:8].js'
  },
  optimization: {

    // Hash 相关
    // hash：所有的 chunk 文件使用相同的 hash ，项目中任一文件变化都会影响所有的 chunk 文件的 hash 值
    // chunkhash：针对与输出文件，任意文件改变只会影响其依赖的chunk ，不会影响其它chunk
    // contenthash：基于单个文件内容产生的 hash (webpack 4.0 之前只针对于文本结构)

    // Tree Shaking （删除无用代码）
    usedExports: true, // 标记出未被导出的变量
		minimize: true, // 去除无用变量并压缩代码
    // 合并模块
    concatenateModules: true, // 生产模式(production)下默认启用
		// 副作用
    sideEffects: true, // 开启副作用功能(编译时跳过被导出但未被使用、标记为不包含副作用的模块)
    
    chunkIds: "deterministic", // 告知 webpack 当选择模块 id 时需要使用哪种算法
		moduleIds: "deterministic", // 告知 webpack 当选择模块 id 时需要使用哪种算法
		mangleExports: "deterministic", // 允许控制导出处理(export mangling)

    // 增量构建
    cache: {
      type: 'filesystem', // 将缓存类型设置为文件系统，`webpack 4.0` 为 `memory` （开发模式）
      cacheDirectory: path.resolve(__dirname,'node_modules/.cac/webpack'), // 自定义缓存位置
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack5'
    })
  ]
}