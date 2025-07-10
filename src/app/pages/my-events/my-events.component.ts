import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html'
})
export class MyEventsComponent implements OnInit {
  events: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('/api/events/mine').subscribe(data => {
      this.events = data;
    });
  }
}
