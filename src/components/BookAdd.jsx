import React, { useState } from "react";

function BookAdd(props) {
  const { setBooks } = props;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [genre, setGenre] = useState("");
  const [pages, setPages] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = {
      title,
      author,
      isbn,
      category: genre,
      pages: parseInt(pages) || 0,
    };

    try {
      const response = await fetch("/book/anadir", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        setBooks((prevBooks) => [...prevBooks, newBook]);
        setTitle("");
        setAuthor("");
        setIsbn("");
        setGenre("");
        setPages("");
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
        <input name="title" type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input name="author" type="text" placeholder="Autor" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <input name="isbn" type="text" placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
        <input name="genre" type="text" placeholder="Género" value={genre} onChange={(e) => setGenre(e.target.value)} />
        <input name="pages" type="number" placeholder="Páginas" value={pages} onChange={(e) => setPages(e.target.value)} />
        <button type="submit" className="book-add-button">Agregar Libro</button>
      </form>
    </div>
  );
}

export default BookAdd;
