export interface LoginFormValues {
  email: string;
  password: string;
}

export interface User {
  displayName: string;
  token: string;
  username: string;
  image: string;
}

export interface RegisterForm {
  displayName: string;
  email: string;
  password: string;
  username: string;
}

export interface VerifyEmail {
  token: string;
  email: string;
}