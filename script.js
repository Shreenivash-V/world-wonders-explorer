const container =
document.getElementById(
"wondersContainer"
);

const searchInput =
document.getElementById(
"searchInput"
);

const loader =
document.getElementById(
"loader"
);

let wonders = [];

async function loadWonders(){

    try{

        const response = await fetch(
            "https://www.world-wonders-api.org/v0/wonders/"
        );

        const data =
        await response.json();

        wonders = data;

        renderWonders(wonders);

        loader.style.display =
        "none";

    }
    catch(error){

        console.log(error);

        loader.innerHTML =
        "Failed to load wonders.";
    }
}

function renderWonders(data){

    container.innerHTML = "";

    data.forEach(wonder => {

        const image =
        wonder.links?.images?.[0] ||
        wonder.images?.[0] ||
        "https://picsum.photos/400/250";

        container.innerHTML += `
        <div class="card">

            <img
            src="${image}"
            alt="${wonder.name}">

            <div class="card-content">

                <h2>${wonder.name}</h2>

                <p>
                <b>Location:</b>
                ${wonder.location}
                </p>

                <p>
                <b>Period:</b>
                ${wonder.time_period || "N/A"}
                </p>

            </div>

        </div>
        `;
    });

}

searchInput.addEventListener(
"input",
function(){

    const keyword =
    this.value.toLowerCase();

    const filtered =
    wonders.filter(wonder =>
        wonder.name
        .toLowerCase()
        .includes(keyword)
    );

    renderWonders(filtered);

});

loadWonders();