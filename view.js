const newClearElement = (id, type, content) => {
    const element = document.getElementById(id);
    element.innerHTML = "";
    const create = document.createElement(type);
    create.innerHTML = content;
    element.appendChild(create)
}

const newButton = (id, text, func) => {
    const element = document.getElementById(id);
    const button = document.createElement('button');
    button.innerHTML = text
    button.addEventListener('click', (e) => {
        e.preventDefault();
        func()
    })
    element.appendChild(button)
}

const manageHeader = (text) => newClearElement("textHeader", "h2", text);

const statistics = (data) => newClearElement("statistics", "h3", `Number of packages installed: ${data.length}`)

const noDepsElement = (id, name) => {
    manageHeader(`Package ${name} has no dependencies or reverse dependencies`)
    newButton(id, "Go back to start", () => createTable(id, getData()))
};

// A function that renders a table with a list of all the installed packages
const createTable = (idE, data, text = "List of all installed packages") => {
    const id = document.getElementById(idE);
    id.innerHTML = "";

    data.forEach(package => {
        const header = text ? text : "Information about package " + package.name;
        manageHeader(header);

        const row = id.insertRow();
        const cell = row.insertCell();
        row.insertCell();

        // Create a button for the package.
        const button = document.createElement("button");
        button.innerHTML = package.name;
        button.class = "packageButton";

        button.addEventListener('click', () => {
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
            if (combined.length === 0) noDepsElement(idE, package.name);
            else createTable(idE, combined, "");
        });

        // If the package is marked, display text indicating the category above it
        if (package.text) {
            const row2 = id.insertRow();
            const cell2 = row2.insertCell();
            row2.insertCell();

            const categoryText = document.createElement("h3");
            categoryText.innerHTML = package.text;

            cell.appendChild(categoryText);
            cell2.appendChild(button);
        } else {
            cell.appendChild(button);
        };
    });
};
