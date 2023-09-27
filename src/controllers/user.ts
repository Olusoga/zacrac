import { NextFunction, Request, Response, Router } from 'express';
import { UserService } from 'src/services/user';
import RedisClient from 'src/redis';
import { validateCreateUser } from 'src/middlewares/validation';

interface UserControllerOptions {
    userService: UserService;
}

export class UserController{

  private router: Router;

  // eslint-disable-next-line no-unused-vars
  constructor( private readonly options: UserControllerOptions ){

    this.router = Router();
    this.router.post( '/', validateCreateUser, this.createUser.bind( this ) );
    this.router.get( '/', this.findAllUsers.bind( this ) );
    this.router.get( '/:userId', this.getAsingleUser.bind( this ) );
    this.router.put( '/:userId', this.update.bind( this ) );
    this.router.delete( '/:userId', this.delete.bind( this ) );

  }

  getRouter(): Router{

    return this.router;

  }

  public async createUser( req: Request, res: Response, next: NextFunction ): Promise<Response | void> {

    try{

      const data = req.body
      const response = await this.options.userService.createUser( data )

      return res.status( 201 ).json( response );

    } catch( error ){

      return next( error );

    }
  }

  public async getAsingleUser( req: Request, res: Response, next: NextFunction ): Promise<Response | void> {
     
    try {

      const userId = req.params.userId

      const redisKey = `user:${userId}`;

       // Check if the post data is already cached in Redis
       const cachedData = await RedisClient.get(redisKey);
 
       if (cachedData) {
         // If data exists in cache, return it directly
         
         return res.status(200).json(JSON.parse(cachedData));

       }

      const response = await this.options.userService.getUserById(req.params.userId)

      // Store the fetched user data in Redis cache with an expiration (e.g., 1 hour)
      await RedisClient.setex(redisKey, 3600, JSON.stringify(response))

      return res.status( 200 ).json( response );
      
    } catch (error) {
      
      return next( error );

    }

  }

  public async findAllUsers( req: Request, res: Response, next: NextFunction ): Promise<Response | void>{

    try{

      const response = await this.options.userService.findAllUser();

      return res.status( 201 ).json( response );

    } catch( error ){

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
