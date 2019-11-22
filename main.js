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
			const package = filter[0] && filter[0].replace("Package: ", "")
			const depWithVersions = filter[1] ? filter[1].replace("Depends: ", "").split(", ") : [];
			const dependencies = depWithVersions.map(dep => dep.length > 1 ? dep.split(" ")[0] : dep)

			const result = {
				package,
				dependencies,
			}

			collected.push(result)
			return collected;

		}, [])

		console.log("depTrimmed", data)


	})
});
