import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface NewsArticle {
  id?: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class NewsService {
  private firestore = inject(Firestore);
  private articlesRef = collection(this.firestore, 'articles');

  // ✅ Obține toate articolele
  getArticles(): Observable<NewsArticle[]> {
    return collectionData(this.articlesRef, { idField: 'id' }) as Observable<NewsArticle[]>;
  }

  // ✅ Adaugă un articol nou
  addArticle(article: Omit<NewsArticle, 'id'>): Promise<DocumentReference> {
    return addDoc(this.articlesRef, article);
  }

  // ✅ Șterge un articol după ID
  deleteArticle(id: string): Promise<void> {
    const docRef = doc(this.firestore, `articles/${id}`);
    return deleteDoc(docRef);
  }

  // ✅ Obține un articol după ID (opțional)
  getArticleById(id: string): Promise<NewsArticle | null> {
    const docRef = doc(this.firestore, `articles/${id}`);
    return getDoc(docRef).then((snapshot) => {
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as NewsArticle;
      }
      return null;
    });
  }
}
