document.addEventListener("DOMContentLoaded", () => {
	document.getElementById('fetchData').addEventListener('click', async (event) => {
		event.preventDefault();

		// Fetch the local status.real file
		const getData = await fetch('status.real', { mode: 'no-cors' })
		const textData = await getData.text()

		// Split the text file by package
		const arrayData = textData.split("\n\n")

		// Format the data to a nice array of objects
		const data = arrayData.reduce((collected, element) => {
			// Remove all unneeded lines
			const filter = element.split("\n").filter(line => line.startsWith("Package") || line.startsWith("Depends"))

			// Parse the relevant package and dependency information
			const name = filter[0] && filter[0].replace("Package: ", "")
			const depWithVersions = filter[1] ? filter[1].replace("Depends: ", "").split(", ") : [];
			const dependencies = depWithVersions.map(dep => dep.length > 1 ? dep.split(" ")[0] : dep)

			const result = {
				name,
				dependencies,
			}

			collected.push(result)
			return collected;
		}, [])

		// A function that renders a table with a list of all the installed packages
		const createTable = (id, data) => {
			console.log("hei", id)
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
						const noDependencies = document.createTextNode("Package has no dependencies")
						id.appendChild(noDependencies)
						console.log("The package has no dependencies")
					}

					createTable(id, dependencyData)

				})

				button.innerHTML = package.name
				button.id = package.name
				cell.appendChild(button)
			})
		}

		// Selects the HTML element where to render
		const id = document.getElementById("package")

		createTable(id, data)
	})
});