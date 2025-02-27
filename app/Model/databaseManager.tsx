import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Firestore, doc, getDocs, query, where, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';


/**
 * DatabaseManager Component
 * A utility class for managing Firebase database operations.
 */
export class DatabaseManager {
  private db: Firestore;

  /**
   * Constructor initializes the DatabaseManager with a Firebase configuration.
   *
   * @param config - The Firebase configuration object
   */
  constructor(db: Firestore) {
    this.db = db;
    console.log('DatabaseManager initialized with Firestore instance');
  }

  /**
   * Adds a document to a Firestore collection.
   *
   * @param collection - The name of the Firestore collection
   * @param data - The document data to add
   * @returns A promise resolving with the document reference
   */
  public async addDocument(
    collectionName: string,
    data: Record<string, any>
  ): Promise<string> {
    try {
      // Validate collection name
      if (!collectionName?.trim()) {
        throw new Error('Collection name is required');
      }

      // Validate document data
      if (!data || Object.keys(data).length === 0) {
        throw new Error('Document data is required');
      }

      // Add Firestore timestamp fields
      const documentData = {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Add the document to Firestore
      const docRef = await addDoc(collection(this.db, collectionName), documentData);

      console.log(`Document successfully added to ${collectionName} with ID: ${docRef.id}`);
      return docRef.id;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error(`Error adding document to ${collectionName}:`, errorMessage);
      throw new Error(`Failed to add document: ${errorMessage}`);
    }
  }

  /**
   * Queries documents from a Firestore collection.
   *
   * @param collectionName - The name of the Firestore collection
   * @param field - The field to filter by
   * @param operator - The comparison operator (e.g., '==', '<', '>', '>=', 'array-contains', etc.)
   * @param value - The value to compare the field to
   * @returns A promise resolving with the queried documents
   */
  static async queryCollection(
    collectionName: string,
    field: string,
    operator: FirebaseFirestoreTypes.WhereFilterOp,
    value: any
  ): Promise<any[]> {
    try {
      console.log(`Attempting to query ${collectionName} where ${field} ${operator} ${value}`);
      
      const colRef = collection(db, collectionName);
      const q = query(colRef, where(field, operator, value));
      console.log('Query created successfully');
      
      const querySnapshot = await getDocs(q);
      console.log('Query executed successfully');
      
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      console.log(`Retrieved ${documents.length} documents from ${collectionName}`);
      return documents;
    } catch (error: any) {
      console.error('Detailed query error:', {
        collectionName,
        field,
        operator,
        value,
        errorMessage: error.message,
        errorCode: error.code,
        errorStack: error.stack
      });
      throw new Error(`Failed to query collection: ${error.message}`);
    }
  }




  /**
   * Fetches all documents from a Firestore collection.
   *
   * @param collectionName - The name of the Firestore collection
   * @returns A promise resolving with the fetched documents
   */
  public async fetchCollection(collectionName: string): Promise<any[]> {
    try {
      const colRef = collection(this.db, collectionName);
      const snapshot = await getDocs(colRef);
      const documents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(`Fetched ${documents.length} documents from ${collectionName}.`);
      return documents;
    } catch (error) {
      console.error('Error fetching collection:', error);
      return [];
    }
  }


  /**
   * Updates a document in a Firestore collection.
   *
   * @param collectionName - The name of the Firestore collection
   * @param documentId - The ID of the document to update
   * @param data - The new data to set
   * @returns A promise resolving when the document is updated
   */
  public async updateDocument(
    collectionName: string,
    documentId: string,
    data: Record<string, any>
  ): Promise<void> {
    try {
      const docRef = doc(this.db, collectionName, documentId);
      await updateDoc(docRef, data);
      console.log(`Document ${documentId} in ${collectionName} updated successfully.`);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  }

  /**
   * Deletes a document from a Firestore collection.
   *
   * @param collectionName - The name of the Firestore collection
   * @param documentId - The ID of the document to delete
   * @returns A promise resolving when the document is deleted
   */
  public async deleteDocument(collectionName: string, documentId: string): Promise<void> {
    try {
      const docRef = doc(this.db, collectionName, documentId);
      await deleteDoc(docRef);
      console.log(`Document ${documentId} in ${collectionName} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }
}




// export const addUserToFirestore = async (user) => {
//   try {
//     await addDoc(collection(db, 'users'), {
//       uid: user.uid,
//       username: user.username,
//       email: user.email,
//       displayName: user.displayName || '',
//       createdAt: new Date().toISOString(),
//     });
//   } catch (error) {
//     throw new Error(`Failed to add user to Firestore: ${error.message}`);
//   }
// }
