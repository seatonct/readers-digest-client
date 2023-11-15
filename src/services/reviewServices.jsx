export const createReview = async (review) => {
  await fetch("http://localhost:8000/reviews", {
    method: "POST",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("digest_token")).token
      }`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
};
