let contenedor = document.querySelector(".contenedor");

let pokemon = prompt("Ingrese el numero o nombre de pokemon deseado");

const getPokemon = async () => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    const data = await response.json();
    // console.log(`${data.name} es de tipo ${data.types[0].type.name} y ${data.types[1].type.name}`)

    return data;
  } catch (error) {
    console.error(error);
  }
};

const templatePokemon = (pokemon) => {
  const { name, sprites, types, height, weight } = pokemon;
  const pokemonTypes = types.map((typeInfo) => typeInfo.type.name).join("-");
  const pokemonHTML = `
    <div class="card">
    <img src="${sprites.front_default}" alt="${name}" />
    <h2>${name}</h2>
    <p>Type: ${pokemonTypes}</p>
    <p>Height: ${height / 10} Mts</p>
    <p>Weight: ${weight / 10} Kg</p>
    </div>
    `;
  contenedor.innerHTML += pokemonHTML;
};

const renderPokemon = async () => {
  try {
    const pokemon = await getPokemon();
    templatePokemon(pokemon);
  } catch (error) {
    console.error(error);
  }
};

renderPokemon();
