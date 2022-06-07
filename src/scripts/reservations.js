const reservationsURL = new URL('http://localhost:8080/reservations');
const reservationCount = document.getElementById('reservationCount');

// Appel de l'api créée pour affichage dans le navigateur
fetch(reservationsURL)
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
    const reservations = []; // liste des reservations
    for (let reservation of dataTable) {
        Reflect.deleteProperty(reservation, '_id'); // Retire les propriétés qu'on ne veut pas afficher
        Reflect.deleteProperty(reservation, '__v'); // Retire les propriétés qu'on ne veut pas afficher
        reservations.push(reservation); // Ajoute la reservation à la liste des réservations
        const tbody = document.getElementById('tbody'); // Elément tbody du tableau
        const newRow = tbody.insertRow(); // Créer une nouvelle ligne dans le tableau
        let counter = 0;
        for (const key in reservation) {
            const newCell = newRow.insertCell(counter);
            const newText = document.createTextNode(reservation[key]); // La méthode createTextNode() permet de créer un noeud de texte
            newCell.appendChild(newText);
            counter++;
        }
    }
    reservationCount.innerText = `(${reservations.length})`; //Affiche le nombre de réservations dans la zone dédiée
}
