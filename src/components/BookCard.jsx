/* HERRAMIENTAS (PROPS) */
function BookCard(props) {
  const { book, setSelectedBook, setBooks } = props;
  /* 
    - book: Es el objeto con toda la información de un libro específico (título, autor...) que le paso su padre 'BookList.jsx'
    - setSelectedBook: Esta función avisa a App.jsx sobre que libro ha sido clicado.
    - setBooks: Esta función actualiza la lista global (el total de libros del api rest /books) tras un borrado
*/

  /* LÓGICA DE BORRADO (handleDelete) */
  const handleDelete = async (e) => {
    e.stopPropagation(); // Evita que se seleccione el libro al borrarlo

    try {
      // Petición DELETE --> Llama al endpoint de Symfony usando el ISBN como id único en la URL
      const response = await fetch(`/book/delete/${book.isbn}`, {
        method: "DELETE",
      });

      // Actualización transparente --> si Symfony responde con un ok...
      if (response.ok) {
        setBooks((prevBooks) => prevBooks.filter((b) => b.isbn !== book.isbn));
        // usamos .filter() para crear un nuevo array que contenga todos los libros excepto el que acabas de borrar.

        console.log("Libro eliminado con éxito");
      }
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
    }
  };

  /* ESTRUCTURA VISUAL (JSX) */
  return (
    //El componente BookCard devuelve un 'li' que tiene 2 grandes bloques:

    <li onClick={() => setSelectedBook(book)} className="book-card-item">
      {/* 1. El contenedor de imagen */}
      <div className="book-card-image-container">
        {/* Renderizado seguro: Antes de pintar la imagen, comprobamos que existe */}
        {book.images && book.images.length > 0 ? (
          <img
            /* Ruta dinámica: Accedes a la primera imagen del array (book.images[0].ruta) para mostrar la portada. */
            src={book.images[0].ruta}
            alt={book.title}
            className="book-card-image"
          />
        ) : (
          // Si no hay fotos mostramos un cuadro gris que ponga 'Sin imagen' para no romper el diseño y que quede más profesional
          <span className="book-card-placeholder-text">Sin imagen</span>
        )}
      </div>

      {/* 2. El bloque de información y acciones */}
      <div className="book-card-info">
        <h3 className="book-card-title">{book.title}</h3>
        <h5 className="book-card-subtitle">{book.subtitle}</h5>
        <p className="book-card-author">
          <strong>Autor:</strong> {book.author}
        </p>
        {/* Mostramos el título, subtítulo y el autor del libro */}

        <button onClick={handleDelete} className="book-card-delete-button">
          Eliminar
        </button>
        {/* Al hacer clic sobre el 'li' ejecuta 'setSelectedBook(book)' subiendo el objeto al componente App.jsx, que es quien pintará estos cambios */}
      </div>
    </li>
  );
}

export default BookCard;

/* ESTILOS Y UX 
- Si nos vamos al CSS para ver las clases que estamos utilizando veremos que el cursor: "pointer" y la sombra (boxShadow) indican al usuario que la tarjeta es clicable.
- Usamos un diseño de tipo "Media Object" (imagen a la izquierda, texto a la derecha) que es el estándar para listados de este tipo.
*/
