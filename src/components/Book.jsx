import React from "react";

const Book = ({ book, index, deleteBook, setEditingBook }) => {
  return (
    <div className="container">
      <h1>{book.title}</h1>
      <h5>{book.author}</h5>
      <p>{book.description}</p>
      <button onClick={() => deleteBook(index)}>Delete</button>
      <button onClick={() => setEditingBook(index)}>Edit</button>
    </div>
  );
};

export default Book;
