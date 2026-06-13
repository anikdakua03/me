import { inject, Injectable, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, user, UserCredential, UserInfo } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly firebaseAuth = inject(Auth);

  readonly user$ = user(this.firebaseAuth);

  readonly currentUser = signal<UserInfo | null | undefined>(undefined);

  login(email: string, password: string): Observable<UserCredential> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password);

    return from(promise);
  }

  logout(): Observable<void> {
    return from(signOut(this.firebaseAuth));
  }
}
