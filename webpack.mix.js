let mix = require('laravel-mix');


mix .sourceMaps(true, 'source-map')
    .react('src/application/app.jsx',                        'dist/public/js')
    .sass ('src/application/styles/style.scss',              'dist/public/css')
    .js   ('src/service-worker/service-worker.js',           'dist/public')
    .js   ('src/service-worker/service-worker-install.js',   'dist/public/js') 
    .react('src/site/scripts/site.jsx',                      'dist/public/js')
    .sass ('src/site/styles/unauth.scss',                    'dist/public/css')
    .copy ('src/site/fonts',                                 'dist/public/fonts')
    .copy ('src/site/images',                                'dist/public/images')
    .copy ('src/site/icons',                                 'dist/public/icons')
    .copy ('src/service-worker/manifest.json',               'dist/public');