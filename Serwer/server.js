const express = require('express');
//const bodyParser = require('body-parser');
//const {MongoClient} = require('mongodb');
//const path = require('path');
//var cons = require('consolidate');
const cors = require("cors");
const cookieSession = require("cookie-session");
const dbConfig = require("./main/config/db.config");

var corsOptions = {
  origin: "http://localhost:3001"
};

const app = express();
//const uri = "mongodb+srv://jakub:123@cluster0.yd9mj.mongodb.net/?retryWrites=true&w=majority";

app.use(cors(corsOptions));
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "proj-session",
    secret: "COOKIE_SECRET",
    httpOnly: true
  })
)
//app.use(express.static('main'));
//app.engine('html',cons.swig)
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'html');
const db = require("./main/models");
const Subject = require('./main/models/subject.model');
const Role = db.role;
require('./main/routes/user.routes')(app);
require('./main/routes/auth.routes')(app);
require('./main/routes/quiz.routes')(app);

db.mongoose
  .connect(`mongodb+srv://${dbConfig.HOST}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "student"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'student' to roles collection");
        });
  
        new Role({
          name: "teacher"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'teacher' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
    Subject.estimatedDocumentCount((err, count) => {
      if(!err && count === 0){
        new Subject({
          name: "j. polski"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'j. polski' to subjects collection");
        });

        new Subject({
          name: "j. angielski"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'j. angielski' to subjects collection");
        });

        new Subject({
          name: "matematyka"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'matematyka' to subjects collection");
        });

        new Subject({
          name: "informatyka"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'informatyka' to subjects collection");
        });

        new Subject({
          name: "historia"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'historia' to subjects collection");
        });
      }
    })
  }

app.get('/', (req, res) => {
  res.render(path.join(__dirname, '/main/pages/glowna.html'))
})

/*
app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/main/main.html');
    res.render(path.join(__dirname, '/main/main.html'), {name: ""});
});

app.get('/login', (req, res) => {
    //res.sendFile(__dirname + '/main/Login.html');
    res.render(path.join(__dirname, '/main/Login.html'), {error: ""});
});

app.get('/register',(req,res)=>{
  res.render(path.join(__dirname, '/main/register.html'), {error: ""})
})

app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    MongoClient.connect(uri, (err, db) => {
        if (err) throw err;
        var dbo = db.db("ProjektZespolowy");
        dbo.collection("Users").findOne({ username: {$eq: username}, password: {$eq: password} }, function(err, result) {
          if (err)
            throw err;
          if(result)
            //res.sendFile(__dirname + '/main/main.html');
            res.render(path.join(__dirname, '/main/main.html'), {name: username});
          else
            //res.sendFile(__dirname + '/main/Login.html');
            res.render(path.join(__dirname, '/main/Login.html'), {error: "Nie ma takiego użytkownika."});
          db.close();
        });
      }); 
    
});

app.post('/register', (req,res)=>{
  let username = req.body.username;
  let password = req.body.password;
  MongoClient.connect(uri, (err,db) =>{
    if(err) throw err;
    var dbo = db.db("ProjektZespolowy");
    dbo.collection("Users").findOne({ username: {$eq: username}}, function(err, result) {
      if (err)
        throw err;
      if(result){
        //res.sendFile(__dirname + '/main/main.html');
        res.render(path.join(__dirname, '/main/register.html'), {error: "Uzytkownik o danej nazwie juz istnieje."});
        db.close();
      } else {
        dbo.collection("Users").insertOne({username: username, password:password}, function(err,res){
          if(err) throw err;
          db.close();
        })
        res.render(path.join(__dirname, '/main/main.html'), {name: username});
        
      }
      
    });
    
  })
})*/

const port = 3000;

app.listen(port, () => console.log(`This app is listening on port ${port}`));

