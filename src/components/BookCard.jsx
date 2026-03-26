function BookCard(props) {
  const { book, setSelectedBook, setBooks } = props;

  const handleDelete = async (e) => {
    e.stopPropagation(); // Evita que se seleccione el libro al borrarlo
    
    try {
      const response = await fetch(`/book/delete/${book.isbn}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBooks((prevBooks) => prevBooks.filter((b) => b.isbn !== book.isbn));
        console.log("Libro eliminado con éxito");
      }
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
    }
  };

  return (
    <li 
      onClick={() => setSelectedBook(book)}
      className="book-card-item"
    >
      <div className="book-card-image-container">
        {book.images && book.images.length > 0 ? (
          <img src={book.images[0].ruta} alt={book.title} className="book-card-image" />
        ) : (
          <span className="book-card-placeholder-text">Sin imagen</span>
        )}
      </div>
      <div className="book-card-info">
        <h3 className="book-card-title">{book.title}</h3>
        <h5 className="book-card-subtitle">{book.subtitle}</h5>
        <p className="book-card-author"><strong>Autor:</strong> {book.author}</p>
        <button 
          onClick={handleDelete}
          className="book-card-delete-button"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default BookCard;
