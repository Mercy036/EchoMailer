import { mongoose, Schema, model } from 'mongoose'


const emailSchema = Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    scheduledTime: { type: Date, required: true },
    status: {
        type: String,
        enum: ["scheduled", "sent", "failed"],
        default: "scheduled"
    },
    createdAt: { type: Date, default: Date.now },
});

export const email=model('email',emailSchema);