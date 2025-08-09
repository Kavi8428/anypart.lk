import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  addDoc, 
  updateDoc, 
  deleteDoc,
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  onSnapshot
} from 'firebase/firestore';
import { db } from './config';

/**
 * Generic Firestore operations
 */
export class FirestoreService {
  /**
   * Get all documents from a collection
   */
  static async getCollection(collectionName, queryConstraints = []) {
    try {
      const collectionRef = collection(db, collectionName);
      const q = queryConstraints.length > 0 
        ? query(collectionRef, ...queryConstraints)
        : collectionRef;
      
      const querySnapshot = await getDocs(q);
      const documents = [];
      
      querySnapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return documents;
    } catch (error) {
      console.error(`Error getting collection ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Get a single document
   */
  static async getDocument(collectionName, documentId) {
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Error getting document ${documentId}:`, error);
      throw error;
    }
  }

  /**
   * Add a new document
   */
  static async addDocument(collectionName, data) {
    try {
      const collectionRef = collection(db, collectionName);
      const docRef = await addDoc(collectionRef, {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      return docRef.id;
    } catch (error) {
      console.error(`Error adding document to ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Update a document
   */
  static async updateDocument(collectionName, documentId, data) {
    try {
      const docRef = doc(db, collectionName, documentId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date()
      });
      
      return true;
    } catch (error) {
      console.error(`Error updating document ${documentId}:`, error);
      throw error;
    }
  }

  /**
   * Delete a document
   */
  static async deleteDocument(collectionName, documentId) {
    try {
      const docRef = doc(db, collectionName, documentId);
      await deleteDoc(docRef);
      
      return true;
    } catch (error) {
      console.error(`Error deleting document ${documentId}:`, error);
      throw error;
    }
  }

  /**
   * Real-time listener for a collection
   */
  static subscribeToCollection(collectionName, callback, queryConstraints = []) {
    try {
      const collectionRef = collection(db, collectionName);
      const q = queryConstraints.length > 0 
        ? query(collectionRef, ...queryConstraints)
        : collectionRef;
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({
            id: doc.id,
            ...doc.data()
          });
        });
        callback(documents);
      });
      
      return unsubscribe;
    } catch (error) {
      console.error(`Error subscribing to collection ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Paginated query
   */
  static async getPaginatedCollection(collectionName, pageSize = 10, lastDoc = null, queryConstraints = []) {
    try {
      const collectionRef = collection(db, collectionName);
      let constraints = [...queryConstraints, limit(pageSize)];
      
      if (lastDoc) {
        constraints.push(startAfter(lastDoc));
      }
      
      const q = query(collectionRef, ...constraints);
      const querySnapshot = await getDocs(q);
      
      const documents = [];
      let lastDocument = null;
      
      querySnapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          ...doc.data()
        });
        lastDocument = doc;
      });
      
      return {
        documents,
        lastDocument,
        hasMore: documents.length === pageSize
      };
    } catch (error) {
      console.error(`Error getting paginated collection ${collectionName}:`, error);
      throw error;
    }
  }
}