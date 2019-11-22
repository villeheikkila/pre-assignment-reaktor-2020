document.addEventListener("DOMContentLoaded", () => {
	document.getElementById('fetchData').addEventListener('click', (event) => {
		event.preventDefault();
		fetch('status.real', { mode: 'no-cors' })
			.then(response => response.text())
			.then((data) => {
				console.log(data)
			})
	});
});
