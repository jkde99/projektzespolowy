exports.allAccess = (req, res) => {
    //res.status(200).send("Public Content.");
    //res.render("../pages/glowna")
    res.status(200).send("Public content.");
  };
  
  exports.studentBoard = (req, res) => {
    res.status(200).send("Student Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.teacherBoard = (req, res) => {
    res.status(200).send("Teacher Content.");
  };