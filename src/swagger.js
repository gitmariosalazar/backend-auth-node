import doc from '../public/json/swagger.js';
import swaggerAutogen from 'swagger-autogen';



const doc_swagger = doc

const outputFile = './swagger-output.json';
//const endpointsFiles = ['./routes/auth.routes.js', './routes/tasks.routes.js'];
const endpointsFiles = ['./app.js'];
swaggerAutogen()(outputFile, endpointsFiles, doc_swagger).then(async () => {
    await import('./index.js');
});