import CustomAPIError from "./custom-api.js"
import { StatusCodes } from "http-status-codes/build/cjs/status-codes.js"; 
class NotFoundError extends CustomAPIError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    } 
}

export default NotFoundError