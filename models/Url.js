import mongoose, { Schema } from 'mongoose';

const urlSchema = new Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    creationDate: {
        type: Date,
        default: Date.now,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
});

export default mongoose.model('URL', urlSchema);
