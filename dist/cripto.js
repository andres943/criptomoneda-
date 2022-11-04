"use strict";

// selectores
var form = document.querySelector("#form-search");
var moneda = document.querySelector("#moneda");
var criptomoneda = document.querySelector("#criptomonedas");
var formContainer = document.querySelector(".form-side");
var containerAnswer = document.querySelector(".container-answer");

// se crea una variable y tendra atirbutos

var objBusqueda = {
  moneda: '',
  criptomoneda: ''
};
//crear un evento se ejecuta cuando se refresca el DOM y llama la funcion Crip

document.addEventListener('DOMContentLoaded', function () {
  consultarCriptos();

  // se realiza el evento de submit dentro del documents y directamente se realiza el preven y recuperar el selector del codigo de objeto 
  // y se ejecute cuando se cambie el valor
  form.addEventListener('submit', submitForm);
  moneda.addEventListener('change', getValue);
  criptomoneda.addEventListener('change', getValue);
});
function submitForm(e) {
  e.preventDefault();
  var moneda = objBusqueda.moneda,
    criptomoneda = objBusqueda.criptomoneda;
  if (moneda === '' || criptomoneda === '') {
    showError('Seleccione ambas monedas...');
    return;
  }
  consultarAPI(moneda, criptomoneda);
  //console.log(moneda);
  //console.log(criptomoneda);
}
// se devuelve dos parametros de atributo con la api
function consultarAPI(moneda, criptomoneda) {
  var url = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=".concat(criptomoneda, "&tsyms=").concat(moneda);
  fetch(url).then(function (resultado) {
    return resultado.json();
  }).then(function (resultadoJson) {
    mostrarCotizacion(resultadoJson.DISPLAY[criptomoneda][moneda]);
    //console.log(resultadoJson.DISPLAY[criptomoneda][moneda]);
  })["catch"](function (error) {
    return console.log(error);
  });
}
// se envia la data basica que se quiere visualizar con una destructuracion
function mostrarCotizacion(data) {
  clearHTML();
  var PRICE = data.PRICE,
    HIGHDAY = data.HIGHDAY,
    LOWDAY = data.LOWDAY,
    CHANGEPCT24HOUR = data.CHANGEPCT24HOUR,
    LASTUPDATE = data.LASTUPDATE;
  var answer = document.createElement('div');
  answer.classList.add('display-info');
  answer.innerHTML = "\n        <p class=\"main-price\">Precio: <span>".concat(PRICE, "</span></p>\n        <p>Precio m\xE1s alto del d\xEDa:: <span>").concat(HIGHDAY, "</span></p>\n        <p>Precio m\xE1s bajo del d\xEDa: <span>").concat(LOWDAY, "</span></p>\n        <p>Variaci\xF3n \xFAltimas 24 horas: <span>").concat(CHANGEPCT24HOUR, "%</span></p>\n        <p>\xDAltima Actualizaci\xF3n: <span>").concat(LASTUPDATE, "</span></p>\n    ");
  containerAnswer.appendChild(answer);
}
// clase error color rojo en el div y container
function showError(mensage) {
  var error = document.createElement('p');
  error.classList.add("error");
  error.textContent = mensage;
  formContainer.appendChild(error);
  setTimeout(function () {
    return error.remove();
  }, 3000);
}
function getValue(e) {
  objBusqueda[e.target.name] = e.target.value;
}
//se llama a la priera api nos devuelve los 10 objetos cript que nos devuelve un get
function consultarCriptos() {
  var url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
  //llamado al fetch 
  fetch(url).then(function (respuesta) {
    return respuesta.json();
  }).then(function (respuestaJson) {
    selectCriptos(respuestaJson.Data);

    //console.log(respuestaJson.Data); prueba y hay erro que lo muestre
  })["catch"](function (error) {
    return console.log(error);
  });
}
// aqui devuelve el arreglo de objetos con un forEach para criptos
function selectCriptos(criptos) {
  criptos.forEach(function (cripto) {
    var _cripto$CoinInfo = cripto.CoinInfo,
      FullName = _cripto$CoinInfo.FullName,
      Name = _cripto$CoinInfo.Name;
    var option = document.createElement("option");
    option.value = Name;
    option.textContent = FullName;
    criptomoneda.appendChild(option);
  });
}
function clearHTML() {
  containerAnswer.innerHTML = '';
}