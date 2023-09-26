/* eslint-disable linebreak-style */
export interface CreateUserPayload {
    username: string;
    first_name: string;
    last_name: string;
    token:string;
    email:string;
    phone_number:string;
    address:string
}


export interface CreateUserResponse {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    token:string;
    email:string;
    phone_number:string;
    address:string;
}

export interface UpdateUserPayload {
    username: string;
    first_name: string;
    last_name: string;
    email:string;
    phone_number:string;
    address:string;

}
