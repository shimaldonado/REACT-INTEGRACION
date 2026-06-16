import { useState } from "react";
import usePosts from "../hooks/usePosts";

function GestorPosts() {
  const {
    posts,
    cargando,
    error,
    agregarPost,
    eliminarPost
  } = usePosts();

  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [autor, setAutor] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const postsFiltrados = posts.filter((post) =>
    post.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  async function manejarEnvio(evento) {
    evento.preventDefault();

    if (
      titulo.trim() === "" ||
      contenido.trim() === "" ||
      autor.trim() === ""
    ) {
      alert("Debe completar el título, el contenido y el autor.");
      return;
    }

    if (titulo.trim().length < 5) {
      alert("El título debe tener mínimo 5 caracteres.");
      return;
    }

    if (contenido.trim().length < 10) {
      alert("El contenido debe tener mínimo 10 caracteres.");
      return;
    }

    await agregarPost(titulo, contenido, autor);

    setTitulo("");
    setContenido("");
    setAutor("");
  }

  function manejarEliminacion(id) {
    const confirmar = confirm("¿Está seguro de eliminar esta publicación?");

    if (confirmar) {
      eliminarPost(id);
    }
  }

  if (cargando) {
    return (
      <section className="card">
        <p>Cargando publicaciones...</p>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>Gestor de publicaciones</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={manejarEnvio} className="formulario">
        <label htmlFor="titulo">Título:</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ingrese el título"
        />

        <label htmlFor="contenido">Contenido:</label>
        <textarea
          id="contenido"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          placeholder="Ingrese el contenido"
          rows="4"
        />

        <label htmlFor="autor">Autor:</label>
        <input
          id="autor"
          type="text"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          placeholder="Ingrese el nombre del autor"
        />

        <button type="submit">Crear publicación</button>
      </form>

      <hr />

      <h3>Publicaciones registradas</h3>

      <p className="total-posts">
        Total de publicaciones: {posts.length}
      </p>

      <label htmlFor="busqueda">Buscar publicación:</label>
      <input
        id="busqueda"
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar por título"
      />

      {postsFiltrados.length === 0 ? (
        <p>No existen publicaciones que coincidan con la búsqueda.</p>
      ) : (
        <div className="lista-posts">
          {postsFiltrados.map((post) => (
            <article className="post" key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
              <p className="autor">
                <strong>Autor:</strong> {post.autor}
              </p>

              <button
                className="btn-eliminar"
                onClick={() => manejarEliminacion(post.id)}
              >
                Eliminar
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default GestorPosts;