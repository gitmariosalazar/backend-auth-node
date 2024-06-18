import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import Tasks from './routes/tasks.routes.js';
import {FRONTEND_URL} from './config.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert {type: 'json'};
import path from 'path';

const app = express();
app.use(cors());

console.log('URL ', FRONTEND_URL);

/*
app.use(
    cors({
        credentials: true,
        origin: FRONTEND_URL,
    })
);
*/



app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());


app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

app.use(express.static(path.join(process.cwd(), 'public')));
app.use('/api/auth', authRoutes);
app.use('/api', Tasks);

app.get('/', async (req, res) => {
    try {
        const domain = `${req.protocol}://${req.get('host')}/api/docs`;
        res.render('index', {domain: domain});
    } catch (err) {
        console.error('Error al leer el archivo HTML:', err);
        res.status(500).send('Error interno del servidor');
    }
});


app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (process.env.NODE_ENV === 'production') {
    const path = await import('path');
    app.use(express.static('client/dist'));

    app.get('*', (req, res) => {
        console.log(path.resolve('client', 'dist', 'index.html'));
        res.sendFile(path.resolve('client', 'dist', 'index.html'));
    });
}

export default app;
