/* HERRAMIENTAS (PROPS) */
function BookCard(props) {
  // Defines la función del componente. Recibe el objeto props, que es el "paquete" de datos que le envía su padre (BookList).

  const { book, setSelectedBook, setBooks } = props;
  // Sacas del paquete tres cosas: el objeto book (los datos del libro actual), la función setSelectedBook
  // (para marcar cuál estamos viendo) y setBooks (para actualizar la lista si borramos).

  /* LÓGICA DE BORRADO (handleDelete) */
  const handleDelete = async (e) => {
    // Es una función async porque tiene que esperar a que el servidor responda.

    e.stopPropagation();
    // Crucial. Detiene el evento de clic para que no "suba" al li. Sin esto, al borrar un libro,
    // la aplicación creería que también quieres seleccionarlo para verlo en el detalle.

    try {
      const response = await fetch(`/book/delete/${book.isbn}`, {
        method: "DELETE",
      });
      // Haces la llamada a Symfony. Usas el método DELETE y le pasas el ISBN dinámicamente en la URL
      // para que el backend sepa exactamente qué libro eliminar de la base de datos.

      if (response.ok) {
        setBooks((prevBooks) => prevBooks.filter((b) => b.isbn !== book.isbn));
        // Si Symfony dice que todo ha ido bien (ok), actualizas la pantalla de forma "transparente".
        // Usas .filter() para crear una lista nueva donde estén todos los libros menos el que tiene el ISBN que acabas de borrar.

        console.log("Libro eliminado con éxito");
      }
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
    }
  };

  /* DISEÑO (JSX y Renderizado) */
  return (
    // Aquí es donde renderizamos la tarjeta

    <li onClick={() => setSelectedBook(book)} className="book-card-item">
      {/* 
        El contenedor principal es un li. Al hacer clic en cualquier parte de la tarjeta, 
        ejecutas setSelectedBook(book), lo que hace que este libro aparezca en el header de App.jsx. 
      */}

      <div className="book-card-image-container">
        {book.images && book.images.length > 0 ? (
          <img
            src={book.images[0].ruta}
            alt={book.title}
            className="book-card-image"
          />
        ) : (
          <span className="book-card-placeholder-text">Sin imagen</span>
        )}
      </div>
      {/* 
        Renderizado condicional. Miras si el libro tiene imágenes. Si tiene, pintas la primera (images[0]). 
        Si no tiene, pintas un texto de "Sin imagen" para que la tarjeta no quede vacía.
      */}

      <div className="book-card-info">
        <h3 className="book-card-title">{book.title}</h3>
        <h5 className="book-card-subtitle">{book.subtitle}</h5>
        <p className="book-card-author">
          <strong>Autor:</strong> {book.author}
        </p>
        {/* 
          Pintas los textos básicos. Usas llaves {} para que React sepa que debe poner el valor de la variable.
        */}

        <button onClick={handleDelete} className="book-card-delete-button">
          Eliminar
        </button>
        {/* El botón de eliminar llama a la función handleDelete que explicamos antes. */}
      </div>
    </li>
  );
}

export default BookCard;

/* RESUMEN
  Usamos la función setBooks que recibimos por props. Al ejecutar un .filter() sobre el estado anterior, 
  React detecta que el array es nuevo y elimina el componente del DOM de forma eficiente
*/
