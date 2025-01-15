export interface LoginDto {
    userName: string;
    password: string;
  }
  
  export interface RegistrationDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  
  export interface TokenResponse {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    token: string;
  }