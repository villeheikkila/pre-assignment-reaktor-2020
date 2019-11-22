
const noDepsElement = (id) => {
    const noDependencies = document.createTextNode("Package has no dependencies")
    let backButton = document.createElement('BUTTON');
    backButton.innerHTML = "Go back to start"
    backButton.addEventListener('click', () => {
        const oldData = JSON.parse(window.localStorage.getItem('packages'))
        createTable(id, oldData)
    })

    id.appendChild(noDependencies)
    id.appendChild(backButton)
}

// A function that renders a table with a list of all the installed packages
const createTable = (id, data) => {
    data.forEach(package => {
        let row = id.insertRow();
        let cell = row.insertCell()
        row.insertCell()

        // Each package has a button with its own name as an id
        let button = document.createElement("BUTTON")
        button.addEventListener('click', (event) => {
            event.preventDefault();

            // Empty the table
            id.innerHTML = "";

            // Filter data for the packages that depend on the selected package
            const dependencyData = data.filter(e => e.dependencies.includes(package.name))
            if (dependencyData.length === 0) noDepsElement(id)
            createTable(id, dependencyData)

        })

        button.innerHTML = package.name
        button.id = package.name
        cell.appendChild(button)
    })
}
