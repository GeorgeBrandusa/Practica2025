import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Timestamp } from 'firebase/firestore';
import { RouterModule } from '@angular/router'; // ✅ pentru routerLink
import { AuthService } from '../services/auth.service'; // ✅ ajustează path-ul dacă e nevoie

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  timestamp?: Timestamp;
}

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent {
  private firestore = inject(Firestore);
  public authService = inject(AuthService); // ✅ accesibil din HTML

  articles$: Observable<NewsArticle[]>;

  constructor() {
    const articlesRef = collection(this.firestore, 'articles');
    this.articles$ = collectionData(articlesRef, { idField: 'id' }) as Observable<NewsArticle[]>;
  }
}
