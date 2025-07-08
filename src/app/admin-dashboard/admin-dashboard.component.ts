import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  title = '';
  content = '';
  imageFile: File | null = null;
  message = '';

  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private authService: AuthService
  ) {}

  onFileChange(event: any) {
    this.imageFile = event.target.files[0];
  }

  async postArticle() {
    if (!this.imageFile || !this.title || !this.content) {
      this.message = 'All fields are required.';
      return;
    }

    try {
      // 1. Upload image
      const filePath = `articles/${Date.now()}_${this.imageFile.name}`;
      const storageRef = ref(this.storage, filePath);
      await uploadBytes(storageRef, this.imageFile);
      const imageUrl = await getDownloadURL(storageRef);

      // 2. Save article data to Firestore
      await addDoc(collection(this.firestore, 'articles'), {
        title: this.title,
        content: this.content,
        imageUrl,
        timestamp: new Date(),
        createdBy: this.authService.getCurrentUserId(),
      });

      this.title = '';
      this.content = '';
      this.imageFile = null;
      this.message = 'Article posted successfully ✅';

    } catch (error: any) {
      this.message = `Error: ${error.message}`;
    }
  }
}
