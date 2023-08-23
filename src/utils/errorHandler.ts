import { Code } from "../enum/code.enum";
import { Status } from "../enum/status.enum";

interface AppErrorArgs {
    name?: string;
    statusCode: Code;
    httpStatus: Status;
    message: string;
    isOperational?: boolean;
}

export class ErrorHandler extends Error {
    public readonly name: string;
    public statusCode: Code;
    public httpStatus: Status;
    public readonly isOperational: boolean = true;

    constructor(args: AppErrorArgs) {
        super(args.message);

        Object.setPrototypeOf(this, new.target.prototype);

        this.name = args.name || "Error";
        this.statusCode = args.statusCode;
        this.httpStatus = args.httpStatus;

        if (args.isOperational !== undefined) {
            this.isOperational = args.isOperational;
        }

        Error.captureStackTrace(this);
    }
}
