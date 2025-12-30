import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { TaskItem } from '../../models/taskItem';
import { TaskCreateModal } from "../../components/task-create-modal/task-create-modal";
import { CATEGORY_COLORS } from '../../models/categories-colors';
import { CommonModule } from '@angular/common';
import { TaskStats } from '../../models/taskItem';

@Component({
  selector: 'app-tasks',
  imports: [TaskCreateModal, CommonModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks implements OnInit{
 isLoginVisible = false;
isRegisterVisible = false;
showCreateModal = false;
tasks: TaskItem[] = [];
selectedCategory = 'all';
categoryColors = CATEGORY_COLORS;
stats: TaskStats | null = null;
categoryStats: any[] = [];
taskOverviewStats: any[] = [];

constructor( private taskSer: TaskService){}

ngOnInit(): void {
      this.loadAllTasks();   // Load tasks immediately after login
}

  // load all tasks 
  loadAllTasks() {
    this.taskSer.getAll().subscribe(res => {
      this.tasks = res;
    });
  }

  // refresh all tasks 
  refreshTasks(){
    this.loadAllTasks();
  }

  // filter tasks by category 
  filterByCategory() {
    if (this.selectedCategory === 'all') {
      this.loadAllTasks();
      return;
    }

    this.taskSer.getByCategory(this.selectedCategory).subscribe(res => {
      this.tasks = res;
    });
  }

  // delete tasks  by id
  deleteTask(id: string) {
    this.taskSer.delete(id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
    });
    this.refreshTasks();
  }

  toggleComplete(task: TaskItem) {
    const updated = { isCompleted: !task.isCompleted };
    
    this.taskSer.update(task.id, updated).subscribe(res => {
      task.isCompleted = res.isCompleted;
       this.refreshTasks();
    });
  }


  // toggle task modal form
openCreate() {
  this.showCreateModal = !this.showCreateModal;
}

// close modal form 
closeCreate() {
  this.showCreateModal = false;
}

}
