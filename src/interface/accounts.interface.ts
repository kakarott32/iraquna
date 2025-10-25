
export interface IAccount {
    name: string;
    email: string;
    password: string;
    password_show: string;
    type: IAccountType;
    auth?: IAccountAuth;
}


export type IAccountType = 'admin';


export type IAccountAuth = {
    auth_token?: string;
    auth_firebase?: string | null;
};