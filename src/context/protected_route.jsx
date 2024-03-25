import React, { useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';

// Assuming this function is part of a functional component
const ProtectedRoute = ({ isLoggedIn, userData, isLoading, component: Component, ...rest }) => {
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    // Reset the alertShown state when isLoggedIn or userData changes
    setAlertShown(false);
  }, [isLoggedIn, userData]);

  return (
    <Route
      {...rest}
      element={
        isLoggedIn ? (
          userData && userData.user_type !== "Student" ? (
            <Component />
          ) : (
            !alertShown && ( // Check if alert has not been shown already
              <>
                {setAlertShown(true)} {/* Set alertShown to true */}
                {window.alert("You need to be of higher rank to view this page")}
                <Navigate to="/" replace />
              </>
            )
          )
        ) : (
          <Navigate to="/" replace />
        )
      }
    />
  );
};

export default ProtectedRoute;