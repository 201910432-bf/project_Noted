const express = require("express");
const command = require("../controller/commands");
const router = express.Router();

router.get("/savenote/:data/:idKeyData/:valueData", (req, res) => {
  command.insertData(req.params.data);
  res.send(
    req.params.data + " " + req.params.idKeyData + " " + req.params.valueData
  );
  // res.redirect("/note");
});

module.exports = router;
