import BookCard from "./BookCard";

/* PROPS */
function BookList(props) {
  // En lugar de usar props.books, extraemos las variables directamente (simplemente para dejar el código más limpio y legible)
  const { books, setSelectedBook, setBooks } = props;
  /* 
    - books: Es el array de objetos que viene desde App.jsx
    - setSelectedBook y setBooks: BookList.jsx no utiliza estas funcionas, pero las necesita para poder pasárselas
      a su hijo BookCard.jsx (Prop Drilling: pasar herramientas a través de niveles)
  */

  /* TRANSFORMACIÓN MÁGICA(.map) */
  const bookCard = books.map((book) => {
    return (
      <BookCard
        key={book.isbn}
        book={book}
        setSelectedBook={setSelectedBook}
        setBooks={setBooks}
      />
    );
    /* 
      .map(): Recorre cada libro del array y "crea" un nuevo componente BookCard por cada libro. Si el JSON tiene 
              50 libros, la función .map() creará 50 BookCard/tarjetas,
      
      key={book.isbn}: Para saber que tarjeta/BookCard cambiar, necesita saber cuál es con un identificador único 
       
    */
  });

  /* RENDERIZADO FINAL */
  return (
    <main className="books-grid">{bookCard}</main>
    /*
      - Usamos <main> por semántica (le dice al navegador que este es el contenido principal de la página) y accesibilidad web (la etiqueta <main> es superior a <div> para lectores con discapacidad entre otras cosas)
      - className="books-grid" usa CSS Grid (la configuración esta en App.css) para que los libros se vean en columnas y no uno debajo del otro
      - {bookCard} aquí soltamos todas las tarjetas que hemos creado en el .map()
   */
  );
}

export default BookList; //Sin esta línea App.jsx no podría importar este componente y utilizarlo

/* 
El componente BookList.jsx es lo que en React llamamos un componente de presentación o de lista. Su trabajo no es gestionar datos complejos, 
sino actuar como un "puente" que recibe un saco de libros y los organiza limpiamente en la pantalla.
*/
