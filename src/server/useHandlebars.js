import handlebars from 'handlebars';
import fs from 'fs';
import path from "path";


var createTemplate = (templateLocation=null) => {
    var template = fs.readFileSync(path.resolve(__dirname, templateLocation), 'utf-8');
    return handlebars.compile(template);
}

var createPartial = (templateLocation=null, partialName) => {
    var template = fs.readFileSync(path.resolve(__dirname, templateLocation), 'utf-8');
    handlebars.registerPartial(partialName, template);
}

createPartial("../site/templates/partials/site.html", "site");
createPartial("../site/templates/partials/register.html", "registerForm");

var App = data => {
    return createTemplate("../site/templates/application.html")(data);
}

var Homepage = data => {
    return createTemplate("../site/templates/unauth.html")(data);
}

var PasswordResetTemplate = data => {
    return createTemplate("../site/templates/PasswordReset.html")(data);
};

var LoginPage = data => {
    return createTemplate("../site/templates/LoginPage.html")(data);
}

var LegalPage = data => {
    return createTemplate('../site/templates/LegalPage.html')(data);
}

export {
    App,
    Homepage,
    PasswordResetTemplate,
    LoginPage,
    LegalPage
}