import { Component, OnInit } from '@angular/core';
import { defaultIfEmpty, filter, flatMap, tap } from 'rxjs/operators';
import { Person } from '../shared/interfaces/person';
import { PeopleService } from '../shared/services/people.service';
import { merge } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nwt-person',
  templateUrl: './person.component.html',
  styleUrls: [ './person.component.css' ]
})
export class PersonComponent implements OnInit {
  // private property to store person value
  private _person: Person;
  // private property to store flag to know if it's a person
  private _isPerson: boolean;

  /**
   * Component constructor
   */
  constructor(private _peopleService: PeopleService, private _route: ActivatedRoute) {
    this._person = {} as Person;
    this._isPerson = false;
  }

  /**
   * Returns private property _person
   */
  get person(): Person {
    return this._person;
  }

  /**
   * Returns flag to know if we are on a profile or on HP
   */
  get isPerson(): boolean {
    return this._isPerson;
  }
  get es1(): boolean {
    return this._person.experience.s1 != null;
  }
  get es2(): boolean {
    return this._person.experience.s2 != null;
  }
  get es3(): boolean {
    return this._person.experience.s3 != null;
  }
  get es4(): boolean {
    return this._person.experience.s4 != null;
  }
  get es5(): boolean {
    return this._person.experience.s5 != null;
  }
  get es6(): boolean {
    return this._person.experience.s6 != null;
  }
  get es7(): boolean {
    return this._person.experience.s7 != null;
  }
  get es8(): boolean {
    return this._person.experience.s8 != null;
  }
  get es9(): boolean {
    return this._person.experience.s9 != null;
  }
  get es10(): boolean {
    return this._person.experience.s10 != null;
  }
  get fs1(): boolean {
    return this._person.formation.s1 != null;
  }
  get fs2(): boolean {
    return this._person.formation.s2 != null;
  }
  get fs3(): boolean {
    return this._person.formation.s3 != null;
  }
  get fs4(): boolean {
    return this._person.formation.s4 != null;
  }
  get fs5(): boolean {
    return this._person.formation.s5 != null;
  }
  get fs6(): boolean {
    return this._person.formation.s6 != null;
  }
  get fs7(): boolean {
    return this._person.formation.s7 != null;
  }
  get fs8(): boolean {
    return this._person.formation.s8 != null;
  }
  get fs9(): boolean {
    return this._person.formation.s9 != null;
  }
  get fs10(): boolean {
    return this._person.formation.s10 != null;
  }
  get hs1(): boolean {
    return this._person.hobbie.s1 != null;
  }
  get hs2(): boolean {
    return this._person.hobbie.s2 != null;
  }
  get hs3(): boolean {
    return this._person.hobbie.s3 != null;
  }
  get hs4(): boolean {
    return this._person.hobbie.s4 != null;
  }
  get hs5(): boolean {
    return this._person.hobbie.s5 != null;
  }
  get hs6(): boolean {
    return this._person.hobbie.s6 != null;
  }
  get hs7(): boolean {
    return this._person.hobbie.s7 != null;
  }
  get hs8(): boolean {
    return this._person.hobbie.s8 != null;
  }
  get hs9(): boolean {
    return this._person.hobbie.s9 != null;
  }
  get hs10(): boolean {
    return this._person.hobbie.s10 != null;
  }
  get permis(): boolean{
    return this._person.permis == true;
  }
  get vehicule(): boolean{
    return this._person.vehicule == true;
  }
  get haveNationalite(): boolean{
    return this._person.nationalite != '' ;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    merge(
      this._route.params.pipe(
        filter(params => !!params['id']),
        flatMap(params => this._peopleService.fetchOne(params['id'])),
        tap(_ => this._isPerson = true)
      )
    )
      .subscribe((person: any) => this._person = person);
  }
}
