/* eslint-disable linebreak-style */
import { Schema } from 'mongoose';
import { IUser } from 'src/types/user';

export const userSchema = new Schema<IUser>( {
  firstname: { type: String, required: true, unique: true },
  lastname:  { type: String, required: true, unique: true },
  email:     { type: String, required: true, unique: true },

} );

userSchema.index( { firstname: 1 }, { unique: true } );
