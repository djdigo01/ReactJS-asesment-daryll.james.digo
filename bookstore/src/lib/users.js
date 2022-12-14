const db_connection = "http://localhost:5000";

export const getHttp = async () => {
  const fetchData = await fetch(`${db_connection}/books`);
  const response = await fetchData.json();

  if (!fetchData.ok) {
    throw new Error(response.message);
  }

  return response;
};

export async function getBookDetail(bookId) {
  const fetchData = await fetch(`${db_connection}/books/detail/${bookId.id}`);
  const response = await fetchData.json();

  if (!fetchData.ok) {
    throw new Error(response.message);
  }

  return response;
}


export const reserveHttp = async (book_data) => {
  const fetchData = await fetch(`${db_connection}/books/reservation`, {
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

export const createAccountHttp = async (userData) => {
  const fetchData = await fetch(`${db_connection}/create/account`, {
    method: "POST",
    body: JSON.stringify(userData),
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

export const userHttp = async () => {
  const fetchData = await fetch(`${db_connection}/user/login`);
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