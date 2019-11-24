// Function that returns the data from status.real file
const fetchData = async () => {
    const getData = await fetch('/data/status.real', { mode: 'no-cors' });
    const textData = await getData.text();

    // Split the text file by package
    const arrayData = textData.split("\n\n");

    // Format the data to a nice array of objects
    const data = arrayData.reduce((collected, element) => {
        // Remove all unneeded lines. If no matching entries are found, return.
        const filter = element.split("\n").filter(line => line.startsWith("Package") || line.startsWith("Depends"))
        if (!filter[0]) return collected;

        // Parse the relevant package and dependency information
        const name = filter[0] && filter[0].replace("Package: ", "");
        const depWithVersions = filter[1] ? filter[1].replace("Depends: ", "").split(", ") : [];
        const dependencies = depWithVersions.map(dep => dep.length > 1 ? dep.split(" ")[0] : dep);

        collected.push({
            name,
            dependencies,
        });

        return collected;
    }, [])

    // Sort alphabetically
    return data.sort((a, b) => a.name > b.name);
};

// Helper functions to manage the local storage
const saveData = (data) => window.localStorage.setItem('packages', JSON.stringify(data));
const getData = () => JSON.parse(window.localStorage.getItem('packages'));
