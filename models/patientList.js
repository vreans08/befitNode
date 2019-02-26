import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let patientList = new Schema({
    firstName : String,
    lastName: String,  
    userName : String, 
    phone: String,
    userId : String,
    email: String,
    nextAppointmentDate: String,
    nextAppointmentDoctor:String,
    lastVisitedDoctor: String,
    lastVisitedDate: String,
    visitHistory: Array

});

export default mongoose.model('patientList', patientList, 'patientList');
