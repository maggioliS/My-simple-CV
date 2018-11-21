import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { filter, flatMap } from 'rxjs/operators';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { Person } from '../shared/interfaces/person';
import { PeopleService } from '../shared/services/people.service';
import { Router } from '@angular/router';

@Component({
  selector: 'nwt-people',
  templateUrl: './people.component.html',
  styleUrls: [ './people.component.css' ]
})
export class PeopleComponent implements OnInit {
  // private property to store people value
  private _people: Person[];
  // private property to store dialogStatus value
  private _dialogStatus: string;
  // private property to store dialog reference
  private _peopleDialog: MatDialogRef<DialogComponent>;
  // private property to store view value
  private _view: string;

  /**
   * Component constructor
   */
  constructor(private _router: Router, private _peopleService: PeopleService, private _dialog: MatDialog) {
    this._people = [];
    this._dialogStatus = 'inactive';
    this._view = 'card';
  }

  /**
   * Returns private property _people
   */
  get people(): Person[] {
    return this._people;
  }

  /**
   * Returns private property _dialogStatus
   */
  get dialogStatus(): string {
    return this._dialogStatus;
  }

  /**
   * Returns private property _view
   */
  get view(): string {
    return this._view;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._peopleService
      .fetch().subscribe((people: Person[]) => this._people = people);
  }

  /**
   * Function to delete one person
   */
  delete(person: Person) {
    this._peopleService
      .delete(person.id)
      .subscribe(_ => this._people = this._people.filter(__ => __.id !== _));
  }

  /**
   * Function to display modal
   */
  showDialog() {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._peopleDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._peopleDialog.afterClosed()
      .pipe(
        filter(_ => !!_),
        flatMap(_ => this._add(_))
      )
      .subscribe(
        (people: Person[]) => this._people = people,
        _ => this._dialogStatus = 'inactive',
        () => this._dialogStatus = 'inactive'
      );
  }

  /**
   * Function to navigate to current person
   */
  navigate(person: Person) {
    this._router.navigate([ '/person', person.id ]);
  }

  /**
   * Add new person and fetch all people to refresh the list
   */
  private _add(person: Person): Observable<Person[]> {
    return this._peopleService
      .create(person)
      .pipe(
        flatMap(_ => this._peopleService.fetch())
      );
  }
}
