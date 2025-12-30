export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  dueDate?: string;
  category: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  categories: { [key: string]: number };
}
