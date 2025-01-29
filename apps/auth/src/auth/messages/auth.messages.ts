export enum AuthMessage {
  EXPIRED_CODE = 'This verification code has expired, please try again later',
  INVALID_OTP_CODE = 'this code is invalid, check your code and try again',
  WAIT_FOR_EXPIRE = 'you cannot request code, please wait until the last code expires',
}

export enum ServerMessages {
  SERVICE_UNAVAILABLE = 'this service temporarily unavailable'
}

export enum LoginMessage { 
  INVALID_CREDENTIALS = 'Invalid Credentials',
  LOGIN_SUCCESSFULLY = 'Login Successful',
}

export enum LogOutMessage {
  LOGOUT_SUCCESSFULLY = 'Logout Successful',
}
