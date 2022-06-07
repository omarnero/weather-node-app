console.log("hello node");
const form = document.querySelector("form");
const country = document.querySelector("input");
const p1 = document.querySelector("#message-1");
const p2 = document.querySelector("#message-2");
const getData = async (country) => {
  p1.textContent = "Loading ...";
  try {
    const response = await fetch(`/whethar?address=${country}`);
    const data = await response.json();
    const { country: cou, city } = data;
    p1.textContent = cou;
    p2.textContent = city;
  } catch {
    // console.log("error in get data");
    p1.textContent = "error in get data";
    p2.textContent = "";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getData(country.value);
  country.value = "";
});
