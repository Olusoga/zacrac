/* eslint-disable linebreak-style */
import { Schema } from 'mongoose';
import { IUser } from 'src/types/user';

export const userSchema = new Schema<IUser>( {
  username:     { type: String, unique: true },
  first_name:   { type: String },
  last_name:    { type: String },
  email:        { type: String,  unique: true },
  phone_number: { type: String, unique: true },
  address:      { type: String },

},
{
  timestamps: true,
  versionKey: false
}
);

userSchema.index( { username: 1 }, { unique: true } );
