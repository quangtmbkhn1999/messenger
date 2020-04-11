import express from "express";
import connectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/web.js";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import session from "./config/session";
import passport from "passport";
import http from "http";
import socketio from "socket.io";
import initSockets from "./sockets/index";
import configSocketIO from "./config/socketio";
import cookieParser from "cookie-parser";

// init app
let app=express();

//init server with socketio
let server= http.createServer(app);
let io=socketio(server); 

// connect database
connectDB();

//config session
session.config(app);

//config view engine 
configViewEngine(app);

//config body parser
app.use(bodyParser.urlencoded({extended:true}));

//config flash message
app.use(connectFlash());

//use cookie-parser
app.use(cookieParser());

//config passport
app.use(passport.initialize());
app.use(passport.session());

let port=9899;
let hostname="localhost";

initRoutes(app);

//
configSocketIO(io,cookieParser,session.sessionStore);
// init all socket
initSockets(io);




server.listen(port,hostname,()=>{
  console.log("Bạn đang chạy tại: "+hostname+":"+port );
});


// import pem from "pem";
// import https from "https";


// pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
//   if (err) {
//     throw err
//   }
//    // init app
// let app=express();

// // connect database
// connectDB();

// //config session
// configSession(app);

// //config view engine 
// configViewEngine(app);

// //config body parser
// app.use(bodyParser.urlencoded({extended:true}));

// //config flash message
// app.use(connectFlash());

// //config passport
// app.use(passport.initialize());
// app.use(passport.session());

// let port=9899;
// let hostname="localhost";

// initRoutes(app);

//   https.createServer({ key: keys.serviceKey, cert: keys.certificate },app).listen(port,hostname,()=>{
//     console.log("ban dang chay o "+hostname+":"+port );
//   }); 

//   ////////////////////////////////
// })

