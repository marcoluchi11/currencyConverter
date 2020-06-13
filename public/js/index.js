let opciones = document.getElementById("opciones");
let opciones2 = document.getElementById("opciones2");
let importe = document.getElementById("importe");
importe.value = 0;
let seccion = document.getElementById("resultado");
let revert = document.getElementById("revert");
ponerOpciones(opciones);
ponerOpciones(opciones2);
let btn = document.getElementById("btn");

revert.addEventListener("click", () => {
  let opcion1 = opciones.selectedOptions;
  let opcion2 = opciones2.selectedOptions;

  let aux = opcion2[0].textContent;
  opcion2[0].textContent = opcion1[0].textContent;
  opcion1[0].textContent = aux;
  if (importe.value != 0 || importe.value < 0) {
    borrarHijos();
    btn.click();
  }
});
btn.addEventListener("click", () => {
  let importeFinal = parseInt(importe.value);
  if (isNaN(importeFinal) || importeFinal < 0 || importeFinal === 0) {
    alert("Ingrese valor correcto");
    importe.value = "";
    return;
  }
  let v1 = obtenerOpciones(opciones);
  let v2 = obtenerOpciones(opciones2);

  borrarHijos();
  fetch(
    "https://free.currconv.com/api/v7/convert?q=" +
      v1 +
      "_" +
      v2 +
      "&compact=ultra&apiKey=bc000818fffe49c95c15"
  )
    .then((res) => res.json())
    .then((data) => {
      let concatenado = v1 + "_" + v2;
      importeFinal *= data[concatenado];
      let valorDe = obtenerOpciones(opciones);
      let valorA = obtenerOpciones(opciones2);
      let valorFinal = document.createElement("h5");
      valorFinal.textContent =
        importe.value + " " + valorDe + " = " + valorA + " " + importeFinal;
      seccion.appendChild(valorFinal);
    });
});
function ponerOpciones(arg) {
  fetch(
    "https://free.currconv.com/api/v7/currencies?apiKey=bc000818fffe49c95c15"
  )
    .then((res) => res.json())
    .then((data) => {
      const valores = data.results;
      let currenciesName = Object.values(valores);
      let sigla = Object.keys(valores);
      let cont = 0;
      let arregloFinal = new Array();
      sigla.forEach((elem) => {
        elem += " - ";
        elem = elem.concat(currenciesName[cont].currencyName);
        arregloFinal.push(elem);
        cont++;
      });
      arregloFinal.sort();
      arregloFinal.forEach((elem) => {
        let option = document.createElement("option");
        option.textContent = elem;
        arg.appendChild(option);
      });
    });
}
function obtenerOpciones(o) {
  const opcionElegida = o.selectedOptions;
  let textoElegido = opcionElegida[0].textContent;
  textoElegido = textoElegido.substr(0, 3);
  return textoElegido;
}
function borrarHijos() {
  var e = document.querySelector("#resultado");
  var hijo = e.lastElementChild;
  while (hijo) {
    e.removeChild(hijo);
    hijo = e.lastElementChild;
  }
}
