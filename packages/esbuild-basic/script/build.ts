/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-03-09 13:14:04
 * @LastEditTime: 2023-03-22 13:17:52
 * @LastEditors: wsy
 */
import path from 'node:path'
import { type Plugin, build } from 'esbuild'

const root = path.join(__dirname, '../')

const envPlugin: Plugin = {
  name: 'env',
  setup(build) {
    build.onResolve({ filter: /^vue$/ }, (args) => {
      return {
        path: args.path,
        namespace: 'env-ns',
      }
    })

    build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => {
      return {
        contents: JSON.stringify({ PATH: 1 }),
        loader: 'json',
      }
    })
  },
}

async function runBuild() {
  const result = await build({
    // ----  如下是一些常见的配置  ---

    // 项目根目录
    absWorkingDir: root,
    // 入口文件列表，为一个数组
    entryPoints: [path.join(root, './src/index.ts')],
    entryNames: '[dir]/src/[name]-[hash]',
    target: ['es2015'],
    // 打包产物目录
    outdir: 'dist',
    // 是否需要打包，一般设为 true
    bundle: true,
    // 模块格式，包括`esm`、`commonjs`和`iife`
    format: 'esm',
    // 需要排除打包的依赖列表
    external: [],
    // 是否开启自动拆包
    splitting: true,
    // 是否生成 SourceMap 文件
    sourcemap: false,
    // 是否生成打包的元信息文件
    metafile: true,
    // 是否进行代码压缩
    minify: false,
    // sourceMap: false,
    // 是否开启 watch 模式，在 watch 模式下代码变动则会触发重新打包
    // watch: false,
    // 是否将产物写入磁盘
    write: true,
    // Esbuild 内置了一系列的 loader，包括 base64、binary、css、dataurl、file、js(x)、ts(x)、text、json
    // 针对一些特殊的文件，调用不同的 loader 进行加载
    loader: {
      '.png': 'base64',
    },
    banner: {
      js: '// 这是一个测试banner',
    },
    plugins: [envPlugin],
  })
  // eslint-disable-next-line no-console
  console.log(result)
}

runBuild()
