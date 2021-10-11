import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorJSON = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            type: exception instanceof HttpException ? exception.getResponse()['type'] : null,
            message: Array.isArray(exception?.response?.message)
                ? exception.response.message
                : status === HttpStatus.INTERNAL_SERVER_ERROR
                    ? 'Internal Server Error'
                    : (<HttpException>exception).getResponse()
        };

        const IP = request.ip || request.headers['x-forwarded-for'];

        console.error(`EXCEPTION CAUGHT [ ${IP} ] >>>>>>>>>>>>>>>>`, exception);
        console.dir(exception, { depth: null })

        response.status(status).json(errorJSON);
    }
}