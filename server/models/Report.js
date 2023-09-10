const mongoose = require("mongoose");
// problem, time of incident, latitude and longitude, feedback yeh chije daal dio -->
const reportModel = new mongoose.Schema({
    sender:{type: mongoose.Schema.Types.ObjectId , ref:"user"},
    problem:{type:String,},
    complaintCases:{type:String,},
    latitude:{type:String,},
    longitude:{type:String,},
    timeOfIncident:{type:String,},
},{timestamps: true});

const Report = new mongoose.model("Report",reportModel);

module.exports = Report;