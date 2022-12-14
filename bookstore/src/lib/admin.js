const db_connection = "http://localhost:5000/superadmin";

export const getHttp = async () => {
  const fetchData = await fetch(`${db_connection}/books`);
  const response = await fetchData.json();

  if (!fetchData.ok) {
    throw new Error(response.message);
  }

  return response;
};

export const sendHttp = async (bookData) => {
  const fetchData = await fetch(`${db_connection}/addbooks`, {
    method: "POST",
    body: JSON.stringify(bookData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await fetchData.json();

  if (!fetchData.ok) {
    throw new Error(response.message);
  }

  return response;
};

export const updateHttp = async (book_data) => {
  const fetchData = await fetch(`${db_connection}/updatebooks/${book_data._id}`, {
    method: "POST",
    body: JSON.stringify(book_data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await fetchData.json();

  if (!fetchData.ok) {
    throw new Error(response.message);
  }

  return response;
};

export const getReservedHttp = async () => {
  const fetchData = await fetch(`${db_connection}/reserved`);
  const response = await fetchData.json();

  if (!fetchData.ok) {
    throw new Error(response.message);
  }

  return response;
};


export const adminHttp = async () => {
  const fetchData = await fetch(`${db_connection}/login`);
  const response = await fetchData.json();

  if (!fetchData.ok) {
    throw new Error(response.message);
  }

  return response;
};
