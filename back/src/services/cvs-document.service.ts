import { Injectable } from '@hapiness/core';
import { MongoClientService } from '@hapiness/mongo';
import { MongooseDocument } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cv } from '../interfaces';
import { CvModel } from '../models/cvs';

@Injectable()
export class CvsDocumentService {
    // private property to store document instance
    private _document: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        this._document = this._mongoClientService.getModel({ adapter: 'mongoose' }, CvModel);
    }

    /**
     * Call mongoose method, call toJSON on each result and returns Person[] or undefined
     *
     * @return {Observable<Person[] | void>}
     */
    find(): Observable<Cv[] | void> {
        return from(this._document.find({}))
            .pipe(
                map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined)
            );
    }

    /**
     * Returns one person of the list matching id in parameter
     *
     * @param {string} id of the person in the db
     *
     * @return {Observable<Person | void>}
     */
    findById(id: string): Observable<Cv | void> {
        return from(this._document.findById(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            );
    }


    /**
     * Check if person already exists with index and add it in people list
     *
     * @param {Person} person to create
     *
     * @return {Observable<Person>}
     */
    create(person: Cv): Observable<Cv> {
        return from(this._document.create(person))
            .pipe(
                map((doc: MongooseDocument) => doc.toJSON())
            );
    }


    /**
     * Update a person in people list
     *
     * @param {string} id
     * @param {Person} person
     *
     * @return {Observable<Person | void>}
     */
    findByIdAndUpdate(id: string, cv: Cv): Observable<Cv | void> {
        return from(this._document.findByIdAndUpdate(id, cv, { new: true }))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            );
    }

    /**
     * Delete a person in people list
     *
     * @param {string} id
     *
     * @return {Observable<Person | void>}
     */
    findByIdAndRemove(id: string): Observable<Cv | void> {
        return from(this._document.findByIdAndRemove(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            )
    }
}
