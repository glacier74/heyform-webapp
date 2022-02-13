const path = require('path')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const WebpackQiniuPlugin = require('@hpnp/webpack-qiniu-plugin')
const { override, addWebpackAlias, addBabelPlugin } = require('customize-cra')

const addCustomize = () => config => {
  /**
   * Add logical assignment operators support
   *
   * see https://github.com/facebook/create-react-app/issues/9908
   */
  const rules = config.module.rules.find(rule => !!rule.oneOf).oneOf
  const babelLoaderRule = rules.find(rule =>
    rule.loader.includes('babel-loader')
  )

  babelLoaderRule.options.plugins.push(
    '@babel/plugin-proposal-logical-assignment-operators'
  )

  if (config.mode === 'production') {
    // Use CDN resources instead
    config.externals = {
      react: 'React',
      'react-dom': 'ReactDOM'
    }

    // Workbox
    config.plugins.push(
      new WorkboxWebpackPlugin.InjectManifest({
        exclude: [/\.LICENSE\.txt$/, 'index.html'],
        swSrc: './src/utils/sw.js',
        swDest: 'sw.js'
      })
    )

    config.optimization = {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /node_modules\/(@heyforms\/|@heyui\/).*/,
            name: 'commons',
            chunks: 'all'
          },
          prosemirror: {
            test: function (module) {
              return (
                module.resource &&
                module.resource.includes('/node_modules/prosemirror-')
              )
            },
            name: 'prosemirror',
            chunks: 'all'
          },
          vendors: {
            test: function (module) {
              return (
                module.resource &&
                module.resource.includes('/node_modules/') &&
                !module.resource.includes('/node_modules/@heyforms') &&
                !module.resource.includes('/node_modules/@heyui') &&
                !module.resource.includes('/node_modules/prosemirror-')
              )
            },
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    }

    // Upload static assets to Qiniu CDN
    if (!process.env.ANALYZE) {
      config.plugins.push(
        new WebpackQiniuPlugin({
          envFile: '.qiniurc',
          prefix: 'webapp/',
          base: 'build/',
          glob: 'build/**',
          globIgnore: [
            'build/**/*.map',
            'build/**/*.html',
            'build/**/*.LICENSE.txt',
            'build/asset-manifest.json',
            'build/static/manifest.json',
            'build/sw.js'
          ],
          bucket: 'heyform',
          overrides: true,
          parallelCount: 2,
          zone: WebpackQiniuPlugin.Uploader.zone.na0,
          debug: true
        })
      )
    }
  }

  return config
}

module.exports = {
  webpack: override(
    // Add an alias for `src`
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
      'react/jsx-runtime': require.resolve('react/jsx-runtime')
    }),

    // Add module resolver
    addBabelPlugin([
      'module-resolver',
      {
        root: './',
        alias: {
          '@': './src'
        }
      }
    ]),

    addCustomize()
  )
}
