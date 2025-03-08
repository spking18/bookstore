import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import About from "./components/About";
import "./App.css";

const defaultBooks = [{title: "The Alchemist",author: "Paulo Coelho",description:"A young shepherd named Santiago embarks on a journey to find a hidden treasure. Along the way, he learns about following his dreams, listening to his heart, and the power of the universe guiding him."},
  {title: "To Kill a Mockingbird",author: "Harper Lee",description:"A deeply moving novel that explores racial injustice in the American South. Through the eyes of Scout Finch, we see the struggles of her father, Atticus Finch, as he defends an innocent black man in court."},
  {title: "The Great Gatsby",author: "F. Scott Fitzgerald",description:"A tragic love story set in the roaring twenties, where the mysterious Jay Gatsby throws lavish parties in hopes of winning back his lost love, Daisy Buchanan."},
  {title: "Moby-Dick",author: "Herman Melville",description:"The gripping tale of Captain Ahab’s obsessive quest to seek revenge on Moby Dick, the great white whale that once maimed him. A story of adventure, madness, and fate."},
  {title: "Pride and Prejudice",author: "Jane Austen",description:"A witty and romantic novel that follows the life of Elizabeth Bennet as she navigates love, social class, and personal misunderstandings in 19th-century England."},
  {title: "The Catcher in the Rye",author: "J.D. Salinger",description:"A rebellious teenager, Holden Caulfield, narrates his experiences in New York City after being expelled from prep school, offering a raw and emotional look at adolescence."},
  {title: "Brave New World",author: "Aldous Huxley",description:"A futuristic novel that explores a society controlled by technology, pleasure, and conformity. It questions the cost of sacrificing individuality for societal stability."},
  {title: "Crime and Punishment",author: "Fyodor Dostoevsky",description:"A psychological thriller about guilt and redemption, following a young student who commits a crime and struggles with the consequences of his actions."},
  {title: "The Hobbit",author: "J.R.R. Tolkien",description:"An adventurous tale about Bilbo Baggins, a simple hobbit who is swept into an epic quest to reclaim a lost kingdom from a fierce dragon."}
];

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBookIndex, setEditingBookIndex] = useState(null); // Track book being edited

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books"));
    if (storedBooks && storedBooks.length > 0) {
      setBooks(storedBooks);
    } else {
      setBooks(defaultBooks);
      localStorage.setItem("books", JSON.stringify(defaultBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  const deleteBook = (index) => {
    const updatedBooks = books.filter((_,i) => i !== index);
    setBooks(updatedBooks);
  };

  const updateBook = (updatedBook) => {
    const updatedBooks = books.map((book, index) => (index === editingBookIndex ? updatedBook : book));
    setBooks(updatedBooks);
    setEditingBookIndex(null); // Reset edit mode
  };

  return (
    <div>
      <Navbar />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <BookList books={books} searchTerm={searchTerm} deleteBook={deleteBook} setEditingBook={setEditingBookIndex} />
      <BookForm addBook={addBook} editingBook={editingBookIndex !== null ? books[editingBookIndex] : null} updateBook={updateBook} clearEditing={() => setEditingBookIndex(null)} />
      <About />
    </div>
  );
};

export default App;
