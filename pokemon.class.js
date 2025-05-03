class Pokemon {
    constructor(name, types, moveSet, attackPower, health){
        this.name = name;
        this.types = types;
        this.moveSet = moveSet;
        this.attackPower = attackPower;
        this.health = health;
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
    }

    isAlive() {
        return this.health > 0;
    }
}

function battle(player, enemy) {
    console.log(`\nBattle starts: ${player.name} vs ${enemy.name}\n`);

    while (player.isAlive() && enemy.isAlive()) {
        // Spieler wählt Move
        console.log(`Your moves:`);
        player.moveSet.forEach((move, i) => {
            console.log(`${i + 1}. ${move}`);
        });

        let choice = parseInt(prompt("Choose your move (1 or 2): ")) - 1;
        let chosenMove = player.moveSet[choice] || player.moveSet[0];
        console.log(`${player.name} used ${chosenMove}!`);

        enemy.takeDamage(player.attackPower);
        console.log(`${enemy.name} has ${enemy.health} HP left.`);

        if (!enemy.isAlive()) break;

        // Gegner greift zurück an
        let enemyMove = enemy.moveSet[Math.floor(Math.random() * enemy.moveSet.length)];
        console.log(`${enemy.name} used ${enemyMove}!`);
        player.takeDamage(enemy.attackPower);
        console.log(`${player.name} has ${player.health} HP left.`);
    }

    if (player.isAlive()) {
        console.log(`\n${player.name} wins!`);
    } else {
        console.log(`\n${enemy.name} wins!`);
    }
}

// Pokémons
let pikachu = new Pokemon("Pikachu", ["electric"], ["Thunderbolt", "Quick Attack"], 20, 100);
let glurak = new Pokemon("Glurak", ["fire"], ["Flamethrower", "Scratch"], 25, 100);
let turok = new Pokemon("Turok", ["water"], ["Water Gun", "Bite"], 22, 100);

// Auswahl
let selection = parseInt(prompt("Choose your Pokémon: 1. Pikachu, 2. Glurak, 3. Turok"));
let playerPokemon = [pikachu, glurak, turok][selection - 1];
let enemyPokemon = [pikachu, glurak, turok].filter(p => p !== playerPokemon)[Math.floor(Math.random() * 2)];

battle(playerPokemon, enemyPokemon);