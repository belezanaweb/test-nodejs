import ServiceError from './errors/serviceError';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import router from './routes/router';

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();        
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());

        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));

        //call express router
        this.app.use('/api/', router);

        // catch 404 and forward to error handler
        this.app.use(function(req, res, next) {
            throw new ServiceError('Not Found', 404);
            res.status(404).json('Not found');
        });
  
        // error handler
        this.app.use(function(err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
        
            // render the error page
            res.status(err.status || 500);
        
            let error_response = {
                message : res.locals.message,
                http_code : err.status,
                error : true,
                url : req.url
            }

            res.json(error_response);

        });
  
    }

}

export default new App().app;