"use strict";

var _generador = require("./generador");
test("el elemento se construye con la info", function () {
  var criptomoneda = {
    "photoUrl": "urlP",
    "title": "titulo",
    "totalTime": 50,
    "url": "url",
    "description": "desc"
  };
  var elemento = (0, _generador.constructR)(criptomoneda);
  var hijos = elemento.childNodes;
  expect(hijos[1].innerText).toBe(criptomoneda.title);
});