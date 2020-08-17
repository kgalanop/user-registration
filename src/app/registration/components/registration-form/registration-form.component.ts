import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RegistrationField, RegistrationRequest } from '../../models';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationFormComponent implements OnInit {
  @Input() fields: RegistrationField[];
  @Input() loading: boolean;
  @Input() error: string;
  @Input() form: FormGroup;
  @Output() register: EventEmitter<RegistrationRequest> = new EventEmitter<RegistrationRequest>();

  constructor(
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.register.emit(this.form.value);
  }
}
