const container = document.getElementById("wondersContainer");
const searchInput = document.getElementById("searchInput");

let allWonders = [];

async function loadWonders() {
    try {
        const response = await fetch(
            "https://www.world-wonders-api.org/v0/wonders/"
        );

        allWonders = await response.json();

        console.log(allWonders[0]);
    
        displayWonders(allWonders);

    } catch (error) {
        console.log(error);
        container.innerHTML =
            "<h2>Failed to load wonders.</h2>";
    }
}

function displayWonders(wonders) {

    container.innerHTML = "";

    wonders.forEach(wonder => {

        container.innerHTML += `
            <div class="card">

                <div class="card-content">

                    <h2>${wonder.name}</h2>

                    <p>
                        <b>Location:</b>
                        ${wonder.location}
                    </p>
                    <p>
                        ${wonder.summary ?
                        wonder.summary.substring(0,100) + "..."
                        : "No description available"}
                    </p>

                </div>

            </div>
        `;
    });
}

searchInput.addEventListener("input", () => {

    const searchText =
        searchInput.value.toLowerCase();

    const filtered = allWonders.filter(wonder =>
        wonder.name.toLowerCase()
        .includes(searchText)
    );

    displayWonders(filtered);

});

loadWonders();