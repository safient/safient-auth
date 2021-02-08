const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  userEmail : {type: String, unique: true, required: true},
  userPass: {type: String, required: true},
  wallet: {type: String}
});

mongoose.model('users', userSchema);

