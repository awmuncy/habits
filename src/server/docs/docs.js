const express = require('express');
const router = new express.Router();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('src/server/docs/openapi.yaml');

export default router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
