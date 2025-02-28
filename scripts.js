const result = document.querySelector('.result')
const humanScore = document.querySelector('#human-score')
const machineScore = document.querySelector('#machine-score')
const yourChoice = document.querySelector('#your-choice')
const machineChoice = document.querySelector('#machine-choice')
const humanRounds = document.querySelector('#human-rounds')
const machineRounds = document.querySelector('#machine-rounds')
const roundsNumber = document.querySelector('#rounds-number')
const resetGameButton = document.querySelector('#reset-game-button')

let humanScoreNumber = 0
let machineScoreNumber = 0
let humanRoundsWin = 0
let machineRoundsWin = 0
let currentRound = 1

const playHuman = (humanChoice) => {
    letsGame(humanChoice, playMachine())
}

const playMachine = () => {
    const choices = ['rock', 'paper', 'scissors']
    const randomIndex = Math.floor(Math.random() * 3);

    return choices[randomIndex]
}

const letsGame = (human, machine) => {
    const emojis = {
        rock: '&#x270A',
        paper: '&#x270B',
        scissors: '&#x270C'
    }

    if (human === machine) {
        result.innerHTML = 'Empate!'
    } else if (human === 'rock' && machine === 'scissors' ||
        human === 'paper' && machine === 'rock' ||
        human === 'scissors' && machine === 'paper') {
        humanScoreNumber++
        humanScore.innerHTML = humanScoreNumber
        result.innerHTML = 'Jogador venceu!'
    } else {
        machineScoreNumber++
        machineScore.innerHTML = machineScoreNumber
        result.innerHTML = 'Alexa venceu!'
    }

    yourChoice.innerHTML = emojis[human]
    machineChoice.innerHTML = emojis[machine]

    checkRoundWinner()
}

const checkRoundWinner = () => {
    if (humanScoreNumber === 7) {
        humanRoundsWin++
        humanRounds.innerHTML = humanRoundsWin
        result.innerHTML = 'Jogador venceu a rodada!🥳'
        changeColorText()
        disableChoices()
        newRound()
    } if (machineScoreNumber === 7) {
        machineRoundsWin++
        machineRounds.innerHTML = machineRoundsWin
        result.innerHTML = 'Alexa venceu a rodada!🥳'
        changeColorText()
        disableChoices()
        newRound()
    }
}

const newRound = () => {
    if (humanRoundsWin >= 3 || machineRoundsWin >= 3) {
        checkChampion()
    } else {
        setTimeout(() => {
            currentRound++
            roundsNumber.innerHTML = currentRound
            humanScore.innerHTML = humanScoreNumber = 0
            machineScore.innerHTML = machineScoreNumber = 0
            result.innerHTML = 'Escolha sua jogada'
            yourChoice.innerHTML = '?'
            machineChoice.innerHTML = '?'
            enableChoices()
            backToOriginalColor()
        }, 3500);
    }
}

const disableChoices = () => {
    document.querySelectorAll('#button-choice').forEach(choices => choices.disabled = true);
}

const enableChoices = () => {
    document.querySelectorAll('#button-choice').forEach(choices => choices.disabled = false);
}

const checkChampion = () => {
    if (humanRoundsWin === 3) {
        result.innerHTML = 'Jogador ganhou o jogo!🏆'
        disableChoices()
    } if (machineRoundsWin === 3) {
        result.innerHTML = 'Alexa ganhou o jogo!🏆'
        disableChoices()
    }
}

const resetGame = () => {
    humanScore.innerHTML = humanScoreNumber = 0
    machineScore.innerHTML = machineScoreNumber = 0
    result.innerHTML = 'Escolha sua jogada'
    yourChoice.innerHTML = '?'
    machineChoice.innerHTML = '?'
    roundsNumber.innerHTML = currentRound = 1
    humanRounds.innerHTML = humanRoundsWin = 0
    machineRounds.innerHTML = machineRoundsWin = 0
    enableChoices()
    backToOriginalColor()
}

const changeColorText = () => {
    const resultText = document.getElementById('result-text')

    resultText.style.color = 'red'
    resultText.style.fontWeight = 'bold'
}

const backToOriginalColor = () => {
    const resultText = document.getElementById('result-text')

    resultText.style.color = 'black'
    resultText.style.fontWeight = 'normal'
}

resetGameButton.addEventListener('click', resetGame)