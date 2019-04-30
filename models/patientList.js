import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let patientList = new Schema({
    firstName : String,
    lastName: String,  
    userName : String, 
    phone: String,
    userId : String,
    email: String,
    relationType: String,
    relationName: String,
    dob: String,
    age: Number,
    whatsapp: String,
    height: String,
    weight: String,
    referedBy: String,
    address: String,
    reason: String,
    bloodgroup: String,
    nextAppointmentDate: String,
    nextAppointmentDoctor:String,
    lastVisitedDoctor: String,
    lastVisitedDate: String,
    visitHistory: Array,
    pmh:Object,
    familyHistory: Array
});

export default mongoose.model('patientList', patientList, 'patientList');
