import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Overview } from './pages/overview/overview';
import { Tasks } from './pages/tasks/tasks';

export const routes: Routes = [

    {
        path: "", component: Dashboard,
        children: [
            { path: "", component: Overview},
            { path: "tasks", component: Tasks},
        ]
    }
];
