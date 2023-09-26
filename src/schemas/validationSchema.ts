/* eslint-disable linebreak-style */
import Joi from 'joi';

export const userRegistrationSchema = Joi.object( {
  email: Joi.string()
    .email( { tlds: { allow: false } } )
    .required()
    .description( 'Email address for registration' )
    .example( 'foobar@example.com' ),
  first_name: Joi.string()
    .required()
    .description( 'Unique identifier for the user' )
    .example( 'username' ),
  last_name: Joi.string()
    .required()
    .description( 'Unique identifier for the user' )
    .example( 'username' ),
  username: Joi.string()
    .required()
    .description( 'Unique identifier for the user' )
    .example( 'username' ),
  phone_number: Joi.string()
    .required()
    .description( 'Unique identifier for the user' )
    .example( '08067903562' ),
} ).label( 'Create User' );


