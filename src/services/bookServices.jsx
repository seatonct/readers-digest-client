export const createBook = async (book) => {
  await fetch("http://localhost:8000/books", {
    method: "POST",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("digest_token")).token
      }`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
};

export const getAllBooks = async () => {
  const response = await fetch("http://localhost:8000/books", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("digest_token")).token
      }`,
      "Content-Type": "application/json",
    },
  });
  const books = await response.json();
  return books;
};

export const getBookById = async (bookId) => {
  const response = await fetch(`http://localhost:8000/books/${bookId}`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("digest_token")).token
      }`,
      "Content-Type": "application/json",
    },
  });
  const book = await response.json();
  return book;
};
