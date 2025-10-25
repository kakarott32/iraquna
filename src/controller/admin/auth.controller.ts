import Elysia, { t } from "elysia";
import mongoose from "mongoose";
import { AuthServiceDashboard } from "../../middleware/auth.middleware";
import AccountService from "../../services/account.service";
import { insertAuth } from "../../constants/jwt";
import { signTokenInJwt } from "../../constants/jwt";
const ObjectId = mongoose.Types.ObjectId.createFromHexString;

export const authController = new Elysia()
    .group("/auth", (group) =>
        group
            .post("/login", async ({ body, set }) => {
                const account = await AccountService.getOneAccountBy({
                    filter: {
                        email: body.email,
                        password: body.password,
                    }
                });

                if (!account) {
                    set.status = 404;
                    return {
                        error: true,
                        message: "الايميل او كلمة المرور غير صحيحة",
                    };
                }

                const accessToken = signTokenInJwt({
                    _id: account._id.toString(),
                    type: account.type,
                });

                insertAuth({
                    account_id: account._id.toString(),
                    auth_token: accessToken,
                    type: account.type,
                });

                return {
                    error: false,
                    message: "تم تسجيل الدخول بنجاح",
                    results: {
                        name: account.name,
                        email: account.email,
                        type: account.type,
                        token: accessToken,
                    }
                };

            }, {
                body: t.Object({
                    email: t.String({
                        error: "Email is required",
                        format: "email",
                    }),
                    password: t.String({
                        error: "Password is required",
                    }),
                })
            })

            .get("/logout", async ({ request }) => {
                const account_id = (request as any).phrase._id;

                await AccountService.updateAccountBy({
                    filter: { _id: ObjectId(account_id) },
                    update: { auth_token: null },
                });

                return {
                    error: false,
                    message: "تم تسجيل الخروج بنجاح",
                };
            }, {
                beforeHandle: AuthServiceDashboard,
            })
    )