import mongoose, { Schema, Document } from 'mongoose';

const KnowledgeSchema: Schema = new Schema({
    subject: {type: String, lowercase: true, trim: true, default: ''},
    inputs: {type: [String], lowercase: true, trim: true, default: []},
    key: {type: String, lowercase: true, trim: true, default: ''},
    output: {type: [String], trim: true, default: []},
    summary: {type: String, trim: true, default: ''},
    date: {type: Date, default: Date.now()},
    bot_function: {type: String, lowercase: true, trim: true, default: ''},
    calls: {type: Number, default: 0}
}, {collection: 'knowledge'});

export interface IKnowledge extends Document{
    subject: String;
    summary: String;
    inputs: [];
    output: [];
    permission: String;
    bot_function: String;
    calls: Number;
}

// Export the model and return your IUser interface
export default mongoose.model<IKnowledge>('knowledge', KnowledgeSchema);
