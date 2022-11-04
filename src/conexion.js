const baseURL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;


async function getCripto(){
    const resp = await fetch(baseURL);
    return await resp.json();
}

export { getCripto }

//const url = 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap';


async function getStyle(){
    const resp = await fetch(baseURL);
    return await resp.json();
}

export { getStyle }