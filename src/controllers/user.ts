import { NextFunction, Request, Response, Router } from 'express';
import { UserService } from 'src/services/user';
import { get } from 'lodash';
import  handleTokenAuthorization  from 'src/middlewares/handle-token-authorization';
import { ErrorCodes } from 'src/libs/errors';
import { validateUserCreation } from 'src/middlewares/validation';


interface UserControllerOptions {
    userService: UserService;
}

export class UserController{

  private router: Router;

  // eslint-disable-next-line no-unused-vars
  constructor( private readonly options: UserControllerOptions ){

    this.router = Router();
    this.router.post( '/', validateUserCreation, this.createUser.bind( this ) );
    this.router.get( '/:userId', this.getAsingleUser.bind( this ) );
    this.router.put( '/:userId', this.update.bind( this ) );
    this.router.delete( '/:userId', this.delete.bind( this ) );

  }

  getRouter(): Router{

    return this.router;

  }

  public async createUser( req: Request, res: Response, next: NextFunction ): Promise<Response | void> {

    try{

      const user = req.body
      const response = await this.options.userService.createUser( user)

      return res.status( 201 ).json( response );

    } catch( error ){

      return next( error );

    }
  }

  public async getAsingleUser( req: Request, res: Response, next: NextFunction ): Promise<Response | void> {
     
    try {

      const response = await this.options.userService.getUserById(req.params.userId)

      return res.status( 200 ).json( response );
      
    } catch (error) {
      
      return next( error );

    }

  }

  public async update( req: Request, res: Response, next: NextFunction ): Promise<Response | void>{

    try{
      const userId = req.params.userId
      const updatedField =req.body

      const response = await this.options.userService.update({ _id: userId }, updatedField, { new: true } );

      return res.status( 200 ).json( response );

    } catch (error) {
      
      return next( error );

    }

  }


  public async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {

    try {


      const user = await this.options.userService.delete(req.params.userId);

      return res.status(200).json(user);

    } catch (error) {

      return next(error);

    }

  }

}
