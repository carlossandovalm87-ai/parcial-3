const nameElement = document.getElementById("dnd-name");
const imgElement = document.getElementById("dnd-img");
const buttonElement = document.querySelector("#random-monster-button");
const monsterInput = document.getElementById("monster-input"); 
const monsterResult = document.getElementById("monster-result"); 

const randomMonsterButton = document.getElementById("random-monster-button");
randomMonsterButton.addEventListener("click", obtenerRandomMonster);

async function obtenerRandomMonster() {
    nameElement.innerHTML = "Buscando un D&D Monster al azar...";

    try {
        const response = await fetch(`https://www.dnd5eapi.co/api/monsters`);
        const monsters = await response.json();
        const randomMonster = monsters.results[Math.floor(Math.random() * monsters.results.length)];

        try {
            const monsterResponse = await fetch(`https://www.dnd5eapi.co${randomMonster.url}`);
            const monsterData = await monsterResponse.json();
            monsterResult.innerHTML = `
                <h2>${monsterData.name}</h2>
                <p><strong>Index:</strong> ${monsterData.index}</p>
                <p><strong>Size:</strong> ${monsterData.size}</p>
                <p><strong>Type:</strong> ${monsterData.type}</p>
                <p><strong>Alignment:</strong> ${monsterData.alignment}</p>
                <p><strong>Armor Class:</strong> ${monsterData.armor_class}</p>
                <p><strong>Hit Points:</strong> ${monsterData.hit_points}</p>
                <p><strong>Challenge Rating:</strong> ${monsterData.challenge_rating}</p>
            `;
            nameElement.innerHTML = monsterData.name;
            imgElement.src = `https://www.dnd5eapi.co${monsterData.image}`;
            imgElement.style.display = "block";
        }catch (error) {
            console.error("Error al obtener los detalles del monstruo:", error);
            nameElement.innerHTML = "Error al obtener los detalles del monstruo.";
        }
    
    }catch (error) {
        console.error("Error al obtener la lista de monstruos:", error);
        nameElement.innerHTML = "Error al obtener la lista de monstruos.";
    }
}
