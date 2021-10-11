export interface User {
    id: number;
    name: string;
    login: string;
    passhash: string;
    isConfirmed: boolean;
    phoneNumber: string;
    cardNumber: string;
  }