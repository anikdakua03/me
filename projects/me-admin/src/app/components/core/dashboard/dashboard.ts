import { Component, inject, OnInit } from '@angular/core';
import { collection, doc, Firestore, getDocs, setDoc } from '@angular/fire/firestore';
import { SnackbarService } from 'shared';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',

})
export class Dashboard implements OnInit {
  private readonly snackbarService = inject(SnackbarService);
  private db = inject(Firestore);

  ngOnInit(): void {
    this.update();
  }

  async update() {
    const snapshot = await getDocs(collection(this.db, 'profile'));

    for (const docSnap of snapshot.docs) {
      await setDoc(
        doc(this.db, 'profiles', docSnap.id),
        docSnap.data()
      );
    }
  }
}