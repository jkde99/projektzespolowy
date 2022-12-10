const { authJwt } = require("../middlewares");
const controller = require("../controllers/quiz.controller");

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Accept"
        );
        next();
    });
    //app.post("/api/quiz/addq", [authJwt.verifyToken, authJwt.isTeacher], controller.addQuestion);
    //app.get("/api/quiz/get", [authJwt.verifyToken, authJwt.isTeacher], controller.getQuestions);
    //app.put("/api/quiz/update/:id", [authJwt.verifyToken, authJwt.isTeacher], controller.updateOne);
    //app.delete("/api/quiz/delete/:id", [authJwt.verifyToken, authJwt.isTeacher], controller.deleteOne);
    //app.put("/api/quiz/flag/:id", [authJwt.verifyToken], controller.flagAQuestion);
    app.post("/api/quiz/addquiz",[authJwt.verifyToken, authJwt.isTeacher], controller.addQuiz);
}