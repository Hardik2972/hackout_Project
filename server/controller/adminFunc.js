const Report = require("../models/Report");
const User = require("../models/User");

async function handleReport(req,res){
    const reports= await Report.find();
    res.json(reports);
}

module.exports = {handleReport};