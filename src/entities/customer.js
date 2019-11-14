import mongoose, {
    Schema
} from 'mongoose';

export const CustomerSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: false
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        required: false
    },
    owner: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
        required: false
    },
}, {
    collection: 'customers'
})

CustomerSchema.index({
    email: 1,
    owner: 1
});

export default mongoose.model('Customer', CustomerSchema);