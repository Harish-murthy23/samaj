import mongoose from 'mongoose';

const familyHeadSchema = new mongoose.Schema({
  applicationNumber: { type: String, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { 
    type: String, 
    enum: ['male', 'female', 'other'], 
    default: 'male' 
  },
  maritalStatus: { 
    type: String, 
    enum: ['unmarried', 'married', 'divorced', 'widowed'], 
    default: 'unmarried' 
  },
  qualification: String,
  aadhaar: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: function(v) {
        return /^\d{12}$/.test(v);
      },
      message: props => `${props.value} is not a valid Aadhaar number!`
    }
  },
  contact: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  village: String,
  email: { type: String, lowercase: true },
  occupation: String,
  address: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('FamilyHead', familyHeadSchema);