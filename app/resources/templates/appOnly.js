const htmlTemplate = ( reactDom ) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>*Mongo, Express, React, Node</title>
            <link rel="stylesheet" type="text/css" href="/css/style.css">
            <meta data-rh="true" name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"/>
        </head>
        
        <body>
            <div id="momentum-app"></div>
            <script src="/js/app.js"></script>
        </body>
        </html>
    `;
}

module.exports = {
    htmlTemplate: htmlTemplate
};