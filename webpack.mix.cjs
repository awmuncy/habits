/* eslint-disable */
var mix = require('laravel-mix');


mix.sourceMaps(true, 'source-map')
    .ts('src/application/app.jsx',                        'dist/public/js')
    .react()
    .sass ('src/application/styles/style.scss',              'dist/public/css')
    .react()
    .copy ('src/site/fonts',                                 'dist/public/fonts')
    .copy ('src/site/images',                                'dist/public/images')
    .copy ('src/site/icons',                                 'dist/public/icons')
    .copy ('src/service-worker/manifest.json',               'dist/public');