let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.react('resources/assets/js/app.js', 'public/js')
//    .sass('resources/assets/sass/app.scss', 'public/css');


mix.react('app/resources/assets/js/app.js', 'app/public/js')
    .sass('app/resources/assets/sass/app/style.scss', 'app/public/css')
    .sass('app/resources/assets/sass/unauth/unauth.scss', 'app/public/css')
    .babel('app/resources/assets/js/service-worker.js', 'app/public/service-worker.js')
    .js('app/resources/assets/js/service-worker-install.js', 'app/public/service-worker-install.js')
    .react('app/resources/assets/js/site.js', 'app/public/js');