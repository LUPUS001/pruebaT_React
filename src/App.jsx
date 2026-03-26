/* IMPORTANDO LAS HERRAMIENTAS  */
import { useState, useEffect } from "react"; // Traemos 'useState' (para que la app tenga memoria) y 'useEffect' (para ejecutar cosas automáticamente) desde la librería de React
import "./App.css"; // Importamos los estilos CSS

// Traemos los componentes que nosotros hemos creado para organizar la interfaz
import BookList from "./components/BookList";
import BookAdd from "./components/BookAdd";

function App() {
  const [books, setBooks] = useState([]); // creamos el estado 'books'. 'setBooks' será la única forma de cambiar esa lista
  const [selectedBook, setSelectedBook] = useState({}); // creamos el estado 'selectedBooks'. Empieza como un objeto vacío {} porque al principio no hay ningún libro seleccionado

  /* LAS FUNCIONES DE CARGA (FETCH) */
  //    Todas siguen un patron similar, utilizando "async" para ser asincronas y no congelar la pantalla

  const fetchAllBooks = async () => {
    try {
      const response = await fetch("/books"); // Hacemos la petición al Endpoint Symfony (/books)
      const data = await response.json(); // Convertimos su respuesta "cruda" (php o texto plano) en un objeto JSON que JavaScript entienda
      setBooks(data); // guardamos estos datos en el estado 'books' así ya tiene los datos con los que redibujara/renderizará la pantalla
    } catch (error) {
      console.error("Error fetching books:", error); // En caso de que haya algún error saltará este mensaje de error personalizado
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

  /* EL DISPARADOR/TRIGGER AUTOMÁTICO */
  // Este es el primer paso. En cuando la aplicación se monta en el navegador (si utilizas npm run dev se montará en "http://localhost:5173/"), ejecuta fetchAllBooks()
  // esto para que el usuario vea los libros desde el principio. Los corchetes vacíos [] significan "haz esto solo una sola vez"
  useEffect(() => {
    fetchAllBooks();
  }, []);

  /* EL RENDERIZADO (lo que se ve) */
  return (
    <div className="App">
      <header className="app-header">
        {selectedBook.isbn ? ( //Como condición usamos si el objeto seleccionado tiene ISBN
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
            {/* Si tiene ISBN, pintamos la imagen, el autor, la categoría y la descripción del libro seleccionado */}
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
          // Si selectedBook está vacío (no hay un libro seleccionado), mostramos el mensaje
          <p>Selecciona un libro en la parrilla para ver más información.</p>
        )}
      </header>

      {/* LOS FILTROS Y COMPONENTES */}
      <section className="filter-section">
        <h4 className="filter-title">Filtrar Catálogo:</h4>

        {/* Botones que, al hacer clic (onClick), llaman a las funciones de filtrado para cambiar el contenido de books. */}
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

      <BookAdd
        setBooks={setBooks}
        // Renderizamos el formulario para añadir libros. Le pasamos setBooks para que cuando añada uno nuevo, pueda actualizar la lista global.
      />

      <hr />

      <BookList
        books={books}
        setBooks={setBooks}
        setSelectedBook={setSelectedBook}

        // Renderizamos la lista principal. Le pasamos los libros, la función de borrar (setBooks) y la de seleccionar (setSelectedBook).
      />
    </div>
  );
}

export default App;
