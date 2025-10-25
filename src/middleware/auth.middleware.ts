import { verifyTokenInJwt } from '../constants/jwt';
import jwt from 'jsonwebtoken';
import AccountService from "../services/account.service";
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId.createFromHexString;

// ✅ Do
export const AuthService = async ({ request, headers, set }: any) => {
    const auth = headers.authorization;
    if (!auth || auth === 'null' || auth === 'undefined' || auth.length === 0) {
        set.status = 401;
        return ({
            error: true,
            message: "Authorization is required",
        });
    }
    const bearer = verifyTokenInJwt(auth);
    if (!bearer) {
        set.status = 401;
        return ({
            error: true,
            message: "Authorization is required",
        });
    }
    const isAccountHaveAuthInstance = await isAccountHaveAuth(auth)

    if (!isAccountHaveAuthInstance) {
        set.status = 401;
        return ({
            error: true,
            message: "Authorization is required",
        });
    }
    request.phrase = bearer
}

export const AuthServiceDashboard = async ({ request, headers, set }: any) => {
    const auth = headers.authorization;
    if (!auth) {
        set.status = 401;
        return ({
            error: true,
            message: "Authorization is required",
        });
    }
    const bearer = verifyTokenInJwt(auth);
    if (!bearer) {
        set.status = 401;
        return ({
            error: true,
            message: "Authorization is required",
        });
    }

    request.phrase = bearer
}

export const AuthServiceNotForce = async ({ request, headers }: any) => {
    const auth = headers.authorization;

    if (!auth || auth === 'null' || auth === 'undefined' || auth.length === 0) {
        request.phrase = null;
        return;
    }

    request.phrase = verifyTokenInJwt(auth);
}

async function isAccountHaveAuth(
    token: string,
): Promise<boolean> {
    const user: any = jwt.decode(token);
    if (!user) return false;
    const _id = user._id;

    const resultsDB = await AccountService.getOneAccountBy({
        filter: {
            _id: ObjectId(_id),
            'auth.auth_token': token,
        }
    });

    if (!resultsDB) return false;
    return true;

}


