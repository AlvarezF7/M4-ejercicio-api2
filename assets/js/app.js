//encapsulacion de clases con api ghibli 
// DOCUMENTACION https://ghibliapi.vercel.app/#section/Studio-Ghibli-API
const btnOne = document.querySelector("#titleD");
const btnTwo = document.querySelector("#years");
const btnThree = document.querySelector("#filterYear");
const btnFour = document.querySelector("#titleDes");
const btnFive = document.querySelector("#list");
const cards = document.querySelector(".cards");


function mostrarCards(data) {
  cards.innerHTML = "";
  data.forEach(pelicula => {
   console.log("Datos de la película:", pelicula);
    cards.innerHTML += `
      <div class="cardBody">
      <img src="${pelicula.image}" alt="${pelicula.title}">
        <ul>
          ${pelicula.title ? `<li class="info">Nombre: ${pelicula.title} </li>` : ""}<br>
          ${pelicula.director ? `<li class="info">Director : ${pelicula.director}</li>` : ""}
          ${pelicula.release_date ? `<li class="info">Año: ${pelicula.release_date}</li>` : ""}
          ${pelicula.description ? `<li class="info">Descripción: ${pelicula.description}</li>` : ""}
          ${pelicula.id ? `<li class="info">ID:${pelicula.id}</li>` : ""}
        </ul>
      </div>
    `;
  });

}
 class GhibliApi{
    #cache
    constructor (baseUrl = "https://ghibliapi.vercel.app/films") {
        this.baseUrl = baseUrl;
        this.#cache = null;
    }

     async #getFilms() {
        if (this.#cache) return this.#cache; //contiene el array-obj
        const response = await fetch(this.baseUrl);
        if (!response.ok) throw new Error("Error al obtener films");

        const data = await response.json();
        this.#cache = data;
        console.log(data);
        return data; 
    }
   
    async mostrarFilms(tipo = "todo") {
        await this.#getFilms();
         switch (tipo) {
            case "titulos_directores":
                return this.titulos_directores();
            case "titulos_anios":
                return this.titulos_anios();
            case "filtrar_anios":
                return this.filtrar_anios();
            case "titulos_descripcion":
                return this.titulos_descripcion();
            case "listar_ID":
                return this.listar_ID();
            default:
                return this.#cache; 
   
    }
  }
    titulos_directores() {
    if (!this.#cache) return []; //devuelve array vacio para no romper codigo
    return this.#cache.map(film => ({  
      title: film.title,
      director: film.director,
      image: film.image
    }));
  }
  //metodo para filtrar  titulos y años
  titulos_anios(){
    if (!this.#cache) return [];
    return this.#cache.map(film => ({
        title:film.title,
        release_date: film.release_date,
        image: film.image
        
    }));
  }
   filtrar_anios(){
    if (!this.#cache) return [];
    const anio = prompt("Seleciona el año a buscar:");
    if(!anio) return[];
     return this.#cache
     .filter( film => film.release_date === anio)      
     .map(film => ({
        title:film.title,
        release_date: film.release_date,
        image: film.image 
     }))  
    }
   
   titulos_descripcion(){
    if (!this.#cache) return [];
    return this.#cache.map(film => ({
        title:film.title,
        description: film.description,
        image: film.image
    }));
   }
   listar_ID(){
    if (!this.#cache) return [];
    return this.#cache.map(film =>({
        image: film.image,
        id:film.id
    }));
   }
}

const mostrarApi = new GhibliApi();

async function btns(tipo) {
  const data = await mostrarApi.mostrarFilms(tipo);
  mostrarCards(data);
}

btnOne.addEventListener("click", () => btns("titulos_directores"));
btnTwo.addEventListener("click", () => btns("titulos_anios"));
btnThree.addEventListener("click", () => btns("filtrar_anios"));
btnFour.addEventListener("click", () => btns("titulos_descripcion"));
btnFive.addEventListener("click", () => btns("listar_ID"));



