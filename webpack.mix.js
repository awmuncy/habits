let mix = require('laravel-mix');


mix.react('app/resources/assets/js/app.js', 'app/public/js')
    .sass('app/resources/assets/sass/app/style.scss', 'app/public/css')
    .sass('app/resources/assets/sass/unauth/unauth.scss', 'app/public/css')
    .js('app/resources/assets/js/service-worker/service-worker.js', 'app/public/service-worker.js')
    .js('app/resources/assets/js/service-worker/service-worker-install.js', 'app/public/service-worker-install.js')
    .react('app/resources/assets/js/site.js', 'app/public/js');