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
        {book.reviews?.length > 0 ? (
          <>
            <h4>Reviews: </h4>
            {book.reviews?.map((review) => {
              return (
                <div key={review.id}>
                  <p>Rating: {review.rating}/10</p>
                  <p>Comment: {review.comment}</p>
                  <p>Reviewer: {review.user}</p>
                  <p>Submitted: {review.date_posted}</p>
                </div>
              );
            })}
          </>
        ) : (
          ""
        )}
      </section>
    </>
  );
};
