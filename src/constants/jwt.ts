import type { IAccountType } from "../interface/accounts.interface";
import jwt from "jsonwebtoken";
import AccountService from "../services/account.service";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId.createFromHexString;

export function signTokenInJwt(data: {
    _id: string,
    type: string,
}) {
    const accessToken = jwt.sign({
        _id: data._id,
        type: data.type,
    },
        process.env.ACCESS_TOKEN_SECRET!
    );

    return accessToken;
}

export async function insertAuth(
    {
        account_id,
        auth_token,
        auth_firebase,
        type,
    }: {
        account_id: string,
        auth_token: string,
        auth_firebase?: string,
        type: IAccountType,
    }
): Promise<void> {

    await AccountService.updateAccountBy({
        filter: {
            _id: ObjectId(account_id),
        },
        update: {
            auth_token,
            ...(auth_firebase && { auth_firebase }),
        }
    });
}

export function verifyTokenInJwt(token: string) {
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        return decoded;
    } catch (error) {
        return null;
    }
}
