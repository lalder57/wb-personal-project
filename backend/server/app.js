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

function loginRequired(req, res, next) {
  if (!req.session.userId) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    next();
  }
};



// ROUTES

/* #1 - Login
Need a body with a username and password
Will return { success: true } or { success: false }
*/
app.post('/api/login', handlerFunctions.login);

/* #2 - checkSession
Check to see if there is a userId on the req.session object
If so, send it to the front end
*/

app.get('/api/check-session', handlerFunctions.checkSession);

/* #3 - Register
If username does not already exist in DB, create new user
Will need a body with a username and password
Will return {
message: 'New user created',
success: true,
userId: req.session.userId
}
*/ 
app.post('/api/register', handlerFunctions.register)

/* #4 - Logout
destroy session data
*/ 
app.get('/api/logout', handlerFunctions.logout)

/* #5 - Add Pd - 
Add newly created PD to the database
Need a body with the newly added info (Pd and PdTracker models)
Will return { message: 'PD saved!'}

Maybe have a create Pd endpoint and an add Pd endpoint 
*/

app.post('/api/addPd', handlerFunctions.addPd);

/* #6 - Add Course
Add newly created course to the database
Need a body with the newly added info (Course and courseTracker models)
Will return { message: 'Course saved!'}
*/

app.post('/api/addCourse', handlerFunctions.addCourse);

/* #7 -- Show user their completed pds and courses
Get request to find all pds and courses that have the userId
will need the userId 
will return {message: 'Here's your info', success: true, info: info }
*/

app.get('/api/userInfo', handlerFunctions.getUserInfo);

// gets all the existing pds from the DB
app.get('/api/pds', handlerFunctions.getPds);

// get all existing courses from the DB
app.get('/api/courses', handlerFunctions.getCourses)

// get specific pdTracker details
app.get('/api/pdTrackers/:pdTrackerId', handlerFunctions.getPdDetails)

// get specific courseTracker detials
app.get('/api/courseTrackers/:courseTrackerId', handlerFunctions.getCourseDetails)

// post request to update a user's degreeId if they are in lane 5 or 8
app.post('/api/updateDegree', handlerFunctions.updateDegree)

// put request to edit a pd's information
app.put('/api/editPd/:pdTrackerId', handlerFunctions.editPd)



ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));