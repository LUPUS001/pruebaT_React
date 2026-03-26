/* IMPORTACIÓN */
import BookCard from "./BookCard"; // Traemos al componente hijo, sin esta línea no podríamos utilizar la etiqueta <BookCard />

/* PROPS */
function BookList(props) {
  // La función recibe el objeto "props" que es el paquete de datos que le envía App.jsx

  const { books, setSelectedBook, setBooks } = props;
  /* Desestructuración: Abrimos el paquete props y sacamos las tres herramientas que necesitamos: 
      - el array de libros (books)
      - la función para seleccionar (setSelectedBook)
      - la función para actualizar la lista (setBooks)
  */

  /* TRANSFORMACIÓN DE DATOS */
  const bookCard = books.map((book) => {
    // Creamos la variable bookCard que es donde guardaremos las tarjetas y lo que devolveremos en el return del renderizado final

    // Indicamos que queremos que nos devuelva el bucle por cada libro que encuentre
    return (
      <BookCard
        key={book.isbn}
        book={book}
        setSelectedBook={setSelectedBook}
        setBooks={setBooks}
      />
      /* 
        - key={book.isbn}: Le podemos un id único a cada tarjeta para que React no se confunda cuando actualize la página.
        - book={book}: Le pasamos toda la información de ese libro específico al hijo (la iteración del book vacío que hemos creado arriba).
        - setSelectedBook y setBooks: Le pasamos las funciones al abuelo (App.jsx) para que el libro pueda avisar a React si ha sido pulsado o borrado y este lo refleje en la página.
      */
    );
  });

  /* RENDERIZADO FINAL */
  return (
    // Es lo que devuelve BookList, lo que pongas aquí es lo que se dibujará/renderizará en el navegador
    <main className="books-grid">{bookCard}</main>
    /*
      - <main className="books-grid"> : Creamos el contenedor principal. La clase books-grid es la que activa las columnas que definiste en el CSS.
      
      - {bookCard} Aquí es donde soltamos toda la colección de tarjetas que fabricamos en la línea 16. React las pintará una al lado de la otra dentro del <main>.
   */
  );
}

export default BookList; // Hacemos que este componente sea "público" para que App.jsx pueda importarlo y usarlo.

/* 
  Este archivo es una fábrica. Entra un array de datos (objetos JSON) por la línea 8 'props' y sale una lista de componentes visuales por la línea 38 {bookCard}.
*/
