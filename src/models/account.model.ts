import mongoose from "mongoose";


const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        default: null
    },


    password: {
        type: String,
        required: true,
    },

    password_show: {
        type: String,
        required: true,
    },

    type: {
        type: String,
        enum: ["admin"],
        required: true,
    },


    auth_token: {
        type: String,
        required: false,
        default: null,
    }
}, { timestamps: true });


const AccountsSchema = mongoose.model("accounts", accountSchema);

export default AccountsSchema;