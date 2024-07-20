// routes/authRoutes.js
import {Router} from 'express';
import passport from 'passport';
import {findOrCreateUser, findUserOne, register} from '../controllers/authController.js';
import {configDotenv} from 'dotenv';
import {hashPassword} from '../libs/bcrypt.js';
import {createToken} from '../libs/jwt.js';
import {logoutUser} from '../middlewares/authMiddleware.js';


configDotenv()
const router = Router();


router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

const captureAndLogReferer = (req, res, next) => {
    const referer = req.get('referer');
    if (referer) {
        res.cookie('referer', referer, {httpOnly: true, secure: true, sameSite: 'None'});
    }
    next();
};


router.get('/twitter',
    captureAndLogReferer,
    passport.authenticate('twitter', {
        scope: ['include_email=true']
    })
);


router.get('/facebook',
    passport.authenticate('facebook', {
        scope: ['email']
    })
);

router.post('/login',
    passport.authenticate('local', {failureRedirect: '/auth/login'}),
    async (req, res) => {
        if (req.user.user != null) {
            let user = await findUserOne(req.user.user.email)
            const token = createToken(user)
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 3600000
            });
            res.send(req.user)
        } else {
            res.send(req.user)
        }
    });

router.post('/register', register)

router.get('/github',
    passport.authenticate('github', {scope: ['user:email']}));

router.get('/github/callback',
    passport.authenticate('github', {failureRedirect: '/init'}),
    async (req, res) => {
        const referer = req.get('referer');
        let user = await findOrCreateUser(req.user)
        const token = createToken(user)
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 3600000
        });
        res.redirect(referer);
    });
/*
router.post('/register', async (req, res) => {
    const {email, password, name} = req.body;
    try {
        const hashedPassword = await hashPassword(password)
        const newUser = new User({email, password: hashedPassword, name});
        await newUser.save();
        res.status(201).json({message: 'User registered successfully!'});
    } catch (error) {
        res.status(500).json({message: 'Error registering user', error});
    }
});
*/

router.post('/logout', logoutUser);

router.get('/google/callback',
    passport.authenticate('google', {failureRedirect: '/'}),
    async (req, res) => {
        const referer = req.get('referer');
        req.user.password = hashPassword('password-mario')
        let user = await findOrCreateUser(req.user)
        const token = createToken(user)
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 3600000
        });
        res.redirect(referer);
    }
);


router.get('/twitter/callback',
    passport.authenticate('twitter', {failureRedirect: '/'}),
    async (req, res) => {
        req.user.password = hashPassword('password-mario');
        let user = await findOrCreateUser(req.user);
        const token = createToken(user);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 3600000
        });

        const referer = req.cookies.referer
        res.redirect(referer);
    }
);



router.get('/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/'}),
    async (req, res) => {
        const referer = req.get('referer');
        let user = await findOrCreateUser(req.user)
        const token = createToken(user)
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 3600000
        });
        res.redirect(referer);
    });

router.get('/init', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Inicio</title>
            </head>
            <body>
                <div>
                    <h1>Start with</h1>
                    <ul>
                        <li><a href="/auth/google">Iniciar sesión con Google</a></li>
                        <li><a href="/auth/twitter">Iniciar sesión con Twitter</a></li>
                        <li><a href="/auth/facebook">Iniciar sesión con Facebook</a></li>
                        <li><a href="/auth/github">Iniciar sesión con Git Hub</a></li>
                    </ul>
                </div>
            </body>
        </html>
    `);
});




export default router;
