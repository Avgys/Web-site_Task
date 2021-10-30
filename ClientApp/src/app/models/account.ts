import { RoleType } from "@app/models";

export interface Account {
    name: string;
    login: string;
    phoneNumber: string;    
    role: RoleType;
}