import mongoose from 'mongoose';


const User = mongoose.model('User', new mongoose.Schema({
	token: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
        unique: true
	},
	business: {
		type: Object,
	},
	managers: {
		type: Object,
	},
    total_profiet:{
        type: String
    },
	time:{
        type: String
    }
}));

exports.User = User;