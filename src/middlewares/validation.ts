/* eslint-disable linebreak-style */
import { Request, Response, NextFunction } from 'express';
import {   userRegistrationSchema  } from 'src/schemas/validationSchema';


export const validateCreateUser = ( req: Request, res: Response, next: NextFunction )=>{

  const { error } = userRegistrationSchema.validate( req.body );

  if( error ){

    return res.status( 400 ).json( { error: error.details[ 0 ].message } );

  }
  next();

};

