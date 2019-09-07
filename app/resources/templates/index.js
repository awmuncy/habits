import handlebars from 'handlebars';
import fs from 'fs';
import path from "path";


var createTemplate = (templateLocation=null) => {
    var template = fs.readFileSync(path.resolve(__dirname, templateLocation), 'utf-8');
    return handlebars.compile(template);
}

var App = data => {
    return createTemplate("./application.html")(data);
}

var Unauth = data => {
    return createTemplate("./unauth.html")(data);
}



export {
    App,
    Unauth
}