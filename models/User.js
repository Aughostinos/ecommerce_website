

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50
},
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
},
  userName: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50
},
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255
},
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
},
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
},
  dateOfBirth: {
    type: Date,
    required: true
},
  wishList: {
    type: Array,
    required: false
},
  cart: {
    type: Array,
    required: false
},
});

module.exports = mongoose.model('User', userSchema);
