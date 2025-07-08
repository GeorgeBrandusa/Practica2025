import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
  title = '';
  content = '';
  message = '';
  articleId = '';

  private firestore = inject(Firestore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  async ngOnInit() {
    this.articleId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.articleId) {
      this.message = 'ID invalid.';
      return;
    }

    const docRef = doc(this.firestore, 'articles', this.articleId);
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
      this.message = 'Articolul nu a fost găsit.';
      return;
    }

    const data = snap.data() as any;
    this.title = data.title;
    this.content = data.content;
  }

  async saveChanges() {
    try {
      const docRef = doc(this.firestore, 'articles', this.articleId);
      await updateDoc(docRef, {
        title: this.title,
        content: this.content,
      });
      this.message = 'Modificări salvate cu succes!';
      this.router.navigate(['/news']);
    } catch (err: any) {
      this.message = 'Eroare: ' + err.message;
    }
  }
}
