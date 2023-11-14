import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../services/categoryService";
import { createBook } from "../services/bookServices";

export const AddBook = () => {
  const [book, setBook] = useState({});
  const [categories, setCategories] = useState([]);
  const [chosenCategories, setChosenCategories] = useState(new Set());

  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  const handleCategoryChosen = (category) => {
    const copy = new Set(chosenCategories);
    copy.has(category.id) ? copy.delete(category.id) : copy.add(category.id);
    setChosenCategories(copy);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const copy = { ...book };
    copy.categories = Array.from(chosenCategories);
    await createBook(copy);
    navigate("/allbooks");
  };

  return (
    <main className="container--login">
      <section>
        <form className="form--login" onSubmit={() => {}}>
          <h1 className="text-3xl">Add a Book</h1>
          <fieldset className="mt-4">
            <label htmlFor="book">Title:</label>
            <input
              id="book"
              type="text"
              onChange={(e) => {
                const copy = { ...book };
                copy.title = e.target.value;
                setBook(copy);
              }}
              value={book.title}
              className="form-control"
            />
          </fieldset>
          <fieldset className="mt-4">
            <label htmlFor="author">Author: </label>
            <input
              id="author"
              type="text"
              onChange={(e) => {
                const copy = { ...book };
                copy.author = e.target.value;
                setBook(copy);
              }}
              value={book.author}
              className="form-control"
            />
          </fieldset>
          <fieldset className="mt-4">
            <label htmlFor="isbn_number">ISBN Number: </label>
            <input
              id="isbn_number"
              type="number"
              onChange={(e) => {
                const copy = { ...book };
                copy.isbn_number = e.target.value;
                setBook(copy);
              }}
              value={book.isbn_number}
              className="form-control"
            />
          </fieldset>
          <fieldset className="mt-4">
            <label htmlFor="cover_img">Cover Image URL: </label>
            <input
              id="cover_img"
              type="text"
              onChange={(e) => {
                const copy = { ...book };
                copy.cover_img = e.target.value;
                setBook(copy);
              }}
              value={book.cover_img}
              className="form-control"
            />
          </fieldset>
          <fieldset className="mt-4">
            <label htmlFor="type">
              {" "}
              <strong>Categories</strong>{" "}
            </label>
            <br />
            {categories.map((c) => (
              <div key={`category-${c.id}`} value={c.id}>
                <input
                  type="checkbox"
                  checked={chosenCategories.has(c.id)}
                  onChange={() => {
                    handleCategoryChosen(c);
                  }}
                />
                {c.name}
              </div>
            ))}
          </fieldset>

          <fieldset>
            <button
              type="submit"
              onClick={handleSave}
              className="button rounded-md bg-blue-700 text-blue-100 p-3 mt-4"
            >
              Add Book
            </button>
          </fieldset>
        </form>
      </section>
    </main>
  );
};
