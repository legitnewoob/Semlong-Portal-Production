import React from 'react';
import '../'
// Assuming this function is part of a functional component
const HelpMe = ({ auth, user, isLoading }) => {
  // Check if the user is logged in
  const check = auth?.currentUser ? true : false;

  return (
    element={
      // Render KeepKids component conditionally based on the check
      <KeepKids isLoggedin={check} userData={user} isLoading={isLoading}>
        <InterviewSchedule/>
      </KeepKids>
    }
  );
};

export default Helpme;