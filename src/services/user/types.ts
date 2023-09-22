/* eslint-disable linebreak-style */
export interface CreateUserPayload {
    firstname: string;
    lastname: string;
    token:string;
    email:string;
}


export interface CreateUserResponse {
    id: string;
    firstname:string;
    lastname:string;
    email:string;
    token:string;
}

export interface UpdateUserPayload {
    id: string;
    username:string
    token:string
}
