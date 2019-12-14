const parseName = (string) => string.replace("Package: ", "")

const parseDependencies = (string) => {
    const depWithVersions = string ? string.replace("Depends: ", "").split(", ") : [];
    const normal = depWithVersions.filter(e => !e.includes("|")).map(dep => dep.length > 1 ? dep.split(" ")[0] : dep)
    const alternatives = depWithVersions.filter(e => e.includes("|")).map(e => e.split(" | ")).flat().map(dep => dep.length > 1 ? dep.split(" ")[0] : dep)
    return { normal, alternatives }
}

const parseDescription = (string) => {
    const lastIndex = string.lastIndexOf("Homepage:") !== -1 ? string.lastIndexOf("Homepage:") : string.lastIndexOf("Original") !== -1 ? string.lastIndexOf("Original") : string.length
    const descriptionRaw = string.substring(string.lastIndexOf("Description:"), lastIndex).replace("Description: ", "").replace(".", " ").replace(/\s\s+/g, ' ')
    return descriptionRaw.charAt(0).toUpperCase() + descriptionRaw.substr(1)
}

const parsePackageInformation = (data) => {
    // Split the text file by package
    const arrayData = data.split("\n\n");

    // Format the data to a nice array of objects
    const modifiedData = arrayData.reduce((collected, element) => {
        const filter = element.split("\n").filter(line => line.startsWith("Package") || line.startsWith("Depends"))
        if (!filter[0]) return collected;

        const name = parseName(filter[0])
        const { normal: dependencies, alternatives } = parseDependencies(filter[1])

        const description = element.includes("Description") ? parseDescription(element) : null

        collected.push({
            name,
            dependencies,
            description,
            alternatives
        });

        return collected;
    }, [])

    return modifiedData.sort((a, b) => a.name > b.name);
}