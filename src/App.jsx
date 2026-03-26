import { useState, useEffect } from "react";
import "./App.css";
import BookList from "./components/BookList";
import BookAdd from "./components/BookAdd";

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState({});

  // Carga el catálogo completo al iniciar
  const fetchAllBooks = async () => {
    try {
      const response = await fetch("/books"); // Endpoint Symfony
      const data = await response.json();

      // Cuando esta función recibe datos, ejecuta setBooks(data) para decirle a React que los datos han cambiado y que redibuje todo lo que dependa de la lista de libros (explicación básica)
      // Actualiza el estado books, provocando que React re-renderice el componente App.jsx para que muestre la lista de libros actualizada (explicación más técnica)
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Filtra libros antiguos
  const fetchBooksBefore2013 = async () => {
    try {
      const response = await fetch("/book/antes2013"); // Endpoint Symfony
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Filtra por categoría "Drama"
  const fetchDramaBooks = async () => {
    try {
      const response = await fetch("/book/drama"); // Endpoint Symfony
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching drama books:", error);
    }
  };

  /* Este bloque es el disparador inicial, ejecuta la función fetchAllBooks para que cuando el usuario entre en la web, 
  la parrilla de libros no aparezca vacía al principio (dicho de forma técnica: ejecuta el efecto tras el primer renderizado "montaje del primer componente")*/
  useEffect(() => {
    fetchAllBooks();
  }, []);

  // El return define lo que el usuario ve, esta dividido en tres bloques:
  return (
    <div className="App">
      {/* 1. El header */}
      <header className="app-header">
        {/* Si hay ISBN significa que el usuario ha pulsado un libro. Así que se despliega 
        la imagen del libro su título, autor y la descripción */}
        {selectedBook.isbn ? (
          <>
            <div className="selected-book-image-container">
              {selectedBook.images && selectedBook.images.length > 0 ? (
                <img
                  src={selectedBook.images[0].ruta}
                  alt={selectedBook.title}
                  className="selected-book-image"
                />
              ) : (
                <div className="no-image-placeholder">Sin imagen</div>
              )}
            </div>
            <div className="selected-book-info">
              <h2>{selectedBook.title}</h2>
              <p>
                <strong>Autor:</strong> {selectedBook.author}
              </p>
              <p>
                <strong>ISBN:</strong> {selectedBook.isbn}
              </p>
              <p>
                <strong>Categoría:</strong> {selectedBook.category}
              </p>
              <p>
                <em>{selectedBook.description}</em>
              </p>
            </div>
          </>
        ) : (
          // Si no hay ISBN mostramos un mensaje diciéndole al usuario que seleccione un libro
          <p>Selecciona un libro en la parrilla para ver más información.</p>
        )}
      </header>

      {/* 2. Los filtros (Sección de botones) */}
      <section className="filter-section">
        <h4 className="filter-title">Filtrar Catálogo:</h4>

        {/* Son botones que simplemente al hacerles clic (onClick) se ejecutan las funciones fetch que hemos configurado antes: 
        (todos los libros, libros de antes del 2013, libros de drama...), cambia el contenido de la parrila sin recargar la página*/}
        <button onClick={fetchAllBooks} className="filter-button">
          Todos
        </button>
        <button onClick={fetchBooksBefore2013} className="filter-button">
          Antes de 2013
        </button>
        <button onClick={fetchDramaBooks} className="filter-button">
          Libros de Drama
        </button>
      </section>

      {/* 3. Los componentes especializados */}

      <BookAdd
        setBooks={setBooks}
        // Le pasamos a BookAdd.jsx la función de setBooks como una prop. Esto permitirá que al añadir libros en el formulario
        // BookAdd.jsx pueda enviarselo a App.jsx para que este pueda añadir el nuevo libro a la lista total (fetchAllBooks)
      />

      <hr />

      <BookList
        books={books} // enviamos los datos procesados (books)
        setBooks={setBooks}
        setSelectedBook={setSelectedBook} // y la función para seleccionar un libro

        // de esta forma la parrilla sabrá qué pintar y cómo reaccionar a los clics del usuario.
      />
    </div>
  );
}

export default App;
