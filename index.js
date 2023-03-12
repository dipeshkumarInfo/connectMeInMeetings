const CheckToken = require('./vendor/autoload');
const app = CheckToken(__dirname);

const path = require('path');

/*  start : "Set Templating Engine for and with Layout" */
  const expressLayouts = require('express-ejs-layouts');
  app.use(expressLayouts);
  app.set('layout', 'Layout/index');
  app.set('views', path.join(__dirname, 'resources/views'));

  app.set("view engine", "ejs");
/* end */

/*  start : "Used Middleware, services and Helpers" */

// Middleware
  const AuthenticateUser = require(fconf('CORE:http:middleware') + '/AuthenticateLiveStreamSession');
  const preventBack = require(fconf('CORE:http:middleware') + '/PreventBackMiddleware');

  // Service Providers
  const { webHandleRoute, apiHandleRoute } = require(fconf('CORE:app:providers')+ '/RouteServiceProvider');

/*  end */


/* start : "Routings" */
  
  
  // -- API Section 
  app.use(`/:path(${api_url.join('|')})`, AuthenticateUser, (req, res, next) => { apiHandleRoute(req, res, next, "/index") });


  // -- Web Section

  // Login and Sign Up
  app.use('/', (req, res, next) => { webHandleRoute(req, res, next, "/login") });
  
/* end */


/* start : "Other pages During Request Other Respons By Requets" */

  //Not Allowed or Not Access Route
  app.use('/error', AuthenticateUser, preventBack, require(fconf('CORE:routes:web') + '/errors'));

  // catch 404 and forward to error handler
  // app.use((req, res, next) => {
  //   const err = new Error('File Not Found');
  //   err.status = 404;
  //   next(err);
  // });

  // define 500 error callback
//   app.use((err, req, res, next) => {
    
//     res.status(500);

//     if (req.xhr || (typeof req.headers.accept != "undefined" && req.headers.accept.indexOf('json') > -1)) 
//     {
//       return res.send({ msg: err.message, status: false });
//     }else{
//       req.flash('alert_message',[{msg:err.message ,type:'danger'}]);
//       return res.redirect(base_path + `error/request-encountered/500`);
//    }
// });

/* end */

