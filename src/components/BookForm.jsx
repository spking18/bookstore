import React, { useState, useEffect } from "react";

const BookForm = ({ addBook, editingBook, updateBook, clearEditing }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookDescription, setBookDescription] = useState("");

  useEffect(() => {
    if (editingBook) {
      setBookTitle(editingBook.title);
      setBookAuthor(editingBook.author);
      setBookDescription(editingBook.description);
      setIsPopupOpen(true);
    }
  }, [editingBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookTitle && bookAuthor && bookDescription) {
      const bookData = { title: bookTitle, author: bookAuthor, description: bookDescription };

      if (editingBook) {
        updateBook(bookData);
      } else {
        addBook(bookData);
      }

      handleClose();
    }
  };

  // Function to close the popup and reset states
  const handleClose = () => {
    setBookTitle("");
    setBookAuthor("");
    setBookDescription("");
    setIsPopupOpen(false);
    clearEditing(); // Reset editing state in App.js
  };

  return (
    <>
      {isPopupOpen && (
        <>
          <div className="popup-overlay" onClick={handleClose}></div>
          <div className="popup-box">
            <h2>{editingBook ? "Edit Book" : "Add a New Book"}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Book Title" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} />
              <input type="text" placeholder="Book Author" value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)} />
              <textarea placeholder="Short Description" value={bookDescription} onChange={(e) => setBookDescription(e.target.value)}></textarea>
              <button type="submit">{editingBook ? "UPDATE" : "ADD"}</button>
              <button type="button" onClick={handleClose}>CANCEL</button>
            </form>
          </div>
        </>
      )}

      <button className="add-button" onClick={() => { handleClose(); setIsPopupOpen(true); }}>+</button>
    </>
  );
};

export default BookForm;
