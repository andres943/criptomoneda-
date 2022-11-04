import { getCripto } from './conexion'
import { constructR } from './generador'
import {getStyle} from "./style.css"

const app = document.getElementById('app');

getcripto()
.then(data => data.forEach(e => {
    app.appendChild(constructR(e))
}));

