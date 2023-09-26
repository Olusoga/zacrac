/* eslint-disable linebreak-style */
export interface CreateUserPayload {
    username: string;
    first_name: string;
    last_name: string;
    token:string;
    email:string;
    phone_number:string;
}


export interface CreateUserResponse {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    token:string;
    email:string;
    phone_number:string;
}

export interface UpdateUserPayload {
    id: string;
    username:string
    token:string
}
