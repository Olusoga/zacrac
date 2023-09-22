/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-useless-constructor */
/* eslint-disable linebreak-style */
import { Model } from 'mongoose';
import { IUser } from 'src/types/user';
import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';

export interface CreateUserPayload {
  firstname: string;
  lastname: string;
  email:string
}

export class UserRepository{

  // eslint-disable-next-line no-unused-vars
  constructor( private readonly model: Model<IUser> ){}

  public async createUser( user: CreateUserPayload ): Promise<IUser>{

    return this.model.create( user );

  }

  public async isUserExist( email: string ): Promise<boolean>{

    const userCount = await this.model.count(  { email }   );

    return userCount >= 1;

  }

  public async getUser( userId: string ): Promise<IUser>{

    return this.model.findOne( { _id: userId } );

  }

  public async findUser( email: string ): Promise<IUser>{

    const user = await this.model.findOne( { email } );

    return user;

  }

  public async updateUser( query: FilterQuery<IUser>, update: UpdateQuery<IUser>, options: QueryOptions ): Promise<IUser>{

    return this.model.findOneAndUpdate( query, update, options );

  }
  public async deleteUser( existingUser: IUser ){

    return this.model.deleteOne( { _id: existingUser.id } );

  }

}
