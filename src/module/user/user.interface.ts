export interface RegisterUserRequest {
    id: string;
    name: string;
    email: string;
    password: string;
    profilePhoto?: string;
}