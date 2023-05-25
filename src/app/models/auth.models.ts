export class RegisterRequest{
    email: String;
    username: String;
    password: String;
}

export class LoginRequest {
    usercred : string;
    password : string;
}

export class LoginResponse{
    expiresAt: Date;
    mail : string;
}