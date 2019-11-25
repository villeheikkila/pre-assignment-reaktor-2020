const clearContent = (id) => {
    const element = document.getElementById(id);
    element.innerHTML = "";
}

const newElement = (id, type, content) => {
    const element = document.getElementById(id);
    const create = document.createElement(type);
    create.innerHTML = content;
    element.appendChild(create)
};

const newButton = (id, text, func) => {
    const element = document.getElementById(id);
    const button = document.createElement('button');
    button.innerHTML = text
    button.addEventListener('click', (e) => {
        e.preventDefault();
        func()
    })
    element.appendChild(button)
};

const insertCell = (id, cellId) => {
    const element = document.getElementById(id);
    const row = element.insertRow();
    const cell = row.insertCell();
    cell.id = cellId;
    row.insertCell();
    return cellId;
};

const manageHeader = (text, id = "textHeader") => {
    clearContent(id);
    newElement(id, "h2", text);
};

const statistics = (data, id = "statistics") => {
    clearContent(id);
    newElement(id, "h3", `Number of packages installed: ${data.length}`);
}

const noDepsElement = (id, name) => {
    manageHeader(`Package ${name} has no dependencies or reverse dependencies`);
    clearContent(id);
    newButton(id, "Go back to start", () => createTable(id, getData()));
};

const newPackageEvent = (id, deps, name) => {
    const data = getData();
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
    else createTable(id, combined, "");
}

// A function that renders a table with a list of all the installed packages
const createTable = (id, data, text = "List of all installed packages") => {
    clearContent(id);

    data.forEach(package => {
        const header = text ? text : `Information about package ${package.name}`;
        manageHeader(header);

        // If the package is marked, display text indicating the category above it
        if (package.text) {
            const textId = insertCell(id, package.text[16])
            newElement(textId, "h3", package.text)

            const cellId = insertCell(id, package.name)
            newButton(cellId, package.name, () => newPackageEvent(id, package.dependencies, package.name))
        } else {
            const cellId = insertCell(id, package.name)
            newButton(cellId, package.name, () => newPackageEvent(id, package.dependencies, package.name))
        };
    });
};