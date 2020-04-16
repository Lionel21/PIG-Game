/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    // gamePlaying => permet de lancer le jeu si celui-ci n'est pas terminé
    if (gamePlaying) {
        // Etapes à suivre pour réaliser la fonction

        // 1 - Afficher un nombre aléatoire compris <> 1 et 6

        var dice = Math.floor(Math.random() * 6 + 1);
        console.log(dice);

        // 2 - Afficher le résultat

        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';


        // 3 - Mettre à jour le score par tour SEULEMENT si le nombre obtenu n'est pas == à 1
        // Si dice == 1, le tour passe à l'autre joueur automatiquement
        if (dice !== 1) {
            roundScore += dice;
            // Affichage de la nouvelle valeur sur l'interface de l'utilisateur qui joue
            document.querySelector("#current-" + activePlayer).textContent = roundScore
        } else {
            nextPlayer();
        }
    }

});

// Fonction pour sauvegarder les scores lorsque les joueurs tombent sur la valeur 1

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Etape 1 : ajouter le score actuel du joueur à son score global
        scores[activePlayer] += roundScore;

        // Etape 2 : mettre à jour l'interface du joueur
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Etape 3 : vérifier si le joueur a bien gagné la partie
        if (scores[activePlayer] >= 20) {
            // S'il gagne => affichage du message 'Winner!'
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            // Faire disparaître le dé
            document.querySelector('.dice').style.display = 'none';
            // Ajout de la classe 'winner' au joueur actif
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            // Suppression de la classe 'active' pour le joueur actif
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }

});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    // Remise à zéro si le joueur tombe sur un dé de 1
    document.getElementById('current-0').textcontent = 0;
    document.getElementById('current-1').textcontent = 0;

    // toggle : sert à basculer le token
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Si le dé numéro est sélectionné, l'image n'apparaît pas sur le navigateur
    document.querySelector('.dice').style.display = 'none';
}

// Méthode qui permet de réinitialiser le jeu
document.querySelector('.btn-new').addEventListener('click', init);

    // 1ere étape : réinitialisation des scores des joueurs
    // 2e étape : remettre le socre à 0 pour le joueur actif
    // 3e étape : remettre à 0 le score roundScore
    // Utilisation de la fonction 'init()' pour réinitialiser toutes les valeurs

// Méthode qui permet de réinitialiser toutes les valeurs
function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Lorsque le jeu est réinitialisé, les noms des joueurs réaparaissent
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}