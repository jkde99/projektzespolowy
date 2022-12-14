const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Subject = db.subject;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ accessToken:null, message: "Invalid Password!" });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      req.session.token = token;
      //console.log(user.subjects);

      res.status(200).send({
        id: user._id,
        username: user.username,
        roles: authorities,
        accessToken: token,
        subjects: user.subjects,
        finishedQuizes: user.finishedQuizes
      });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

exports.addSubjectToUser = async (req, res) => {
  try {
    var user = await User.findOne({username: req.body.name});
    console.log(user);
    const sub = req.body.sub;
    if(user.subjects.includes(sub)){
      res.status(200).json({"message":"juz istnieje"});
    } else {
      user = await User.updateOne(
        {_id: user._id},
        {$push: {subjects: sub}},
        function (err, docs) {
          if(err){
            console.log(err);
          } else {
            console.log("Updated Docs: ", docs);
          }
        }
      );
      res.status(200).json(sub);
    }
  } catch (err) {
    return res.status(500).json({"error":err});
  }
}

exports.removeSubjectFromUser = async (req, res) => {
  try {
    var user = await User.findOne({username: req.body.name});
    const sub = req.body.sub;
    user = await User.updateOne(
      {_id: user._id},
      {$pull: {subjects: sub}},
      function (err, docs) {
        if(err){
          console.log(err);
        } else {
          console.log("Updated Docs: ", docs);
        }
      }
    );
    res.status(200).json(sub);
  } catch (err) {
    return res.status(500).json({"error":err});
  }
}

exports.getSubjects = (req, res) => {
  try {
    //console.log(db.SUBJECTS);
    return res.status(200).json(db.SUBJECTS);
  } catch (err) {
    return res.status(500).json({"error":err});
  }
}