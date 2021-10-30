import { RoleType } from "@app/models";

export interface RemoteAccount {
    name: string;
    login: string;
    password: string;    
    confirmPassword: string;
    phoneNumber: string;    
    role: RoleType;
    roleName: string;
}