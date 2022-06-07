const parkingsURL = new URL('http://localhost:8080/parkings');
const parkingCount = document.getElementById('parkingCount');

// Appel de l'api créée pour affichage dans le navigateur
fetch(parkingsURL)
    .then(manageResponse)
    .then(displayData)
    .catch((error) => console.error(error));
function manageResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        response.status(400).json({ error });
        console.log(response.status);
    }
}

function displayData(dataTable) {
    const parkings = []; // liste des reservations
    for (let parking of dataTable) {
        Reflect.deleteProperty(parking, '_id'); // Retire les propriétés qu'on ne veut pas afficher
        Reflect.deleteProperty(parking, '__v'); // Retire les propriétés qu'on ne veut pas afficher
        parkings.push(parking);

        const tbody = document.getElementById('tbody'); // Elément tbody du tableau
        const newRow = tbody.insertRow(); // Créer une nouvelle ligne dans le tableau
        let counter = 0;
        for (const key in parking) {
            const newCell = newRow.insertCell(counter); // La méthode createTextNode() permet de créer un noeud de texte

            const newText = document.createTextNode(parking[key]);
            newCell.appendChild(newText);
            counter++;
        }
    }

    parkingCount.innerText = `(${parkings.length})`; //Affiche le nombre de parkings dans la zone dédiée
}
