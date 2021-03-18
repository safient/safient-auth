const mongoose = require('mongoose');
const {Schema} = mongoose;

/**
 * Mongodb schema to create new user
 * @type {module:mongoose.Schema<Document, Model<Document>, undefined>}
 */
const userSchema = new Schema({
  userEmail : {type: String, unique: true, required: true},
  userPass: {type: String, required: true},
  wallet: {type: String}
});

mongoose.model('users', userSchema);

