import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let login = new Schema({
   userName: String,
   role: String,
   firstName : String,
   lastName: String,
   password: String,
   permissions : Object,
});

export default mongoose.model('login', login, 'login');