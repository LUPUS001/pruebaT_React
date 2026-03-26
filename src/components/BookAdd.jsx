/* IMPORTACIÓN Y PROPS */
import React, { useState } from "react";
// useState: Lo necesitamos para que React "recuerde" lo que el usuario va escribiendo en el formulario.

function BookAdd(props) {
  const { setBooks } = props;
  // setBooks: Es la función que viene desde App.jsx. Gracias a ella, el usuario ve el nuevo libro en la lista
  // sin tener que esperar a que fetchAllBooks vuelva a consultar la base de datos de Symfony.

  /* EL ESTADO DEL FORMULARIO  */
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [genre, setGenre] = useState("");
  const [pages, setPages] = useState("");
  /* 
    Has creado un estado para cada campo del formulario. Esto es lo que se llama "Single Source of Truth" 
    (Fuente única de verdad): el valor del input no vive en el navegador, vive en el estado de React.
    Es por eso que podremos editar constantemente este valor de forma asíncrona sin que el usuario tenga que recargar la página
  */

  /* EL ENVÍO (handleSubmit) */
  const handleSubmit = async (e) => {
    // Esta función se dispara cuando el usuario hace clic en el botón "Agregar Libro".

    e.preventDefault();
    // Evita que la página se recargue (comportamiento por defecto de los formularios HTML). Queremos que sea una SPA (Single Page Application).

    const newBook = {
      title,
      author,
      isbn,
      category: genre,
      pages: parseInt(pages) || 0, // convertimos pages a número (parseInt) porque Symfony lo espera como un entero, evita enviarlo al backend si el usuario deja el campo de páginas vacío.
    };
    // Creación del objeto: Creamos newBook con los valores de los estados locales.

    try {
      /* PETICIÓN AL SERVIDOR (Fetch POST) */
      const response = await fetch("/book/anadir", {
        method: "POST", // Indicamos que vamos a enviar nuevos datos al servidor
        headers: {
          "Content-Type": "application/json", // le avisamos a Symfony que vamos a enviar un objeto JSON
        },
        body: JSON.stringify(newBook), // Convertimos nuestro objeto JavaScript a una cadena de texto JSON para que viaje por la red
      });

      /* ACTUALIZACIÓN DE LA INTERFAZ */
      if (response.ok) {
        setBooks((prevBooks) => [...prevBooks, newBook]);
        setTitle("");
        setAuthor("");
        setIsbn("");
        setGenre("");
        setPages("");
        console.log("Libro añadido con éxito");
      }
      // Si el servidor responde con éxito, usas 'setBooks'. Al usar el operador spread (...prevBooks), le dices a React:
      // "Coge todos los libros que ya tenías y pon este nuevo al final". Luego, limpias todos los campos del formulario para que el usuario pueda escribir otro.
    } catch (error) {
      console.error("Error al añadir el libro:", error);
    }
  };

  return (
    <div className="book-add-container">
      <h3>Agregar Nuevo Libro</h3>
      <form onSubmit={handleSubmit} className="book-add-form">
        {/* EL "DIBUJO" (JSX) */}
        <input
          name="title" // Vincula el valor del cuadro de texto con el estado de React
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Cada vez que el usuario pulsa una tecla, 'e.target.value' captura esa letra y actualiza el estado mediante 'setTitle'
          required // Validación básica de HTML5 para asegurar que no se envién libros sin título o autor.
        />
        <input
          name="author"
          type="text"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          name="isbn"
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
        />
        <input
          name="genre"
          type="text"
          placeholder="Género"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          name="pages"
          type="number"
          placeholder="Páginas"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        />
        <button type="submit" className="book-add-button">
          Agregar Libro
        </button>
      </form>
    </div>
  );
}

export default BookAdd;

/* 
El componente BookAdd.jsx es el encargado de la creación de datos. Es un formulario "controlado" 
(porque React tiene el control total de lo que escribes en cada cuadro) que envía la información al backend de Symfony.
*/
