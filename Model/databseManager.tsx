import firestore from '@react-native-firebase/firestore';

/**
 * DatabaseManager Component
 * A utility class for managing Firebase database operations.
 */
export class DatabaseManager {
  private config: Record<string, string> | null = null;

  /**
   * Constructor initializes the DatabaseManager with a Firebase configuration.
   *
   * @param config - The Firebase configuration object
   */
  constructor(config: Record<string, string>) {
    this.config = config;
    console.log('Firebase DatabaseManager initialized with config:', this.config);
  }

  /**
   * Adds a document to a Firestore collection.
   *
   * @param collection - The name of the Firestore collection
   * @param data - The document data to add
   * @returns A promise resolving with the document reference
   */
  public async addDocument(collection: string, data: Record<string, any>): Promise<void> {
    try {
      const docRef = await firestore().collection(collection).add(data);
      console.log(`Document added to ${collection} with ID:`, docRef.id);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  }

  /**
   * Fetches all documents from a Firestore collection.
   *
   * @param collection - The name of the Firestore collection
   * @returns A promise resolving with the fetched documents
   */
  public async fetchCollection(collection: string): Promise<any[]> {
    try {
      const snapshot = await firestore().collection(collection).get();
      const documents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(`Fetched ${documents.length} documents from ${collection}.`);
      return documents;
    } catch (error) {
      console.error('Error fetching collection:', error);
      return [];
    }
  }

  /**
   * Updates a document in a Firestore collection.
   *
   * @param collection - The name of the Firestore collection
   * @param documentId - The ID of the document to update
   * @param data - The new data to set
   * @returns A promise resolving when the document is updated
   */
  public async updateDocument(
    collection: string,
    documentId: string,
    data: Record<string, any>
  ): Promise<void> {
    try {
      await firestore().collection(collection).doc(documentId).update(data);
      console.log(`Document ${documentId} in ${collection} updated successfully.`);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  }

  /**
   * Deletes a document from a Firestore collection.
   *
   * @param collection - The name of the Firestore collection
   * @param documentId - The ID of the document to delete
   * @returns A promise resolving when the document is deleted
   */
  public async deleteDocument(collection: string, documentId: string): Promise<void> {
    try {
      await firestore().collection(collection).doc(documentId).delete();
      console.log(`Document ${documentId} in ${collection} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }
}
