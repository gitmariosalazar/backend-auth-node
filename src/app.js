import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import Tasks from './routes/tasks.routes.js';
import {FRONTEND_URL} from './config.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json' assert {type: 'json'};

const app = express();
app.use(cors());

console.log('URL ', FRONTEND_URL);


app.use(
    cors({
        credentials: true,
        origin: FRONTEND_URL,
    })
);

app.use(cors())


app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api', Tasks);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (process.env.NODE_ENV === 'production') {
    const path = await import('path');
    app.use(express.static('client/dist'));

    app.get('*', (req, res) => {
        console.log(path.resolve('client', 'dist', 'index.html'));
        res.sendFile(path.resolve('client', 'dist', 'index.html'));
    });
}

export default app;
