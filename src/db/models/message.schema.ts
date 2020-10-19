import mongoose, { Schema, Document } from 'mongoose';

const MessageSchema: Schema = new Schema({
    _id: {type: String, trim: true, default:''},
    messages: {type: [], trim: true, default:[]},
}, {collection: 'messenger'});

export interface IMessenger extends Document{
    _id: String;
    messages: [{}]
}

// Export the model and return your IUser interface
export default mongoose.model<IMessenger>('messenger', MessageSchema);
