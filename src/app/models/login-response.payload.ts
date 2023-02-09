export interface LoginResponse{
    authToken : string,
    refreshToken : string,
    expiresAt: Date,
    mail : string
}