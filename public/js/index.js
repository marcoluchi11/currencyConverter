let opciones = document.getElementById("opciones");
let opciones2 = document.getElementById("opciones2");
ponerOpciones(opciones);
ponerOpciones(opciones2);
let btn = document.getElementById("btn");

btn.addEventListener("click", (e) => {
  fetch(
    "https://free.currconv.com/api/v7/convert?q=USD_ARS&compact=ultra&apiKey=bc000818fffe49c95c15"
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
      let valores = data.results;
      let currenciesName = Object.values(valores);
      let sigla = Object.keys(valores);
      let cont = 0;
      sigla.forEach((elem) => {
        let option = document.createElement("option");
        option.textContent = elem + " - " + currenciesName[cont].currencyName;
        arg.appendChild(option);
        cont++;
      });
    });
}
