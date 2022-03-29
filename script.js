const selectColor = document.querySelector("#select-color");
const selectMode = document.querySelector("#select-mode");
const getColorSchemeBtn = document.querySelector("#get-color-scheme-btn");
// let colorArray = [];

getColorSchemeBtn.addEventListener("click", function (event) {
  event.preventDefault();
  // console.log(selectColor.value);
  // console.log(selectMode.value);
  document.querySelector(".clipboard").textContent = "Click value to copy";
  const seedColor = selectColor.value.substr(1);
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${selectMode.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      // colorArray.length = 0;
      const colorArray = [];
      const hexArray = [];
      const rgbArray = [];
      const hslArray = [];
      const nameArray = [];
      for (let i = 0; i < 5; i++) {
        // console.log(`----COLOR NUMBER ${i + 1}----`);
        // console.log(document.querySelector('body').children[i])
        // console.log(`${data.colors[i].hex.value}`);
        // console.log(`${data.colors[i].rgb.value}`);
        // console.log(`${data.colors[i].hsl.value}`);
        // console.log(`${data.colors[i].name.value}`);
        colorArray.push(data.colors[i].hex.value);
        hexArray.push(data.colors[i].hex.value);
        hslArray.push(data.colors[i].hsl.value);
        rgbArray.push(data.colors[i].rgb.value);
        nameArray.push(data.colors[i].name.value);
        // console.log(
        //   `${~parseInt(data.colors[i].hex.value.substr(1), 16).toString(2)}`
        // );
        // console.log(`${data.colors[i].hex.value.substr(1)}`);
        // console.log(invertColor(data.colors[i].hex.value));
      }
      document.body.style.background = invertColor(colorArray[2]);
      document.querySelectorAll(".colordiv").forEach((colordiv, index) => {
        colordiv.style.background = colorArray[index];
      });
      document.querySelectorAll(".hexdiv").forEach((hexdiv, index) => {
        // console.log(hexArray);
        hexdiv.textContent = hexArray[index];
      });
      document.querySelectorAll(".namediv").forEach((namediv, index) => {
        // console.log(hexArray);
        namediv.textContent = nameArray[index];
      });
      document.querySelectorAll(".hsldiv").forEach((hsldiv, index) => {
        // console.log(hexArray);
        hsldiv.textContent = hslArray[index];
      });
      document.querySelectorAll(".rgbdiv").forEach((rgbdiv, index) => {
        // console.log(hexArray);
        rgbdiv.textContent = rgbArray[index];
      });
    });
});

function invertColor(colorHex) {
  // console.log(colorHex);
  colorHex = parseInt(Number(colorHex.replace("#", "0x")), 10);
  // console.log(colorHex);
  let invertedColorHex = ~colorHex;
  // console.log(colorHex);
  invertedColorHex = invertedColorHex >>> 0;
  // console.log(colorHex);
  invertedColorHex = invertedColorHex & 0x00ffffff;
  // console.log(colorHex);
  invertedColorHex = "#" + invertedColorHex.toString(16).padStart(6, "0");

  return invertedColorHex;
}

document.querySelectorAll("p").forEach((pElement) => {
  pElement.addEventListener("click", function (event) {
    // console.log(event.target);
    navigator.clipboard.writeText(event.target.textContent);
    document.querySelector(
      ".clipboard"
    ).textContent = `${event.target.textContent} value copied`;
  });
  // text.select();
  // navigator.clipboard.writeText(text.textContent);
});
