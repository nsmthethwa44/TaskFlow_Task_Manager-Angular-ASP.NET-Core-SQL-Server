import { Component, OnInit } from '@angular/core';
import { Register } from '../../auth/register/register';
import { Login } from '../../auth/login/login';
import { Auth } from '../../auth/services/auth';
import { TaskService } from '../../services/task-service';
import { TaskItem } from '../../models/taskItem';
import { TaskCreateModal } from "../../components/task-create-modal/task-create-modal";
import { CATEGORY_COLORS } from '../../models/categories-colors';
import { CommonModule } from '@angular/common';
import { TaskStats } from '../../models/taskItem';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [Register, Login, TaskCreateModal, CommonModule, NgxChartsModule],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class Overview implements OnInit{
 isLoginVisible = false;
isRegisterVisible = false;
showCreateModal = false;
tasks: TaskItem[] = [];
selectedCategory = 'all';
categoryColors = CATEGORY_COLORS;
stats: TaskStats | null = null;
categoryStats: any[] = [];
taskOverviewStats: any[] = [];

constructor(private authSer: Auth, private taskSer: TaskService){}

ngOnInit(): void {
  this.authSer.currentUser$.subscribe(user => {
    if (user) {
      // User logged in
      this.isLoginVisible = false;
      this.loadAllTasks();   // Load tasks immediately after login
       this.loadStats();
    } else {
      // User logged out
      this.tasks = [];
    }
  });

  // Check if user was already logged in from previous session
  if (!this.authSer.isLoggedIn) {
    this.isLoginVisible = true;
  } else {
    this.loadAllTasks();
     this.loadStats();
  }
}


// if user is not logged-in, on load open this login modal form 
  openLoginForm(): any{
    if(!this.authSer.isProfileComplete){
      return this.isLoginVisible = true;
    }
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
    this.loadStats();
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

  // From login, I want to go to register
  showRegister() {
    this.isLoginVisible = false;
    this.isRegisterVisible = true;
  }

  // From register, I want to go back to login
  showLogin() {
    this.isRegisterVisible = false;
    this.isLoginVisible = true;
  }

  // Registered successfully, show login
  registrationSuccess() {
    this.isRegisterVisible = false;
    this.isLoginVisible = true;
  }

  // toggle task modal form
openCreate() {
  this.showCreateModal = !this.showCreateModal;
}

// close modal form 
closeCreate() {
  this.showCreateModal = false;
}

// stats summary color 
  colorScheme: any = {
  domain: ['#3ACF91', '#f44336', '#2196f3', '#FF7A00', '#FF3CAC']
};

view: [number, number] = [350, 250];

// stats summary 
loadStats() {
  this.taskSer.getStats().subscribe(res => {
    this.stats = res;

    // Overview (Completed vs Pending)
    this.taskOverviewStats = [
      { name: 'Completed', value: res.completed },
      { name: 'Pending', value: res.pending }
    ];

    // Category chart
    this.categoryStats = Object.entries(res.categories).map(([cat, val]) => ({
      name: cat,
      value: val
    }));
  });
}

}
