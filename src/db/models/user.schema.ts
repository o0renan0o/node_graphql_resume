import mongoose, { Schema, Document } from 'mongoose';

const UserSchema: Schema = new Schema({
        name: {type: String, trim: true, default:''},
        email: {type: String, required: true, trim: true, default:''},
        password: {type: String, required: true, trim: true, default:''},
        permission: {type: String, required: true, trim: true, default:''},
        created: {type: Date, trim: true, default: Date.now()}
    }, {collection: 'users'});

export interface IUser extends Document{
        name: String;
        email: String;
        password: String;
        permission: String
}

// Export the model and return your IUser interface
export default mongoose.model<IUser>('users', UserSchema);

