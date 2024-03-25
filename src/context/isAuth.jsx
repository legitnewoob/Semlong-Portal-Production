import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase-config'; // Assuming you have imported your Firebase auth instance

// Custom hook to manage user authentication state
const useAuthentication = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set up an observer to listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update the user state based on authentication state changes
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  return user; // Return the current user object
};

// Function to check if the user is authenticated
const IsAuthenticated = () => {
  const user = useAuthentication(); // Get the current user using the custom hook

  // If user exists (i.e., user is logged in), return true; otherwise, return false
  return !!user;
};

export default IsAuthenticated;
