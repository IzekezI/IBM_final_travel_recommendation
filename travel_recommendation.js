let search;
let btnSrch = document.getElementById("btnSrch");
let btnRst = document.getElementById("btnRst");
let outty = document.getElementById("outty");

btnRst.addEventListener('click',resetForm);
function resetForm() {
    document.getElementById("outty").value = "";
    console.log ('Output cleared!');
}

let result = (name, imageUrl, description) => {
    outty.innerHTML=`
    <h2>${name}</h2>
    <img src=${imageUrl}>
    <p>${description}</p>
  `;
}

const output_process = () => {
    search = document.getElementById("srchField").value;
    let loweredSearch = search.toLowerCase();

    fetch("./travel_recommendation_api.json")
    .then(response => response.json())
    .then((data) => {

        data.countries.map((country) => {
            country.cities.map((city) => {
                if (city.name.toLowerCase().includes(loweredSearch)) {
                    result(city.name, city.imageUrl, city.description);
                } 
            });
        });

        data.temples.map((temple) => {
            if (temple.name.toLowerCase().includes(loweredSearch)) {
                result(temple.name, temple.imageUrl, temple.description);
            } 
        });

        data.beaches.map((beach) => {
            if (beach.name.toLowerCase().includes(loweredSearch)) {
                result(beach.name, beach.imageUrl, beach.description);

            } 
        });
    }
)};
btnSrch.addEventListener('click',output_process);