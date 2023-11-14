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
