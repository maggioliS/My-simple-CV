import { Config } from '@hapiness/config';
import { HapinessModule, HttpServerService, OnError, OnStart } from '@hapiness/core';
import { LoggerModule, LoggerService } from '@hapiness/logger';
import { MongoClientService, MongoModule } from '@hapiness/mongo';
import { SwagModule } from '@hapiness/swag';
import { Observable } from 'rxjs';
import { CvsService, CvsDocumentService } from './services';
import {GetAllCvsRoute, GetOneCvRoute} from './routes/cvs/get';
import {PutUpdateCvRoute} from './routes/cvs/put';
import {DeleteOneCvRoute} from './routes/cvs/delete';
import {PostCreateCvRoute} from './routes/cvs/post';
import {CvModel} from './models/cvs';

// factory to declare dependency between PeopleDocumentService and MongoClientService
// we use it to be sure that MongoClientService will be loaded before PeopleDocumentService
const cvsDocumentServiceFactory = (mongoClientService: MongoClientService) => new CvsDocumentService(mongoClientService);

@HapinessModule({
    version: '1.0.0',
    imports: [
        LoggerModule,
        SwagModule.setConfig(Config.get('swag')),
        MongoModule
    ],
    declarations: [
        GetOneCvRoute,
        GetAllCvsRoute,
        PutUpdateCvRoute,
        DeleteOneCvRoute,
        PostCreateCvRoute,
        CvModel
    ],
    providers: [
        HttpServerService,
        CvsService,
        { provide: CvsDocumentService, useFactory: cvsDocumentServiceFactory, deps: [ MongoClientService ] }
    ]
})
export class ApplicationModule implements OnStart, OnError {
    /**
     * Class constructor
     *
     * @param _httpServer
     * @param {LoggerService} _logger
     */
    constructor(private _httpServer: HttpServerService, private _logger: LoggerService) {
    }

    /**
     * On start process
     *
     * @return {void | Observable<any>}
     */
    onStart(): void | Observable<any> {
        this._logger.info(`< Application.bootstrap > Server started at: ${this._httpServer.instance().info.uri}`);
    }

    /**
     * On error process
     *
     * @param {Error} error
     * @param data
     *
     * @return {void | Observable<any>}
     */
    onError(error: Error, data?: any): void | Observable<any> {
        this._logger.error('A problem occurred during application\'s lifecycle');
    }
}
