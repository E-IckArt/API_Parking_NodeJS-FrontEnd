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
        console.error(response.status);
    }
}

function displayData(dataTable) {
    console.table(dataTable);
    const parkings = []; // Création d'une liste des reservations
    for (let parking of dataTable) {
        Reflect.deleteProperty(parking, '_id'); // Retire les propriétés qu'on ne veut pas afficher
        Reflect.deleteProperty(parking, '__v'); // Retire les propriétés qu'on ne veut pas afficher
        parkings.push(parking);

        const tbody = document.getElementById('tbody'); // Elément tbody du tableau
        const newRow = tbody.insertRow(); // Créer une nouvelle ligne dans le tableau
        let counter = 0;
        for (const key in parking) {
            const newCell = newRow.insertCell(counter);
            newCell.classList.add(`${[key]}`);
            const newText = document.createTextNode(parking[key]); // La méthode createTextNode() permet de créer un noeud de texte
            newCell.appendChild(newText);
            counter++;
        }

        // Ajoute le bouton "modifier" sur chaque ligne
        let modifText = 'Modifier';
        const modifBtnCell = newRow.insertCell(-1); // Insère une cellule à la fin de la ligne
        const modifBtn = document.createElement('button');
        const modifBtnText = document.createTextNode(modifText);
        modifBtn.classList.add(`btn`, `btn-warning`);
        modifBtn.setAttribute(`id`, `modifParking${parking.id}`);
        modifBtn.appendChild(modifBtnText);
        modifBtnCell.appendChild(modifBtn);

        // Ajoute le bouton "supprimer" sur chaque ligne
        let deleteText = 'Supprimer';
        const deleteBtnCell = newRow.insertCell(-1);
        const deleteBtn = document.createElement('button');
        const deleteBtnText = document.createTextNode(deleteText);
        deleteBtn.classList.add(`btn`, `btn-danger`);
        deleteBtn.setAttribute(`id`, `deleteParking${parking.id}`);
        deleteBtn.appendChild(deleteBtnText);
        deleteBtnCell.appendChild(deleteBtn);
    }

    parkingCount.innerText = `(${parkings.length})`; //Affiche le nombre de parkings dans la zone dédiée
}
