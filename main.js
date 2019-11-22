// Wait till the content has been loaded
document.addEventListener("DOMContentLoaded", () => {
	// Listen to a click on the fetchData button
	document.getElementById('fetchData').addEventListener('click', async (event) => {
		event.preventDefault();
		const data = await fetchData();
		window.localStorage.setItem('packages', JSON.stringify(data))
		const id = document.getElementById("package")
		const text = "List of all installed packages"
		createTable(id, data, text)
	})
});