import AccountsSchema from "../models/account.model";
import type { IAccount } from "../interface/accounts.interface";
import type { UpdateWriteOpResult } from "mongoose";



class AccountService {
    private accountsSchema = AccountsSchema;



    public async getOneAccountBy({
        filter,
    }: {
        filter: Record<string, any>;
    }) {
        const account = await this.accountsSchema.findOne(filter);
        return account;
    }

    public async updateAccountBy({
        filter,
        update,
    }: {
        filter: Record<string, any>;
        update: Record<string, any>;
    }): Promise<UpdateWriteOpResult> {
        const account = await this.accountsSchema.updateOne(filter, {
            $set: update,
        });
        return account;
    }
}


export default new AccountService();
