export interface AuthRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  email: string;
  role: string;
}

export interface LoginResponse {
  email: string;
  role: string;
  token: string;
}

export enum AuthForm {
  email = 'email',
  password = 'password'
}

export enum Role {
  ADMIN='ROLE_ADMIN',
  STAFF='ROLE_STAFF',
  CUSTOMER='ROLE_CUSTOMER',
}
