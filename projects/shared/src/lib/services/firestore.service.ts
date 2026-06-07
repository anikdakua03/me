import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentData, Firestore, setDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export abstract class FirestoreService<T extends { id?: string }> {
    private firestore = inject(Firestore);

    /**
     * The collection name to work with. It must be overridden by the implemented service.
     */
    protected abstract collectionPath: string;

    /**
     * Sets up the collection and retrieves the collection reference for the implemented service.
     */
    private get collectionRef(): CollectionReference {
        return collection(this.firestore, this.collectionPath);
    }

    /**
     * Retrieves the document collection
     * @returns The collection of document
     */
    getAll(): Observable<T[]> {
        return collectionData(this.collectionRef, {
            idField: "id"
        }) as Observable<T[]>;
    }

    /**
     * Retrieves the document by the identifier
     * @param id The identifier
     * @returns The document data
     */
    getById(id: string): Observable<DocumentData | {
        id: any;
    } | undefined> {
        const documentRef = doc(this.firestore, `${this.collectionPath}/${id}`);

        let s = docData(documentRef, { idField: 'id' });

        return s;
    }

    /**
     * Adds new document to the collection
     * @param newEntity The new entity to add
     * @returns Return the newly added id of the data
     */
    add(newEntity: Omit<T, 'id'>): Observable<string> {
        const promise = addDoc(this.collectionRef, newEntity).then(res => {
            return res.id
        });

        return from(promise);
    }

    /**
     * Updates the document
     * @param id The identifier
     * @param updatedData THe updated document
     * @returns Returns nothing
     */
    update(id: string, updatedData: Partial<T>): Observable<void> {
        const documentRef = doc(this.firestore, `${this.collectionPath}/${id}`);

        const promise = setDoc(documentRef, updatedData, { merge: true });

        return from(promise);
    }

    /**
     * Deletes the document by id
     * @param id The identifier
     * @returns Returns nothing
     */
    delete(id: string): Observable<void> {
        const documentRef = doc(this.firestore, `${this.collectionPath}/${id}`);

        const promise = deleteDoc(documentRef);

        return from(promise);
    }
}