import mongoose from 'mongoose';

const familyMemberSchema = new mongoose.Schema({
  headId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'FamilyHead', 
    required: true 
  },
  name: String,
  relationship: String,
  age: Number,
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
  }
});

export default mongoose.model('FamilyMember', familyMemberSchema);