const container = document.getElementById("wondersContainer");
const searchInput = document.getElementById("searchInput");

let wonders = [];

async function loadWonders() {

    try {

        const response = await fetch(
            "https://www.world-wonders-api.org/v0/wonders/"
        );

        const data = await response.json();

        wonders = data;

        renderWonders(wonders);

    }
    catch(error){

        console.log(error);

        container.innerHTML =
        "<h2>Failed to load wonders.</h2>";

    }

}

function renderWonders(data){

    container.innerHTML = "";

    data.forEach(wonder => {

        const image =
            wonder.links?.images?.[0] ||
            wonder.images?.[0] ||
            "https://picsum.photos/400/250";

        const summary =
            wonder.summary ||
            wonder.description ||
            "No summary available.";

        container.innerHTML += `
            <div class="card">

                <img src="${image}" alt="${wonder.name}">

                <div class="card-content">

                    <h2>${wonder.name}</h2>

                    <p>
                        <b>Location:</b>
                        ${wonder.location || "Unknown"}
                    </p>

                    <br>

                    <button
                        onclick="showSummary(
                            '${wonder.name.replace(/'/g, "\\'")}',
                            \`${summary}\`
                        )"
                    >
                        View Details
                    </button>

                </div>

            </div>
        `;

    });

}

function showSummary(name, summary){

    const modal = document.createElement("div");

    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.background = "rgba(0,0,0,0.7)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "9999";

    modal.innerHTML = `
        <div style="
            background:white;
            width:80%;
            max-width:700px;
            padding:20px;
            border-radius:10px;
            max-height:80vh;
            overflow:auto;
        ">

            <h2>${name}</h2>

            <br>

            <p>${summary}</p>

            <br>

            <button onclick="this.closest('div').parentElement.remove()">
                Close
            </button>

        </div>
    `;

    document.body.appendChild(modal);

}

searchInput.addEventListener("input", function(){

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