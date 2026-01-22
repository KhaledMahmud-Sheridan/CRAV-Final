const { body, validationResult } = require("express-validator");


// Display list of all obd2ts.
exports.obd2ts_list = function (req, res, next) {
  BookInstance.find()
    .populate("book")
    .then((results)=>{
      res.render("bookinstance_list", {layout : 'layout.pug' ,
        title: "Book Instance List",
        bookinstance_list: results,  currentTab: 'oBD2'
      });
    })
    .catch((err)=>{
      return next(err);
    });
};

