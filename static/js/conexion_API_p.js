let pag = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
btnSiguiente.addEventListener("click", () => {
  if (pag < 1000) {
    pag += 1;
    cargarPeliculas();
  }
});

btnAnterior.addEventListener("click", () => {
  if (pag > 1) {
    pag -= 1;
    cargarPeliculas();
  }
});

const cargarPeliculas = async () => {
  try {
    const respuesta = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=5312b064d79def161f3441b9bc5eeecc&language=es-COL&page=${pag}`
    );

    console.log(respuesta);

    // ESTA CONDICIONAL ES PARA SABER SI LA RESPUESTA ES CORRECTA ÑIÑO
    if (respuesta.status === 200) {
      const datos = await respuesta.json();

      let peliculas = "";
      datos.results.forEach((pelicula) => {
        peliculas += `
        <div class="pelicula">
        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
        <h3 class"titulo" style="color: red;">${pelicula.title}</h3>
        </div>
        
       `;
      });

      // SEPARACION PA NO PERDERME
      document.getElementById("contenedor").innerHTML = peliculas;
    } else if (respuesta.status === 401) {
      console.log("la cago papi...");
    } else if (respuesta.status === 404) {
      console.log("esa película no está aquí julio...");
    } else {
      console.log(
        "existe un error que desconocemos, que programadores tan malos contrate.."
      );
    }
  } catch (error) {
    console.log(error);
  }
};

cargarPeliculas();
