const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  /* publicPath: '/wljxc_web/public/static',
  configureWebpack: {
    output: {
      chunkFilename: 'js/[name]_[contenthash:6].js'
    },
    optimization: {
      splitChunks: {
        chunks: 'initial',
        maxAsyncRequests: 10,
        maxInitialRequests: 10,
        automaticNameDelimiter: '_',
        cacheGroups: {
          vue: {
            name: 'vue',
            test: /[\\/]node_modules[\\/](vue|vuex|vue-router)/,
            priority: -1
            // automaticNamePrefix: '_'
          },
          // vuex: {
          //   name: 'vuex',
          //   test: /[\\/]node_modules[\\/]vuex/,
          //   priority: -3
          // },
          // 'vue-router': {
          //   name: 'vue-router',
          //   test: /[\\/]node_modules[\\/]vue-router/,
          //   priority: -2,
          //   minChunks: 1
          // },
          'element-ui': {
            name: 'element-ui',
            test: /[\\/]node_modules[\\/]element-ui/,
            priority: -2,
            minChunks: 1
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -3,
            minChunks: 1
          }
        }
      },
      minimizer: [
        // config.optimization.minimizer('terser')
        new TerserPlugin(
          {
            terserOptions: {
              compress: {
                arrows: false,
                collapse_vars: false,
                comparisons: false,
                computed_props: false,
                hoist_funs: false,
                hoist_props: false,
                hoist_vars: false,
                inline: false,
                loops: false,
                negate_iife: false,
                properties: false,
                reduce_funcs: false,
                reduce_vars: false,
                switches: false,
                toplevel: false,
                typeofs: false,
                booleans: true,
                if_return: true,
                sequences: true,
                unused: true,
                conditionals: true,
                dead_code: true,
                evaluate: true
              },
              mangle: {
                safari10: true
              }
            },
            sourceMap: false,
            cache: true,
            parallel: true,
            extractComments: false
          }
        )
      ],
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`
      }
    }
  } */
}
