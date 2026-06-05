const container = document.getElementById("wondersContainer");
const searchInput = document.getElementById("searchInput");
const loader = document.getElementById("loader");

let wonders = [];

async function loadWonders() {

    loader.style.display = "block";

    try {

        const response = await fetch(
            "https://www.world-wonders-api.org/v0/wonders/"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        wonders = await response.json();

        renderWonders(wonders);

    }
    catch (error) {

        console.error(error);

        container.innerHTML =
            "<h2 style='text-align:center'>Failed to load wonders.</h2>";

    }
    finally {

        loader.style.display = "none";

    }
}

function renderWonders(data) {

    const html = data.map(wonder => {

        const image =
            wonder.links?.images?.[0] ||
            wonder.images?.[0] ||
            "https://picsum.photos/400/250";

        const summary =
            wonder.summary ||
            wonder.description ||
            "No summary available.";

        return `
            <div class="card">

                <img
                    src="${image}"
                    alt="${wonder.name}"
                    onerror="this.src='https://picsum.photos/400/250'"
                >

                <div class="card-content">

                    <h2>${wonder.name}</h2>

                    <p>
                        <strong>Location:</strong>
                        ${wonder.location || "Unknown"}
                    </p>

                    <button
                        onclick="showSummary(
                            '${wonder.name.replace(/'/g, "\\'")}',
                            \`${summary.replace(/`/g, "")}\`
                        )"
                    >
                        View Details
                    </button>

                </div>

            </div>
        `;
    }).join("");

    container.innerHTML = html;
}

function showSummary(name, summary) {

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
            width:90%;
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

            <button
                style="
                    padding:10px 15px;
                    border:none;
                    background:#ef4444;
                    color:white;
                    border-radius:6px;
                    cursor:pointer;
                "
                onclick="this.closest('.modal-box')?.parentElement.remove() || this.parentElement.parentElement.remove()"
            >
                Close
            </button>

        </div>
    `;

    modal.addEventListener("click", function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });

    document.body.appendChild(modal);
}

let debounceTimer;

searchInput.addEventListener("input", function() {

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {

        const keyword = this.value.trim().toLowerCase();

        const filtered = wonders.filter(wonder =>
            wonder.name.toLowerCase().includes(keyword)
        );

        renderWonders(filtered);

    }, 300);
});

loadWonders();