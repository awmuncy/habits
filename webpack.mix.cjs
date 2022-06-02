/* eslint-disable */
var mix = require('laravel-mix');


mix.sourceMaps(true, 'source-map')
    .webpackConfig({
        resolve: {
            fallback: {
                crypto: false,
                fs: false,
                path: false
            }
        }
    })
    .ts('src/application/app.jsx',                        'dist/public/js')
    .react()
    .sass ('src/application/styles/style.scss',              'css')
    .js('src/service-worker/service-worker-install.js', 'dist/public')
    .js('src/service-worker/service-worker.js', 'dist/public')
    .copy ('src/application/lib/sql-wasm.wasm', 'dist/public')
    .copy ('src/application/lib/sql-wasm.wasm', 'dist/public/js')
    .copy ('src/site/fonts',                                 'dist/public/fonts')
    .copy ('src/site/images',                                'dist/public/images')
    .copy ('src/site/icons',                                 'dist/public/icons')
    .copy ( 'src/application/lib/sql-wasm.wasm',            'dist/public/js')
    .copy ('src/service-worker/manifest.json',               'dist/public')
    .setPublicPath('dist/public');