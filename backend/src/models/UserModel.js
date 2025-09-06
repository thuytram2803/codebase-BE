import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true 
        },
        email: { 
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: false
        },
        address: {
            type: String,
            required: false
        },
        dayOfBirth: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const UserModel = mongoose.model("User",UserSchema);

export default UserModel;