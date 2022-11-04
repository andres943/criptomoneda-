"use strict";

var _conexion = require("./conexion");
var _generador = require("./generador");
//var _mapas = require("./mapas");
var app = document.getElementById('app');
getcripto().then(function (data) {
  return data.forEach(function (e) {
    app.appendChild((0, _generador.constructR)(e));
  });
});