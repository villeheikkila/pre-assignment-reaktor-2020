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
            if (dependencyData.length === 0) {
                const noDependencies = document.createTextNode("Package has no dependencies \n")
                let linkElement = document.createElement('BUTTON');
                let linkText = document.createTextNode("Go back to start");
                linkElement.appendChild(linkText);
                linkElement.title = "Go back to start";

                document.body.appendChild(linkElement);
                id.appendChild(noDependencies)
                id.appendChild(linkElement)
                console.log("The package has no dependencies")
            }

            createTable(id, dependencyData)

        })

        button.innerHTML = package.name
        button.id = package.name
        cell.appendChild(button)
    })
}