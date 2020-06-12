let opciones = document.getElementById("opciones");
let opciones2 = document.getElementById("opciones2");
ponerOpciones(opciones);
ponerOpciones(opciones2);
let btn = document.getElementById("btn");

btn.addEventListener("click", (e) => {
  let v1 = obtenerOpciones(opciones);
  let v2 = obtenerOpciones(opciones2);
  fetch(
    "https://free.currconv.com/api/v7/convert?q=" +
      v1 +
      "_" +
      v2 +
      "&compact=ultra&apiKey=bc000818fffe49c95c15"
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});
function ponerOpciones(arg) {
  fetch(
    "https://free.currconv.com/api/v7/currencies?apiKey=bc000818fffe49c95c15"
  )
    .then((res) => res.json())
    .then((data) => {
      const valores = data.results;
      const currenciesName = Object.values(valores);
      const sigla = Object.keys(valores);
      let cont = 0;
      sigla.forEach((elem) => {
        let option = document.createElement("option");
        option.textContent = elem + " - " + currenciesName[cont].currencyName;
        option.id = cont;
        arg.appendChild(option);
        cont++;
      });
    });
}
function obtenerOpciones(o) {
  const opcionElegida = o.selectedOptions;
  let textoElegido = opcionElegida[0].textContent;
  textoElegido = textoElegido.substr(0, 3);
  return textoElegido;
}
