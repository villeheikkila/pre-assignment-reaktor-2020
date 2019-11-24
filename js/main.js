document.addEventListener("DOMContentLoaded", () => {
	document.getElementById('fetchData').addEventListener('click', async (event) => {
		event.preventDefault();
		// Fetch data and save it to local store
		const data = await fetchData();
		saveData(data);

		// Render statistics
		statistics(data);

		// Render table of packages
		createTable("package", data);
	})
});