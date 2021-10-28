import express from 'express';
const router = new express.Router();
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('src/server/docs/openapi.yaml');

export default router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
