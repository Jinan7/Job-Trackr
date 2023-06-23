import CustomAPIError from "./custom-api.js"
import { StatusCodes } from "http-status-codes/build/cjs/status-codes.js";
class BadRequestError extends CustomAPIError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    } 
}

export default BadRequestError