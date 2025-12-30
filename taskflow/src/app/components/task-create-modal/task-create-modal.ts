import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskItem } from '../../models/taskItem';
import { TaskService } from '../../services/task-service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-create-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-create-modal.html',
  styleUrl: './task-create-modal.scss',
})
export class TaskCreateModal {
  form!: FormGroup;
  @Input() isVisible = false;
   @Output() taskSuccess = new EventEmitter<void>();

onClose() {
  this.isVisible = false;
}

   constructor(private fb: FormBuilder, private taskSer: TaskService) {
    this.form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    dueDate: [''],
    category: ['', Validators.required], // static category string
  });
  }

  submit() {
    if (this.form.invalid) return;

       Swal.fire({
          title: 'Creating New Task...',
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading()
        });

        const data = this.form.value;
        console.log(data)
    this.taskSer.create(data).subscribe({
      next: (res) =>{
          Swal.fire({
            icon: 'success',
            title: 'Task Successfully Created',
            text: 'You have successfully created new task.',
            timer: 1800,
            showConfirmButton: false
          });
       this.onClose();
       this.taskSuccess.emit();
      },
      error: (err) =>{
          setTimeout(() => {
            Swal.fire({
            icon: 'error',
            title: 'New Task failed',
            text: 'Failed to create new task.',
            timer: 1800,
            showConfirmButton: false
          });
            }, 3000); // Hide after 3s
        console.log(err)
      }
    });
  }
}
