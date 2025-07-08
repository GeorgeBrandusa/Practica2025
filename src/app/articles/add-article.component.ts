import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, addDoc, collection, Timestamp } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-article',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent {
  title = '';
  content = '';
  imageUrl = '';
  errorMessage = '';

  private firestore = inject(Firestore);
  private router = inject(Router);

  async addArticle() {
    if (!this.title || !this.content) {
      this.errorMessage = 'Titlul și conținutul sunt obligatorii.';
      return;
    }

    try {
      await addDoc(collection(this.firestore, 'articles'), {
        title: this.title,
        content: this.content,
        imageUrl: this.imageUrl,
        timestamp: Timestamp.now()
      });
      this.router.navigate(['/news']);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}
