document.addEventListener("DOMContentLoaded", () => {
	document.getElementById('fetchData').addEventListener('click', async (event) => {
		event.preventDefault();
		// Fetch, parse and save data.
		const rawData = await fetchData();
		const data = parseData(rawData);
		saveData(data);

		// Render statistics
		statistics(data);

		// Render table of packages
		createTable("package", data);
	})
});