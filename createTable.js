
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
const createTable = (id, data, name, reverse = "") => {
    // Empty the table
    id.innerHTML = "";
    const text = name ? document.createTextNode("List of all the " + reverse + " dependencies of the package " + name) : document.createTextNode("List of all the installed packages")
    id.appendChild(text)

    data.forEach(package => {
        let row = id.insertRow();
        let cell = row.insertCell()
        row.insertCell()

        // Each package has a button with its own name as an id
        let button = document.createElement("BUTTON")
        button.addEventListener('click', (event) => {
            event.preventDefault();
            id.innerHTML = "";

            // Filter data for the packages that depend on the selected package
            const dependencies = data.filter(e => package.dependencies.includes(e.name))

            // Filter data for reverse dependencies
            const reverseDependencies = data.filter(e => e.dependencies.includes(package.name))
            console.log("dependencies ", dependencies)

            if (dependencies.length === 0) noDepsElement(id)
            else {
                createTable(id, dependencies, package.name)
                if (dependencies.length === 0) createTable(document.getElementById("package-two"), reverseDependencies, package.name, "reverse")

            }
        })

        button.innerHTML = package.name
        button.id = package.name
        cell.appendChild(button)
    })
}
