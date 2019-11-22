
// Wait till the content has been loaded
document.addEventListener("DOMContentLoaded", () => {
	// Listen to a click on the fetchData button
	document.getElementById('fetchData').addEventListener('click', async (event) => {
		event.preventDefault();

		const data = await fetchData();
		const id = document.getElementById("package")
		createTable(id, data)
	})
});