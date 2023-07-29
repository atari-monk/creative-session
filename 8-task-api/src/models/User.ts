import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from './IUser';

const typeName = 'User';

const userSchema: Schema<IUser> = new Schema<IUser>({
  email: { type: String, required: true },
  maxRecords: { type: Number, required: true, default: 500 },
});

export const User: Model<IUser> = mongoose.model<IUser>(typeName, userSchema);

export default User;
