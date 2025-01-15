import { DatabaseManager } from '../Model/databaseManager';
//import { db } from '../firebaseConfig'; 

export class logic {
  private databaseManager: DatabaseManager;

  constructor() {
    // Initialize the DatabaseManager with the required configuration
    //this.databaseManager = new DatabaseManager(db);
  }

  /**
   * Handles the sign-up process by validating input and adding the user to the database.
   *
   * @param username The username of the user
   * @param email The email of the user
   * @param password The password of the user
   * @returns A promise resolving with success or error message
   */
  async signUp(
    username: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> {
    // Validate inputs
    if (!username || !email || !password) {
      return Promise.resolve({ success: false, message: 'All fields are required' });
    }

    if (!email.includes('@')) {
      return Promise.resolve({ success: false, message: 'Invalid email address' });
    }

    // Check if the email already exists in the database
    try {
      console.log('Checking email existence...');
      const users = await DatabaseManager.queryCollection('users', 'email', '==', email);
      if (users.length > 0) {
        return Promise.resolve({ success: false, message: 'Email already registered' });
      }
    } catch (error) {
      console.error('Error checking email existence:', error);
      return Promise.resolve({ success: false, message: 'Error checking email. Please try again.' });
    }

    // Add the user to the database
    try {
      console.log('Adding user to database...');
      await this.databaseManager.addDocument('users', { username, email, password });
      return Promise.resolve({ success: true, message: 'Sign-up successful!' });
    } catch (error) {
      console.error('Error adding user to database:', error);
      return Promise.resolve({ success: false, message: 'Error signing up. Please try again.' });
    }
  }
}