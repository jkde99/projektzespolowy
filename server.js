const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const path = require('path');
var cons = require('consolidate');

const app = express();
const uri = "mongodb+srv://jakub:123@cluster0.yd9mj.mongodb.net/?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('main'));
app.engine('html',cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/main/main.html');
    res.render(path.join(__dirname, '/main/main.html'), {name: ""});
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/main/Login.html');
});

app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    MongoClient.connect(uri, (err, db) => {
        if (err) throw err;
        var dbo = db.db("ProjektZespolowy");
        dbo.collection("Users").findOne({ username: {$eq: username}, password: {$eq: password} }, function(err, result) {
          if (err) throw err;
          if(result)
            //res.sendFile(__dirname + '/main/main.html');
            res.render(path.join(__dirname, '/main/main.html'), {name: username});
          else
            res.sendFile(__dirname + '/main/Login.html');
          db.close();
        });
      }); 
    
});

const port = 3000;

app.listen(port, () => console.log(`This app is listening on port ${port}`));
