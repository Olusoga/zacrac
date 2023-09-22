/* eslint-disable linebreak-style */
import Joi from 'joi';

export const userRegistrationSchema = Joi.object( {
  email: Joi.string()
    .email( { tlds: { allow: false } } )
    .required()
    .description( 'Email address for registration' )
    .example( 'foobar@example.com' ),
  firstname: Joi.string()
    .required()
    .description( 'Unique identifier for the user' )
    .example( 'username' ),
  lastname: Joi.string()
    .required()
    .description( 'Unique identifier for the user' )
    .example( 'username' ),
} ).label( 'Create User' );


