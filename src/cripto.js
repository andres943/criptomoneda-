// selectores
const form = document.querySelector("#form-search");
const moneda = document.querySelector("#moneda");
const criptomoneda = document.querySelector("#criptomonedas");
const formContainer = document.querySelector(".form-side");
const containerAnswer = document.querySelector(".container-answer");

// se crea una variable y tendra atirbutos

const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}
 //crear un evento se ejecuta cuando se refresca el DOM y llama la funcion Crip

document.addEventListener('DOMContentLoaded', () => {
    consultarCriptos();

// se realiza el evento de submit dentro del documents y directamente se realiza el preven y recuperar el selector del codigo de objeto 
// y se ejecute cuando se cambie el valor
    form.addEventListener('submit', submitForm);
    moneda.addEventListener('change', getValue);
    criptomoneda.addEventListener('change', getValue);
})

function submitForm(e){
    e.preventDefault();
    const {moneda, criptomoneda} = objBusqueda;
    if (moneda === '' || criptomoneda === '') {
        showError('Seleccione ambas monedas...');
        return;
    }
    consultarAPI(moneda, criptomoneda);
    //console.log(moneda);
    //console.log(criptomoneda);
}
// se devuelve dos parametros de atributo con la api
function consultarAPI(moneda, criptomoneda){
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    fetch(url)
        .then(resultado => resultado.json())
        .then(resultadoJson => {
            mostrarCotizacion(resultadoJson.DISPLAY[criptomoneda][moneda]);
            //console.log(resultadoJson.DISPLAY[criptomoneda][moneda]);
        })
        .catch(error => console.log(error));
}
// se envia la data basica que se quiere visualizar con una destructuracion
function mostrarCotizacion(data){
    clearHTML();
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE} = data;
    const answer = document.createElement('div');
    answer.classList.add('display-info');
    answer.innerHTML = `
        <p class="main-price">Precio: <span>${PRICE}</span></p>
        <p>Precio más alto del día:: <span>${HIGHDAY}</span></p>
        <p>Precio más bajo del día: <span>${LOWDAY}</span></p>
        <p>Variación últimas 24 horas: <span>${CHANGEPCT24HOUR}%</span></p>
        <p>Última Actualización: <span>${LASTUPDATE}</span></p>
    `;
    
    
    containerAnswer.appendChild(answer);
}
// clase error color rojo en el div y container
function showError(mensage){
    const error = document.createElement('p');
    error.classList.add("error");
    error.textContent = mensage;
    formContainer.appendChild(error);
    setTimeout(() => error.remove(), 3000);
}

function getValue(e){
    objBusqueda[e.target.name] = e.target.value; 
}
//se llama a la priera api nos devuelve los 10 objetos cript que nos devuelve un get
function consultarCriptos(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    //llamado al fetch 
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(respuestaJson => {
            selectCriptos(respuestaJson.Data);
            
            //console.log(respuestaJson.Data); prueba y hay erro que lo muestre
        })
        .catch(error => console.log(error));
}
 // aqui devuelve el arreglo de objetos con un forEach para criptos
function selectCriptos(criptos){
    criptos.forEach(cripto => {
        const {FullName, Name} = cripto.CoinInfo;
        const option = document.createElement("option");
        option.value = Name;
        option.textContent = FullName;
        criptomoneda.appendChild(option);
    });
}

function clearHTML(){
    containerAnswer.innerHTML = '';
}