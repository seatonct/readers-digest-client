import { useState, useEffect } from "react";
import { getAllBooks } from "../services/bookServices";
import { Link } from "react-router-dom";

export const AllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);

  const getAndSetAllBooks = async () => {
    const booksArray = await getAllBooks();
    setAllBooks(booksArray);
  };

  useEffect(() => {
    getAndSetAllBooks();
  }, []);

  return (
    <>
      <h1>Books</h1>
      <section>
        {allBooks.map((book) => {
          return (
            <div key={book.id}>
              <Link to={`/allbooks/${book.id}`}>{book.title} </Link>
            </div>
          );
        })}
      </section>
    </>
  );
};
