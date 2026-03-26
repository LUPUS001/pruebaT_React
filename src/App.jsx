import { useState, useEffect } from "react";
import "./App.css";
import BookList from "./components/BookList";
import BookAdd from "./components/BookAdd";

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState({});

  const fetchAllBooks = async () => {
    try {
      const response = await fetch("/books");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchBooksBefore2013 = async () => {
    try {
      const response = await fetch("/book/antes2013");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchDramaBooks = async () => {
    try {
      const response = await fetch("/book/drama");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching drama books:", error);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        {selectedBook.isbn ? (
          <>
            <div className="selected-book-image-container">
              {selectedBook.images && selectedBook.images.length > 0 ? (
                <img src={selectedBook.images[0].ruta} alt={selectedBook.title} className="selected-book-image" />
              ) : (
                <div className="no-image-placeholder">Sin imagen</div>
              )}
            </div>
            <div className="selected-book-info">
              <h2>{selectedBook.title}</h2>
              <p><strong>Autor:</strong> {selectedBook.author}</p>
              <p><strong>ISBN:</strong> {selectedBook.isbn}</p>
              <p><strong>Categoría:</strong> {selectedBook.category}</p>
              <p><em>{selectedBook.description}</em></p>
            </div>
          </>
        ) : (
          <p>Selecciona un libro en la parrilla para ver más información.</p>
        )}
      </header>

      <section className="filter-section">
        <h4 className="filter-title">Filtrar Catálogo:</h4>
        <button onClick={fetchAllBooks} className="filter-button">Todos</button>
        <button onClick={fetchBooksBefore2013} className="filter-button">Antes de 2013</button>
        <button onClick={fetchDramaBooks} className="filter-button">Libros de Drama</button>
      </section>

      <BookAdd setBooks={setBooks} />
      <hr />

      <BookList books={books} setBooks={setBooks} setSelectedBook={setSelectedBook} />
    </div>
  );
}

export default App;
