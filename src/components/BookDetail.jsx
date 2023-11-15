import { useEffect, useState } from "react";
import { getBookById } from "../services/bookServices";
import { useParams } from "react-router-dom";
import { createReview } from "../services/reviewServices";

export const BookDetail = () => {
  const [book, setBook] = useState({});
  const [review, setReview] = useState({});

  const { bookId } = useParams();

  useEffect(() => {
    getAndSetBook();
  }, [bookId]);

  const getAndSetBook = async () => {
    await getBookById(bookId).then((res) => {
      setBook(res);
    });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const copy = { ...review };
    copy.bookId = book.id;
    await createReview(copy);
    await getAndSetBook();
    // navigate(`/allbooks/${bookId}`);
  };

  return (
    <main>
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
        <form className="form--login" onSubmit={() => {}}>
          <h3 className="text-3xl">Review This Book </h3>
          <fieldset className="mt-4">
            <label htmlFor="rating">Rating (1-10): </label>
            <input
              id="rating"
              type="number"
              min="1"
              max="10"
              onChange={(e) => {
                const copy = { ...review };
                copy.rating = e.target.value;
                setReview(copy);
              }}
              value={review.rating}
              className="form-control"
            />
          </fieldset>
          <fieldset className="mt-4">
            <label htmlFor="comment">Comment: </label>
            <input
              id="comment"
              type="text"
              onChange={(e) => {
                const copy = { ...review };
                copy.comment = e.target.value;
                setReview(copy);
              }}
              value={review.comment}
              className="form-control"
            />
          </fieldset>

          <fieldset>
            <button
              type="submit"
              onClick={handleSave}
              className="button rounded-md bg-blue-700 text-blue-100 p-3 mt-4"
            >
              Submit Review
            </button>
          </fieldset>
        </form>
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
    </main>
  );
};
