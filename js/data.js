// Function that returns the data from status.real file
const fetchData = async () => {
    const getData = await fetch('/data/status.real', { mode: 'no-cors' });
    return await getData.text();
};

const saveData = (data) => window.localStorage.setItem('packages', JSON.stringify(data));

const getData = () => JSON.parse(window.localStorage.getItem('packages'));

