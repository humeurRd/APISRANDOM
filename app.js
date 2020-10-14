const charactersList = document.getElementById('charactersList'); // Obtener id de la lista
const searchBar = document.getElementById('searchBar'); // Obtener id de la barra de búsqueda
let hpCharacters = []; // Array de caracteres

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase(); // Valor buscado a minúsculas

    const filteredCharacters = hpCharacters.filter((character) => { // filtrar los caracteres
        return (
            character.name.toLowerCase().includes(searchString) || // Mostrar el nombre del caracter
            character.house.toLowerCase().includes(searchString) // Mostrar la casa del caracter
        );
    });
    displayCharacters(filteredCharacters); // Mostrar los caracteres
});

const loadCharacters = async () => { // Función asyncrona para llamara a la api
    try {
        const res = await fetch('https://hp-api.herokuapp.com/api/characters'); // await url de la api
        hpCharacters = await res.json(); // await al json
        displayCharacters(hpCharacters); // mostrar los carácteres
    } catch (err) {
        console.error(err); // mandar error
    }
};

const displayCharacters = (characters) => { // Función mostrar los carácteres
    const htmlString = characters
        .map((character) => {
            return `
            <li class="character">
                <h2>${character.name}</h2>
                <p> </br> Casa: ${character.house}</br>
                Cumpleaños: ${character.dateOfBirth}</br>
                Actor: ${character.actor}</br></p>
                <img src="${character.image}"></img>
                
            </li>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};

loadCharacters(); // Cargar los carácteres
