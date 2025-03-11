import mongoose from "mongoose";
const profileSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      avatar: { type: String},
      preferences: { type: Object, default: {} },
      watchlist: [{ type: Schema.Types.ObjectId, ref: 'Content' }],
      recentlyWatched: [{ type: Schema.Types.ObjectId, ref: 'Content' }],
      searchHistory: [{ type: String }],
    
    },
    { timestamps: true }
);

const userSchema = mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
        profiles: {
            type: [profileSchema],
            default: [],
        },
        activeProfile: { type: mongoose.Schema.Types.ObjectId, default: null },

}, {timestamps: true})

const User = mongoose.model('User', userSchema)
export default User