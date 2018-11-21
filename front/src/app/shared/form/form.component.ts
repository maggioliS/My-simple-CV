import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Person } from '../interfaces/person';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'nwt-form',
  templateUrl: './form.component.html',
  styleUrls: [ './form.component.css' ]
})
export class FormComponent implements OnInit, OnChanges {
  // private property to store update mode flag
  private _isUpdateMode: boolean;
  // private property to store model value
  private _model: Person;
  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;
  // private property to store submit$ value
  private readonly _submit$: EventEmitter<Person>;
  // private property to store form value
  private readonly _form: FormGroup;

  /**
   * Component constructor
   */
  constructor() {
    this._submit$ = new EventEmitter<Person>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
  }

  /**
   * Sets private property _model
   */
  @Input()
  set model(model: Person) {
    this._model = model;
  }

  /**
   * Returns private property _model
   */
  get model(): Person {
    return this._model;
  }

  /**
   * Returns private property _form
   */
  get form(): FormGroup {
    return this._form;
  }

  /**
   * Returns private property _isUpdateMode
   */
  get isUpdateMode(): boolean {
    return this._isUpdateMode;
  }

  /**
   * Returns private property _cancel$
   */
  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  /**
   * Returns private property _submit$
   */
  @Output('submit')
  get submit$(): EventEmitter<Person> {
    return this._submit$;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Function to handle component update
   */
  ngOnChanges(record) {
    if (record.model && record.model.currentValue && record.model.currentValue.address) {
      this._model = record.model.currentValue;
      this._isUpdateMode = true;
      this._form.patchValue(this._model);
    } else {
      this._model = {
        titre: '',
        nom: '',
        prenom: '',
        email: '',
        age: 18,
        telephone: '',
        adresse: {
          postalCode: 0,
          street: '',
          city: ''
        },
        photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
        permis: false,
        vehicule: false,
        experience: {
          s1: {
            titre: '',
            date: '',
            description: ''
          },
          s2: {
            titre: '',
            date: '',
            description: ''
          },
          s3: {
            titre: '',
            date: '',
            description: ''
          },
          s4: {
            titre: '',
            date: '',
            description: ''
          },

          s5: {
            titre: '',
            date: '',
            description: ''
          },
          s6: {
            titre: '',
            date: '',
            description: ''
          },
          s7: {
            titre: '',
            date: '',
            description: ''
          },
          s8: {
            titre: '',
            date: '',
            description: ''
          },
          s9: {
            titre: '',
            date: '',
            description: ''
          },
          s10: {
            titre: '',
            date: '',
            description: ''
          }
        },
        formation: {
          s1: {
            titre: '',
            date: '',
            description: ''
          },
          s2: {
            titre: '',
            date: '',
            description: ''
          },
          s3: {
            titre: '',
            date: '',
            description: ''
          },
          s4: {
            titre: '',
            date: '',
            description: ''
          },

          s5: {
            titre: '',
            date: '',
            description: ''
          },
          s6: {
            titre: '',
            date: '',
            description: ''
          },
          s7: {
            titre: '',
            date: '',
            description: ''
          },
          s8: {
            titre: '',
            date: '',
            description: ''
          },
          s9: {
            titre: '',
            date: '',
            description: ''
          },
          s10: {
            titre: '',
            date: '',
            description: ''
          }
        },
        hobbie: {
          s1: {
            titre: '',
            date: '',
            description: ''
          },
          s2: {
            titre: '',
            date: '',
            description: ''
          },
          s3: {
            titre: '',
            date: '',
            description: ''
          },
          s4: {
            titre: '',
            date: '',
            description: ''
          },

          s5: {
            titre: '',
            date: '',
            description: ''
          },
          s6: {
            titre: '',
            date: '',
            description: ''
          },
          s7: {
            titre: '',
            date: '',
            description: ''
          },
          s8: {
            titre: '',
            date: '',
            description: ''
          },
          s9: {
            titre: '',
            date: '',
            description: ''
          },
          s10: {
            titre: '',
            date: '',
            description: ''
          }
        }
      };
      this._isUpdateMode = false;
    }
  }

  /**
   * Function to emit event to cancel process
   */
  cancel() {
    this._cancel$.emit();
  }

  /**
   * Function to emit event to submit form and person
   */
  submit(person: Person) {
    this._submit$.emit(person);
  }

  /**
   * Function to build our form
   */
  private _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl('0'),
      nom: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      prenom: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required, CustomValidators.googleEmail
      ])),
      photo: new FormControl('https://randomuser.me/api/portraits/lego/6.jpg'),
      adresse: new FormGroup({
        street: new FormControl(''),
        city: new FormControl(''),
        postalCode: new FormControl('')
      }),
      telephone: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('\\d{10}')
      ])),
    });
  }
}
