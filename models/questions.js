import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let questions = new Schema({
    questions: String,
    questionID: String
});

export default mongoose.model('questions', questions, 'questions');
