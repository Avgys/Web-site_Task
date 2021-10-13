export interface User {
    id?: number;
    name: string;
    login: string;
    password: string;    
    confirmPassword: string;
    phoneNumber: string;    
    RoleId?: number;
    // token: string;
}

// export interface regUser{
//     Name: string;
//     login: string;
//     password: string;
//     confirmPassword: string;
// }