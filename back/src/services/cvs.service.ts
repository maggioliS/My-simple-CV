import { Biim } from '@hapiness/biim';
import { HTTPHandlerResponse, Injectable } from '@hapiness/core';

import { Observable, of, throwError } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';
import { Cv } from '../interfaces';
import { CvsDocumentService } from './cvs-document.service';

@Injectable()
export class CvsService {
    /**
     * Class constructor
     */
    constructor(private _cvsDocumentService: CvsDocumentService) {
    }

    /**
     * Returns all existing people in the list
     *
     * @returns {Observable<Person[] | void>}
     */
    listAll(): Observable<Cv[] | void> {
        return this._cvsDocumentService.find();
    }
    /**
     * Returns one people of the list matching titre in parameter
     *
     * @param {string} titre of the cv
     *
     * @returns {Observable<Cv>}
     */
    one(id: string): Observable<Cv> {
        return this._cvsDocumentService.findById(id)
            .pipe(
                catchError(e => throwError(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        throwError(Biim.notFound(`People with id '${id}' not found`))
                )
            );
    }


    /**
     * Check if person already exists and add it in people list
     *
     * @param person to create
     *
     * @returns {Observable<HTTPHandlerResponse>}
     */
    create(cv: Cv): Observable<HTTPHandlerResponse> {
        return this._addCv(cv)
            .pipe(
                flatMap(_ => this._cvsDocumentService.create(_)),
                catchError(e =>
                    e.code = 11000 ?
                        throwError(
                            Biim.conflict(`CV with titre'${cv.titre} already exists`)
                        ) :
                        throwError(Biim.preconditionFailed(e.message))
                ),
                map(_ => ({ response: _, statusCode: 201 }))
            );
    }
    /**
     * Add person with good data in people list
     *
     * @param person to add
     *
     * @returns {Observable<any>}
     *
     * @private
     */
    private _addCv(cv: Cv): Observable<any> {
        return of(cv)
            .pipe(
                map(_ => _ )
            );
    }
    /**
     * Update a person in people list
     *
     * @param {string} id of the person to update
     * @param {Person} person data to update
     *
     * @returns {Observable<Person>}
     */
    update(id: string, cv: Cv): Observable<Cv> {
        return this._cvsDocumentService.findByIdAndUpdate(id, cv)
            .pipe(
                catchError(e =>
                    e.code = 11000 ?
                        throwError(
                            Biim.conflict(`cv with title'${cv.id}' already exists`)
                        ) :
                        throwError(Biim.preconditionFailed(e.message))
                ),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        throwError(Biim.notFound(`cv with title '${id}' not found`))
                )
            );
    }

    /**
     * Deletes one person in people list
     *
     * @param {string} id of the person to delete
     *
     * @returns {Observable<void>}
     */
    delete(id: string): Observable<void> {
        return this._cvsDocumentService.findByIdAndRemove(id)
            .pipe(
                catchError(e => throwError(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(undefined) :
                        throwError(Biim.notFound(`Cv with title '${id}' not found`))
                )
            );
    }


}
