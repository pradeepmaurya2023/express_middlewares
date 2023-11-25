const express = require("express");

const app = express();
const port = 8080;

// ----------------
// defining our first middleware

// app.use((req,res)=>{
//     console.log(req.url);
//     console.log('hi, I am middleware');
//     res.send('middleware finished')
// });


// ----------------------
// using next()
// app.use((req,res,next)=>{
//     console.log(req.url);
//     console.log('hi, I am middleware 1');
//     // next();
//     return next();  //this will not let below line execute
//     console.log('Hi, I am after next and will be executed at last');
// });

// --------------------------
// middleware chaining
const middleware = ((req,res,next)=>{
    // console.log(req.url);
    console.log('hi, I am middleware 2');
    next();
});

// ---------------------------------
// creating a utility middleware --logger
// app.use((req,res,next)=>{
//     req.responseTime = new Date(Date.now()).toString();
//     console.log(req.method, req.path, req.hostname, req.responseTime)
//     next()
// })

// ----------------------------
// creating path specific middleware
// app.use('/random',(req,res,next)=>{
//     console.log('i am only for random')
//     next()
// });
// app.use('/random',(req,res,next)=>{
//     console.log('i am  2 only for random')
//     next()
// });

// --------------------------------------
// middleware checking for api token
// app.use('/api',(req,res,next)=>{
//     let { token } = req.query;
//     console.log(token)
//     if (token == 'giveaccess') {
//        return next();
//     }else{
//         res.send('ACCESS DENIED');
//     }
// })

// creating middleware function and passing as callback to route handler
const checkToken = ((req,res,next)=>{
    let { token } = req.query;
    console.log(token)
    if (token == 'giveaccess') {
       return next();
    }else{
        // res.send('ACCESS DENIED');
        throw new Error("Access Denied");
    }
});


// route for root path
app.get('/',(req,res)=>{
    res.send('Welcome to root');
});

app.get('/random',(req,res)=>{
    res.send('This is a random page');
});

// checking if api token is passed or not
// app.get("/api",(req,res)=>{
//     res.send("Data is accessd");
// })

// passing middleware as an argument
// execution preference based on first comes first
app.get("/api",checkToken,middleware,(req,res)=>{
    res.send("Data is accessd");
})

// won't work because res is already sent
// app.use((req,res,next)=>{
//     // console.log(req.url);
//     console.log('hi, I am middleware 2');
//     next();
// });

// default error handling in express
app.get('/wrong',(req,res)=>{
    abcd = abcd;
})


// page 404 error
app.use((req,res)=>{
    res.status(404).send('Page Not Found');
})
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
});