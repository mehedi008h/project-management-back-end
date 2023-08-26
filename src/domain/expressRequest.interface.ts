import { Request } from "express";
import { IUser } from "./user";

export interface ExpressRequest extends Request {
    user?: IUser | any;
}
