const clearTableById = (id) => {
    id.innerHTML = "";
    while (id.firstChild) {
        id.removeChild(id.firstChild);
    };
    id.appendChild(document.createTextNode(""));
};

const manageHeader = (text) => {
    const header = document.getElementById("textHeader");
    header.innerHTML = "";
    let element = document.createElement("h2");
    element.innerHTML = text;
    header.appendChild(element);
};

const statistics = (data) => {
    const header = document.getElementById("statistics");
    header.innerHTML = "";
    let element = document.createElement("h3");
    element.innerHTML = "Number of packages installed: " + data.length;
    header.appendChild(element);
};

const noDepsElement = (id) => {
    clearTableById(id)

    let noDependencies = document.createElement("h3")
    noDependencies.innerHTML = "Package has no dependencies or reverse dependencies"
    let backButton = document.createElement('button');
    const text = "List of all installed packages"
    backButton.innerHTML = "Go back to start"
    backButton.addEventListener('click', () => createTable(id, getData(), text))

    id.appendChild(noDependencies);
    id.appendChild(backButton);
};


// A function that renders a table with a list of all the installed packages
const createTable = (id, data, text) => {
    clearTableById(id);

    data.forEach(package => {
        const header = text ? text : "Information about package " + package.name;
        manageHeader(header);

        let row = id.insertRow();
        let cell = row.insertCell();

        row.insertCell();

        // Create a button for the package.
        let button = document.createElement("button");
        button.innerHTML = package.name;
        button.id = package.name;
        button.class = "packageButton";

        button.addEventListener('click', (event) => {
            event.preventDefault();
            id.innerHTML = "";
            // Filter the dependencies of the package from overall data
            const dependencies = getData().filter(e => package.dependencies.includes(e.name));

            // Filter the reverse dependencies of the package from overall data. 
            const reverseDependencies = getData().filter(e => e.dependencies.includes(package.name));

            // Set tag for the first element of the array so that it's easy to insert a header for the row
            if (dependencies.length > 0) dependencies[0].text = "List of the dependencies";
            if (reverseDependencies.length > 0) reverseDependencies[0].text = "List of the all reverse dependencies";

            const combined = dependencies.concat(reverseDependencies);

            // If there's no dependencies or reverse dependencies, show link pack to home view
            if (combined.length === 0) noDepsElement(id);
            else createTable(id, combined, "");
        });

        // If the package is marked, display text indicating the category above it
        if (package.text) {
            let row = id.insertRow();
            let cell2 = row.insertCell();
            row.insertCell();

            let categoryText = document.createElement("h3");
            categoryText.innerHTML = package.text;

            cell.appendChild(categoryText);
            cell2.appendChild(button);
        } else {
            cell.appendChild(button);
        };
    });
};
