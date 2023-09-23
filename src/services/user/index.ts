/* eslint-disable linebreak-style */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import { ErrorCodes } from 'src/libs/errors';
import { StandardError } from 'src/libs/standard-error';
import { UserRepository } from 'src/repositories/user';
import { CreateUserPayload, CreateUserResponse } from './types';
import { logger } from 'src/libs/logger';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import { JWT_TOKEN_SECRET } from 'src/configs/app';
import CONSTANTS from 'src/constants';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { IUser } from 'src/types/user';

interface UserServiceOptions {
    userRepository: UserRepository;
}

export class UserService{

  constructor( private readonly options: UserServiceOptions ){}

  public async createUser( createUserPayload: CreateUserPayload ): Promise<CreateUserResponse>{

    const { email,  } = createUserPayload;

    if( await this.options.userRepository.isUserExist( email ) ){

      logger.info( { email }, 'This email already exists in the database' );
      throw new StandardError( ErrorCodes.DUPLICATE_END_USER, 'username already registered' );

    }

    const user = await this.options.userRepository.createUser({
      ...createUserPayload
  });

    const token = await this.createAccessToken( user.id, email);

    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token
  };

  }

  public async findAllUser() {

    return await this.options.userRepository.findAllUsers()
  }

  public async getUserById(id: string) {

    const user = await this.options.userRepository.getUser(id)
    if(!user) throw new StandardError( ErrorCodes.USER_NOT_FOUND, 'User does not exist' );
    return user;
  }

  public async delete( userId: string ){

    const existinguser = await this.options.userRepository.getUser( userId );
    if( !existinguser ) throw new StandardError( ErrorCodes.USER_NOT_FOUND, 'User does not exist' );
    return this.options.userRepository.deleteUser( existinguser );

  }

  public async update(  query: FilterQuery<IUser>,
    update: UpdateQuery<IUser>,
    options: QueryOptions){

    return this.options.userRepository.updateUser(query, update, options)

  }

  private async createAccessToken(userId: string, email:string): Promise<string> {
    const expiryTime = moment().add(CONSTANTS.moment.THIRTY, 'minutes');
      const userPayload = { userId, email };
      const token = jwt.sign(userPayload, "my-secret", {
          expiresIn: expiryTime.diff(moment(), 'seconds')
      });
      return token;
  }

}
