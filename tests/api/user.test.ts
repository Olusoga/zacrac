/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import { createApp } from 'src/app';
import request from 'supertest';

describe( 'User Controller', ()=>{

  let app: Express.Application;
  let token: string;

  beforeAll( async()=>{

    app = await createApp();

    const response = await request( app )
      .post( '/auth/register' )
      .send( {
        firstname: 'John',
        lastname:  'Doe',
        email:     'johndoe@gmail.com'
      } );

    token = response.body.token;

  } );

  describe( 'POST /user', ()=>{

    test( 'throw an error if it return error', async()=>{

      const response = await request( app )
        .post( '/user' )
        .send( {
          amount: 100
        } );

      expect( response.status ).toEqual( 500 );

    } );

    test( 'create an account', async()=>{

      const response = await request( app )
        .post( '/user' )

        .send( {
          firstname: 'John',
          lastname:  'doe',
          email:     'johndoe@gmail.com'
        } );

      expect( response.status ).toEqual( 201 );
      expect( response.body ).toHaveProperty( 'firstname' );
      expect( response.body.firstname ).toEqual( 'John' );

    } );


  } );

} );
