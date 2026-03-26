/* IMPORTACIÓN Y PROPS */
import React, { useState } from "react";
// Importamos useState que es la "memoria a corto plazo" de este formulario

function BookAdd(props) {
  const { setBooks } = props;
  // setBooks: Es la función que nos "presta" App.jsx para que podamos añadir el libro a la lista global cuando terminemos.

  /* LOS "CAJONES" DE MEMORIA (Estados Locales)  */
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [genre, setGenre] = useState("");
  const [pages, setPages] = useState("");
  /* 
    Creamos un estado para cada dato que le pedimos al usuario. Empiezan vacios ("")
    y se irán llenando a medida que el usuario teclee.
  */

  /* EL ENVÍO (handleSubmit) */
  const handleSubmit = async (e) => {
    // La función es async porque tiene que esperar a el servidor de Symfony haga su magia

    e.preventDefault();
    // Evita que la página se refresque. Sin esto perderíamos el estado de React y ya no tendríamos una Single Page Application

    const newBook = {
      title,
      author,
      isbn,
      category: genre, // le asignamos a la propiedad de Symfony categoría la propiedad que hemos hecho en React 'genre' (dejamos este nombre para que sea más intuitiva para el usuario)
      pages: parseInt(pages) || 0, // convertimos pages a número entero (parseInt) ya que sino React guardaría el número como "200" y no 200
    };
    // Fabricamos el objeto que vamos a mandar al backend.

    try {
      /* PETICIÓN AL SERVIDOR (Fetch POST) */
      const response = await fetch("/book/anadir", {
        // usamos el endpoint /book/anadir que configuramos en Symfony

        method: "POST", // El método es POST porque estamos creando algo nuevo
        headers: {
          "Content-Type": "application/json", // le avisamos a Symfony que vamos a enviar un objeto JSON
        },
        body: JSON.stringify(
          newBook,
        ) /* Convertimos el objeto newBook a una cadena de texto plana porque el protocolo HTTP
             no entiende de objetos de JavaScript, solo de texto */,
      });

      /* ACTUALIZACIÓN Y LIMPIEZA DE LA INTERFAZ */
      if (response.ok) {
        setBooks((prevBooks) => [...prevBooks, newBook]);
        /* Si Symfony nos dice que lo ha recibido y guardado "ok", actualizamos la parrila de libros usando
           el operador spread (..prevBooks). Con esto decimos que coja todo lo que había y pegue lo nuevo al final */

        setTitle("");
        setAuthor("");
        setIsbn("");
        setGenre("");
        setPages("");
        // Vaciamos los campos del formulario apra que el usuario pueda meter otro libro sin tener que borrar a mano
        console.log("Libro añadido con éxito");
      }
    } catch (error) {
      console.error("Error al añadir el libro:", error);
    }
  };

  return (
    <div className="book-add-container">
      <h3>Agregar Nuevo Libro</h3>
      <form onSubmit={handleSubmit} className="book-add-form">
        {/* EL DIBUJO VISUAL (Inputs Controlados) */}
        <input
          name="title"
          type="text"
          placeholder="Título"
          value={title} // El input muestra lo qe diga el estado.
          onChange={(e) => setTitle(e.target.value)} // Cada vez que pulsas una tecla, 'e.target.value' ejecutas 'setTitle' y actualizas el estado esa letra y actualiza el estado.
          required
          // Con esto el input y el estado siempre están sincronizados
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
