import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from './services/user-service.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    FloatLabelModule,
    RadioButtonModule,
    ToastModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService],
})
export class AppComponent {
  private messageService = inject(MessageService);
  userForm!: FormGroup;
  details!: FormGroup;
  fields = [
    {
      label: 'Customer Name',
      type: 'text',
      controlName: 'name',
      validators: ['required'],
    },
    {
      label: 'Phone Number',
      type: 'text',
      controlName: 'pnumber',
      validators: ['required'],
    },
    {
      label: 'Model',
      type: 'text',
      controlName: 'model',
      validators: ['required'],
    },
    {
      label: 'Executive Name',
      type: 'text',
      controlName: 'eName',
      validators: ['required'],
    },
    {
      label: 'Executive ID',
      type: 'text',
      controlName: 'eID',
      validators: [],
    },
    {
      label: 'Team Lead Name',
      type: 'text',
      controlName: 'tName',
      validators: ['required'],
    },
    {
      label: 'Branch',
      type: 'text',
      controlName: 'bName',
      validators: ['required'],
    },
    {
      label: 'Source of Contact',
      type: 'text',
      controlName: 'reason',
      validators: ['required'],
    },
    {
      label: 'Test Drive',
      type: 'radio',
      controlName: 'testDrive',
      option: ['YES', 'NO'],
      validators: ['required'],
    },
    {
      label: 'Remark',
      type: 'text',
      controlName: 'remark',
      validators: ['required'],
    },
  ];
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private userService: UserServiceService,
  ) {}

  ngOnInit() {
    let controls: any = {};
    this.fields.forEach((field) => {
      controls[field.controlName] = ['', this.mapValidators(field.validators)];
    });
    this.details = this.fb.group(controls);
    this.userForm = this.fb.group({
      name: [''],
      phoneNumber: [''],
      reasonForVisit: [''],
    });
  }
  mapValidators(validators: string[]) {
    const validatorArray = [];

    if (validators.includes('required')) {
      validatorArray.push(Validators.required);
    }

    return validatorArray;
  }
  submit() {
    if (this.details.invalid) {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Please fill the details',
      });
    } else {
      this.userService.addUserDetails(this.details.value).subscribe({
        next: (data: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: data.msg,
          });
          this.details.reset();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Something went wrong.',
          });
        },
      });
      console.log(this.userForm.value);
    }
  }
  exportUserDetails() {
    this.userService.exportUserDetails().subscribe({
      next: (response: any) => {
        const blob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');

        a.href = url;

        a.download = 'users.xlsx';

        a.click();

        window.URL.revokeObjectURL(url);
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Downloading...',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Something went wrong.',
        });
      },
    });
  }
}
