import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES: any = {
  required: 'Не должно быть пустым',
  email: 'Эл. почта некорректна',
  minlength: 'Недостаточная длина поля',
  maxLength: 'Слишком много символов',
  notMatch: 'Пароли не совпадают',
};

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.scss'],
})
export class InputValidationComponent implements OnInit, OnChanges {
  @Input()
  control!: AbstractControl;
  @Input()
  showErrorsWhen: boolean = true;
  errorMessages: string[] = [];

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    });
  }

  checkValidation() {
    const errors = this.control.errors;
    if (!errors) {
      this.errorMessages = [];
      return;
    }
    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map((key) => VALIDATORS_MESSAGES[key]);
  }
}
