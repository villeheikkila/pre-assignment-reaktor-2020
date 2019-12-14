const clearContent = (id) => {
    const element = document.getElementById(id);
    element.innerHTML = "";
}

const newElement = (id, type, content, func) => {
    const element = document.getElementById(id);
    element.innerHTML = "";
    const create = document.createElement(type);
    create.innerHTML = content;
    if (func) {
        create.addEventListener('click', (e) => {
            e.preventDefault();
            func()
        })
    }
    element.appendChild(create)
};

const insertCell = (id, cellId) => {
    const element = document.getElementById(id);
    const row = element.insertRow();
    const cell = row.insertCell();
    cell.id = cellId;
    row.insertCell();
    return cellId;
};

const manageHeader = (text, id = "textHeader") => newElement(id, "h2", text);

const manageDescription = (text, id = "description") => newElement(id, "p", text);

const statistics = (data, id = "statistics") => newElement(id, "h3", `Number of packages installed: ${data.length}`);

const noDepsElement = (id, name) => {
    manageHeader(`Package ${name} has no dependencies or reverse dependencies`);
    newButton(id, "Go back to start", () => createTable(id, getData()));
};

const newPackageEvent = (id, name) => {
    const data = getData();

    const packageData = data.filter(e => e.name === name)[0]
    const description = packageData.description
    const deps = packageData.dependencies

    // Filter the dependencies of the package from overall data
    const dependencies = data.filter(e => deps.includes(e.name));

    // Filter the reverse dependencies of the package from overall data. 
    const reverseDependencies = data.filter(e => e.dependencies.includes(name));

    // Set tag for the first element of the array so that it's easy to insert a header for the row
    if (dependencies.length > 0) dependencies[0].text = "List of all the dependencies";
    if (reverseDependencies.length > 0) reverseDependencies[0].text = "List of all the reverse dependencies";

    const combined = dependencies.concat(reverseDependencies);

    // If there's no dependencies or reverse dependencies, show link pack to home view
    if (combined.length === 0) noDepsElement(id, name);
    else createTable(id, combined, `Information about package ${name}`, description);
}

// A function that renders a table with a list of all the installed packages
const createTable = (id, data, text = "List of all installed packages", description = "") => {
    console.log("TCL: createTable -> description", description)
    clearContent(id);

    data.forEach(package => {
        manageHeader(text);
        manageDescription(description)

        // If the package is marked, display text indicating the category above it
        if (package.text) {
            const textId = insertCell(id, package.text[16])
            newElement(textId, "h3", package.text)

            const cellId = insertCell(id, package.name)
            newElement(cellId, 'button', package.name, () => newPackageEvent(id, package.name))
        } else {
            const cellId = insertCell(id, package.name)
            newElement(cellId, 'button', package.name, () => newPackageEvent(id, package.name))
        };
    });
};