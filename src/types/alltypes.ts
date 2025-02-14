export type TUser ={
    name: string;
    email: string;
    password: string;
  }

  // Define the type for the registration response
export type  TRegisterResponse = {
    message: string;
    userId: string;
  }


  // Define the type for the sign-in request payload
export type TSignInRequest ={
    email: string;
    password: string;
  }
  
  // Define the type for the sign-in response
  export type TSignInResponse = {
    message: string;
    token: string;
    userId: string;
  }