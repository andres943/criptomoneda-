import { getCripto } from "../../../../../documents/criptomoneda/src/conexion";


test("Recibimos info", () => {
    getCripto()
    .then(data => {
        expect(data.length).not.toEqual(0);
    })
})

test("No recibimos indefinido", () => {
    getCripto()
    .then(data => {
        expect(data).not.toEqual(undefined);
    })
})