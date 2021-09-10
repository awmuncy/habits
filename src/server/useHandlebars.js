import handlebars from 'handlebars';
import fs from 'fs';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let createTemplate = (templateLocation = null) => {
  let template = fs.readFileSync(path.resolve(__dirname, templateLocation), 'utf-8');
  return handlebars.compile(template);
};

let createPartial = (templateLocation = null, partialName) => {
  let template = fs.readFileSync(path.resolve(__dirname, templateLocation), 'utf-8');
  handlebars.registerPartial(partialName, template);
};

createPartial('../site/templates/partials/site.html', 'site');
createPartial('../site/templates/partials/register.html', 'registerForm');

let appTemplate = data => {
  return createTemplate('../site/templates/application.html')(data);
};

let homepageTemplate = data => {
  return createTemplate('../site/templates/unauth.html')(data);
};

let passwordResetTemplate = data => {
  return createTemplate('../site/templates/PasswordReset.html')(data);
};

let loginPage = data => {
  return createTemplate('../site/templates/LoginPage.html')(data);
};

let legalPage = data => {
  return createTemplate('../site/templates/LegalPage.html')(data);
};

export {
  appTemplate,
  homepageTemplate,
  passwordResetTemplate,
  loginPage,
  legalPage
};
