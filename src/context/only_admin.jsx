import { Navigate } from "react-router-dom";

const KeepAdmin = ({isLoggedIn , isLoading , userData , children }) => {
    if (isLoading) {
      // If authentication status is still loading, you can render a loading indicator
      return <div>Loading...</div>;
    }   
    console.log("Userdata" , userData);
    if(!isLoggedIn)
    {
        window.alert("Please login first");
        return <Navigate to="/" replace/>;
    }
    
    
    else if (userData.user_type === "Student" || userData.user_type === "Evaluator") {
      // If the user is not logged in, redirect to the login page
      window.alert("You need to be a admin to view this page");
      return <Navigate to="/" replace />;
     
    }

    return children;
  
    // If the user is logged in, render the children components
    
  };
  
  export default KeepAdmin;