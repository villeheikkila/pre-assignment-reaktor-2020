// Wait till the content has been loaded
document.addEventListener("DOMContentLoaded", () => {
	// Listen to a click on the fetchData button
	document.getElementById('fetchData').addEventListener('click', async (event) => {
		event.preventDefault();
		// Fetch data and save it to local store
		const data = await fetchData();
		saveData(data);

		// Render statistics
		statistics(data);

		// Render table of packages
		const id = document.getElementById("package");
		const text = "List of all installed packages";
		createTable(id, data, text);
	})
});