import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  studentID: Number,
  lastName: String,
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',

  },
});

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('User', UserSchema);