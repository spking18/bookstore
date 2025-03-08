import React from "react";
import Book from "./Book";

const BookList = ({ books, searchTerm, deleteBook, setEditingBook }) => {
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main">
      {filteredBooks.map((book, index) => (
        <Book key={index} book={book} index={index} deleteBook={deleteBook} setEditingBook={setEditingBook} />
      ))}
    </div>
  );
};

export default BookList;
