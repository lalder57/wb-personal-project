import express from 'express';
import session from 'express-session';
import ViteExpress from 'vite-express';
import { handlerFunctions } from './controller.js';
// set up middleward
const app = express();
const port = '7931';
ViteExpress.config({ printViteDevServerHost: true });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));

// function loginRequired(req, res, next) {
//   if (!req.session.userId) {
//     res.status(401).json({ error: 'Unauthorized' });
//   } else {
//     next();
//   }
// };



// ROUTES

/* #1 - Login
Need a body with a username and password
Will return { success: true } or { success: false }
*/
app.post('/api/login', handlerFunctions.login);

// #2 - Add Pd

// #3 - Add Course

// #4 - Logout

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));