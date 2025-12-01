import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class RpcExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(RpcExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        this.logger.error(`Exception caught in Gateway: ${JSON.stringify(exception)}`);

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message;
            const res: any = exception.getResponse();
            if (typeof res === 'object' && res.message) {
                message = res.message;
            }
        } else if (exception && typeof exception === 'object') {
            // Handle the specific error object from microservices
            if (exception.status && exception.message) {
                status = typeof exception.status === 'number' ? exception.status : HttpStatus.INTERNAL_SERVER_ERROR;
                message = exception.message;
            } else if (exception.message) {
                message = exception.message;
            }
        }

        response
            .status(status)
            .json({
                statusCode: status,
                message: message,
                timestamp: new Date().toISOString(),
            });
    }
}
