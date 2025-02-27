import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: 'task-list.component.html'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        // Assuming tasks should be sorted by due date ascending
        this.tasks = data.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      },
      error: (err) => console.error(err)
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error(err)
    });
  }
}
