import { Navigate } from "react-router-dom";

const Protected = ({ isLoggedIn, isLoading, children }) => {
  if (isLoading) {
    // If authentication status is still loading, you can render a loading indicator
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    // If the user is not logged in, redirect to the login page
    window.alert("Please login to view this page");
    return <Navigate to="/" replace />;
  }

  // If the user is logged in, render the children components
  return children;
};

export default Protected;
