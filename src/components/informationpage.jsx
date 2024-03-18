import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const InformationPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

//   useEffect(() => {
//     // Fetch data based on the "id" parameter from an API or data source
//     // Replace this with your actual data-fetching logic
//     fetchDataById(id)
//       .then((result) => {
//         setData(result);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [id]);

  return (
    <div>
      <h1>Information Page</h1>
      <p>ID: {id}</p>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
      {/* Display other information based on the fetched data */}
    </div>
  );
};

export default InformationPage;
