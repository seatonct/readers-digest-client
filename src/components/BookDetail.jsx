import { useEffect, useState } from "react";
import { getBookById } from "../services/bookServices";
import { useParams } from "react-router-dom";

export const BookDetail = () => {
  const [book, setBook] = useState({});

  const { bookId } = useParams();

  useEffect(() => {
    getBookById(bookId).then((res) => {
      setBook(res);
    });
  }, [bookId]);

  return (
    <>
      <h2>Book Details</h2>
      <section>
        <img src={book.cover_img} />
        <h3>{book.title}</h3>
        <p>by {book.author}</p>
        {book.categories?.length > 0 ? (
          <>
            <ul>Categories: </ul>
            {book.categories?.map((category) => {
              return <li key={category.id}>{category.name}</li>;
            })}
          </>
        ) : (
          ""
        )}

        <p>ISBN {book.isbn_number}</p>
      </section>
    </>
  );
};
