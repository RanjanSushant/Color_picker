const selectColor = document.querySelector("#select-color");
const selectMode = document.querySelector("#select-mode");
const getColorSchemeBtn = document.querySelector("#get-color-scheme-btn");

getColorSchemeBtn.addEventListener("click", function (event) {
  event.preventDefault();
  document.querySelector(".clipboard").textContent = "Click value to copy";
  const seedColor = selectColor.value.substr(1);
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${selectMode.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      const colorArray = [];
      const hexArray = [];
      const rgbArray = [];
      const hslArray = [];
      const nameArray = [];
      for (let i = 0; i < 5; i++) {
        colorArray.push(data.colors[i].hex.value);
        hexArray.push(data.colors[i].hex.value);
        hslArray.push(data.colors[i].hsl.value);
        rgbArray.push(data.colors[i].rgb.value);
        nameArray.push(data.colors[i].name.value);
      }
      document.body.style.background = invertColor(colorArray[2]);
      document.querySelectorAll(".colordiv").forEach((colordiv, index) => {
        colordiv.style.background = colorArray[index];
      });
      document.querySelectorAll(".hexdiv").forEach((hexdiv, index) => {
        hexdiv.textContent = hexArray[index];
      });
      document.querySelectorAll(".namediv").forEach((namediv, index) => {
        namediv.textContent = nameArray[index];
      });
      document.querySelectorAll(".hsldiv").forEach((hsldiv, index) => {
        hsldiv.textContent = hslArray[index];
      });
      document.querySelectorAll(".rgbdiv").forEach((rgbdiv, index) => {
        rgbdiv.textContent = rgbArray[index];
      });
    });
});

function invertColor(colorHex) {
  colorHex = parseInt(Number(colorHex.replace("#", "0x")), 10);
  let invertedColorHex = ~colorHex;
  invertedColorHex = invertedColorHex >>> 0;
  invertedColorHex = invertedColorHex & 0x00ffffff;
  invertedColorHex = "#" + invertedColorHex.toString(16).padStart(6, "0");

  return invertedColorHex;
}

document.querySelectorAll("p").forEach((pElement) => {
  pElement.addEventListener("click", function (event) {
    navigator.clipboard.writeText(event.target.textContent);
    document.querySelector(
      ".clipboard"
    ).textContent = `${event.target.textContent} value copied`;
  });
});
