import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/auth.routes.js';
import Tasks from './routes/tasks.routes.js';
import authgoogle from './routes/authgoogle.routes.js';
import {FRONTEND_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, TOKEN_SECRET, URL_DOMAIN, NODE_ENV_NAME, TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET, FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, URL_FRONTEND} from './config.js';
import {swaggerSpec, swaggerUi} from './swaggerConfig.js';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import {Strategy as TwitterStrategy} from 'passport-twitter';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import {Strategy as GitHubStrategy} from 'passport-github2';
import User from './models/user.model.js';
import {verifyPassword} from './libs/bcrypt.js';
import {Strategy as LocalStrategy} from 'passport-local';
import {findOrCreateUser, findUserOne} from './controllers/authController.js';
import verifyToken from './middlewares/authMiddleware.js';

const app = express();

console.log(TOKEN_SECRET);
// Middleware setup
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 24 * 60 * 60 * 1000}, // 1 día
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    credentials: true,
    origin: [FRONTEND_URL, "https://jf36d5k0-4000.use2.devtunnels.ms", "http://localhost:5173", "https://blog-mario-salazar.netlify.app", "https://blog-mario-salazar-bq3gujeoi-mario-salazars-projects.vercel.app"],
}));

console.log(URL_DOMAIN);

// Passport strategy setup
//https://app-backend-aztra.vercel.app/auth/google/callback
//https://backend-auth-node.vercel.app/auth/google/callback
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: NODE_ENV_NAME == 'production' ? URL_DOMAIN + '/auth/google/callback' : '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

console.log(TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET, URL_FRONTEND, URL_DOMAIN + '/auth/twitter/callback',);

//https://app-backend-aztra.vercel.app/auth/twitter/callback
//https://backend-auth-node.vercel.app/auth/twitter/callback 

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CLIENT_ID,
    consumerSecret: TWITTER_CLIENT_SECRET,
    callbackURL: URL_DOMAIN + '/auth/twitter/callback',
    includeEmail: true
},
    async (token, tokenSecret, profile, done) => {
        return done(null, profile);
    }
));
//https://1gt9jcx5-4000.use2.devtunnels.ms/auth/facebook/callback
//https://app-backend-aztra.vercel.app/auth/facebook/callback
//https://backend-auth-node.vercel.app/auth/facebook/callback
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: URL_DOMAIN + '/auth/facebook/callback',
    enableProof: true,
    includeEmail: true,
    profileFields: ['id', 'displayName', 'photos', 'email']
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);

    }
));


//https://1gt9jcx5-4000.use2.devtunnels.ms/auth/github/callback
//https://app-backend-aztra.vercel.app/auth/github/callback
//https://backend-auth-node.vercel.app/auth/github/callback
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    includeEmail: true,
    callbackURL: URL_DOMAIN + '/auth/github/callback',
    scope: ['user:email']
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile)
    }
));


passport.use(new LocalStrategy(
    async (username, password, done) => {
        let user = await findUserOne(username)
        //console.log("user => ", user);
        if (!user) {
            return done(null, false)
        }
        if (user && verifyPassword(password, user.password)) {
            return done(null, user)
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Static files and routes
app.use(express.static(path.join(process.cwd(), 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

app.use('/api/auth', authRoutes);
app.use('/api', Tasks);
app.use('/auth', authgoogle);

app.get('/', async (req, res) => {
    const domain = `https://${req.get('host')}/api/docs`;
    res.render('index', {domain: domain});
});


app.get('/profile', verifyToken, (req, res) => {
    console.log('object');
    res.send(req.user)
});

app.use('/api/docs', swaggerUi.serve, (req, res, next) => {
    const domain = `https://${req.get('host')}`;
    swaggerSpec.servers[0].url = domain;
    swaggerUi.setup(swaggerSpec, {
        customCssUrl: 'https://mariosalazar-styles-swagger-ui.vercel.app/css/swagger-ui.css'
    })(req, res, next);
});

// Production setup
if (process.env.NODE_ENV === 'production') {
    (async () => {
        const path = await import('path');
        app.use(express.static('client/dist'));

        app.get('*', (req, res) => {
            res.sendFile(path.resolve('client', 'dist', 'index.html'));
        });
    })();
}

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;
