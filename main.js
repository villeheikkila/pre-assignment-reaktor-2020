document.addEventListener("DOMContentLoaded", () => {
	document.getElementById('fetchData').addEventListener('click', async (event) => {
		event.preventDefault();

		// Fetch the local file
		const getData = await fetch('status.real', { mode: 'no-cors' })
		const textData = await getData.text()

		// Packages are split with a blank line
		const arrayData = textData.split("\n\n")

		// Format the data to a nice array of objects
		const data = arrayData.reduce((collected, element) => {
			const splitElement = element.split("\n")
			const filter = splitElement.filter(line => line.startsWith("Package") || line.startsWith("Depends"))
			const package = filter[0] && filter[0].replace("Package: ", "")
			const dependencies = filter[1] ? filter[1].replace("Depends: ", "").split(", ") : null;
			const result = {
				package,
				dependencies,
			}
			collected.push(result)
			return collected;

		}, [])

		console.log(data)

	})
});
