"use strict";

var _conexion = require("../../../../../documents/criptomoneda/src/conexion");
test("Recibimos info", function () {
  (0, _conexion.getCripto)().then(function (data) {
    expect(data.length).not.toEqual(0);
  });
});
test("No recibimos indefinido", function () {
  (0, _conexion.getCripto)().then(function (data) {
    expect(data).not.toEqual(undefined);
  });
});