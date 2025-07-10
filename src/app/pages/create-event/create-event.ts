import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  event = {
    title: '',
    description: '',
    date: '',
    categories: [] as string[]
  };

  allCategories = ['Music', 'Tech', 'Sports', 'Food'];

  constructor(private http: HttpClient, private router: Router) {}

  toggleCategory(category: string, event: any) {
    if (event.target.checked) {
      this.event.categories.push(category);
    } else {
      this.event.categories = this.event.categories.filter(c => c !== category);
    }
  }

  submit() {
    this.http.post('https://localhost:5001/api/events', this.event)
      .subscribe(() => {
        alert('Event created!');
        this.router.navigate(['/my-events']);
      });
  }
}
