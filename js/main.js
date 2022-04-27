let time = 0
let timeMilli = 0
let timeStart
let lineCheckInterval
let correctWords = 0
let errors = 0
let errorsPercentage
let wpm

// Setting up the test paragraph
let paragraph = `We can always carry this a step further. There's really no end to this. Absolutely no pressure. You are just a whisper floating across a mountain. Volunteering your time; it pays you and your whole community fantastic dividends. Van Dyke Brown is a very nice brown, it's almost like a chocolate brown. Follow the lay of the land. It's most important. It's life. It's interesting. It's fun. I think there's an artist hidden in the bottom of every single one of us. You can't make a mistake. Anything that happens you can learn to use - and make something beautiful out of it. We don't have to be concerned about it. We just have to let it fall where it will. A thin paint will stick to a thick paint. When things happen - enjoy them. They're little gifts. Get tough with it, get strong. We have no limits to our world. We're only limited by our imagination. This is probably the greatest thing that's ever happened in my life. I spend a lot of time walking around in the woods and talking to trees, and squirrels, and little rabbits and stuff. Do an almighty painting with us. If we're going to have animals around we all have to be concerned about them and take care of them. A fan brush is a fantastic piece of equipment. Use it. Make friends with it. We'll put a happy little bush here. So often we avoid running water, and running water is a lot of fun. Be careful. You can always add more - but you can't take it away. All you have to learn here is how to have fun. This is a happy place, little squirrels live here and play. But we're not there yet, so we don't need to worry about it. Trees get lonely too, so we'll give him a little friend. In nature, dead trees are just as normal as live trees. It is a lot of fun. Just think about these things in your mind and drop em' on canvas. Nothing wrong with washing your brush. Anytime you learn something your time and energy are not wasted. Sometimes you learn more from your mistakes than you do from your masterpieces.`
let wordLibrary = paragraph.split(' ')
let wordLibraryI = 0
let letterArray = wordLibrary[wordLibraryI].split('')
let letterArrayI = 0
let currentLetter = ''
let lettersTyped = ''
let lettersTypedInt = 0
let lettersTypedIntPrevious = -1
let correctLetter
let newLetter = false
let pastLettersTyped
let pastLettersTypedInt
let letterCheckInterval

let pastWords
let currentWord
let futureWords
let currentWordLibraryInt
let wordTyped

let testRunning = false

// alert(document.getElementById('placeToPutCurrentWords').getBoundingClientRect().top)

// Start button checker
document.getElementById('startButton').addEventListener('click',startTest)

// Press keydown
document.getElementById('placeToType').addEventListener('keydown', event => {
    if (event.code === 'Enter' && testRunning == false) {
        startTest()
    }
    if (event.code === 'Space' && testRunning == true) {
        checkWord()
    }
    if(event.code === 'Backspace'){
        letterArrayI -= 1
    }

    // console.log(lettersTyped)
    // console.log(lettersTyped.length)
    // console.log(lettersTypedInt)
    // console.log(letterArrayI)
    // if (testRunning == true && event.code !== 'ShiftLeft' && event.code !== 'Space' && event.code !== 'Enter' && event.code !== 'Backspace') {
    //     newLetter = true
    // }
    // if(testRunning == true && event.code !== 'Backspace'){
    //     if(event.code == "KeyA" || event.code == "KeyB" || event.code == "KeyC" || event.code == "KeyD" || event.code == "KeyE" || event.code == "KeyF" || event.code == "KeyG" || event.code == "KeyH" || event.code == "KeyI" || event.code == "KeyJ" || event.code == "KeyK" || event.code == "KeyL" || event.code == "KeyM" || event.code == "KeyN" || event.code == "KeyO" || event.code == "KeyP" || event.code == "KeyQ" || event.code == "KeyR" || event.code == "KeyS" || event.code == "KeyT" || event.code == "KeyU" || event.code == "KeyV" || event.code == "KeyW" || event.code == "KeyX" || event.code == "KeyY" || event.code == "KeyZ" || event.code == "Comma" || event.code == "Period" || event.code == "Digit1" || event.code == "Digit2" || event.code == "Digit3" || event.code == "Digit4" || event.code == "Digit5" || event.code == "Digit6" || event.code == "Digit7" || event.code == "Digit8" || event.code == "Digit9" || event.code == "Digit0" || event.code == "Minus" || event.code == "Equal" || event.code == "BracketLeft" || event.code == "BracketRight" || event.code == "Semicolon"  || event.code == "Quote"){
    //         newLetter = true
    //     }
    // }
})

// ========================
// Start/Restart Test
// ========================

function startTest(){
    clearInterval(timeStart)
    clearInterval(lineCheckInterval)
    clearInterval(letterCheckInterval)
    timeMilli = 6000
    time = timeMilli / 100
    time = time.toFixed(2)
    correctWords = 0
    wpm = 0
    currentWord = ''
    currentWordLibraryInt = 0
    pastWords = ''
    lettersTyped = ''
    lettersTypedIntPrevious = -1
    futureWords = paragraph
    testRunning = true
    document.getElementById('time').innerText = time
    document.getElementById('correctWords').innerText = correctWords
    document.getElementById('errors').innerText = errors
    document.getElementById('placeToPutCurrentWords').style.display = 'inline'
    document.getElementById('placeToPutFutureWords').innerText = futureWords
    document.getElementById('placeToType').value = ''
    document.getElementById('placeToType').focus();
    timeStart = setInterval(countdownTime, 10)
    lineCheckInterval = setInterval(lineCheck, 10)
    letterCheckInterval = setInterval(checkIfNewLetter, 1)
    selectFirstWord()
}

// ========================
// Time Countdown
// ========================

function countdownTime(){
    if(timeMilli <= 0){
        stopTest()
    }
    else{
        timeMilli -= 1
        time = timeMilli / 100
        time = time.toFixed(2)
        document.getElementById('time').innerText = time
    }
}

// ========================
// Check if word is correct
// ========================

function checkWord(){
    wordTyped = document.getElementById('placeToType').value
    wordTyped = wordTyped.replace(/\s+/g, '')
    document.getElementById('placeToType').value = ''
    addToLettersTyped()

    if(wordTyped == ' ' || wordTyped == ''){
        return
    }
    else if(wordTyped == currentWord && testRunning == true){
        correctWords += 1
        document.getElementById('correctWords').innerText = correctWords
        selectNextWord()
    }
    else if(wordTyped != currentWord && testRunning == true){
        errors += 1
        document.getElementById('errors').innerText = errors
        selectNextWord()
    }
}

// ========================
// Check if there is a new letter
// ========================

function checkIfNewLetter(){
    lettersTyped = document.getElementById('placeToType').value
    lettersTyped = lettersTyped.replace(/\s+/g, '')
    lettersTypedInt = lettersTyped.length - 1
    if(lettersTypedInt == letterArrayI){
        newLetter = true
        checkLetter()
    }
}

// ========================
// Check if letter is correct
// ========================

function checkLetter(){
    letterArray = wordLibrary[wordLibraryI].split('')
    if(newLetter == false){
        return
    }
    else if(document.getElementById('placeToType').value == ''){
        return
    }
    else if(document.getElementById('placeToType').value == ' '){
        return
    }
    else if(newLetter == false && document.getElementById('placeToType').value == ''){
        return
    }
    else if(newLetter == false && document.getElementById('placeToType').value == ' '){
        return
    }
    else{
        currentLetter = lettersTyped.charAt(lettersTypedInt)

        if(currentLetter == letterArray[letterArrayI] ){
            letterArrayI += 1
            newLetter = false
            return
        }
        else if(currentLetter !== letterArray[letterArrayI] && lettersTypedInt == letterArrayI){
            letterArrayI += 1
            errors += 1
            document.getElementById('errors').innerText = errors
            newLetter = false
            console.log(lettersTyped)
            console.log(lettersTypedInt)
            console.log(currentLetter)
            console.log(letterArray[letterArrayI])
            console.log(letterArrayI)
            console.log(letterArray)
            return
        }
    }
}

// ========================
// Stop the test
// ========================

function stopTest(){
    clearInterval(timeStart)
    clearInterval(lineCheckInterval)
    clearInterval(letterCheckInterval)
    testRunning = false
    document.querySelector('main').style.display = 'none'
    document.getElementById('endContainer').style.display = 'flex'
    calculateWPM()   
}

// ========================
// Add to letters typed
// ========================

function addToLettersTyped(){
    pastLettersTyped = pastLettersTyped + wordTyped + ' '
}

// ========================
// Calculating WPM
// ========================

function calculateWPM(){
    pastLettersTyped = pastLettersTyped.replace(/\s+/g, '')
    pastLettersTyped = pastLettersTyped.replace('undefined', '')
    pastLettersTypedInt = pastLettersTyped.length
    wpm = (pastLettersTypedInt / 5)
    errorsPercentage = ((pastLettersTypedInt - errors) / pastLettersTypedInt) * 100
    errorsPercentage = errorsPercentage.toFixed(1)
    errorsPercentage = `${errorsPercentage}%`
    document.getElementById('placeToPutWPM').innerText = wpm
    document.getElementById('finalErrors').innerText = errorsPercentage
}

// ========================
// First word selection
// ========================

function selectFirstWord(){
    pastWords = pastWords + currentWord + ' '
    currentWord = wordLibrary[currentWordLibraryInt]
    futureWords = futureWords.replace(currentWord,'')
    
    document.getElementById('placeToPutPastWords').innerText = pastWords
    document.getElementById('placeToPutCurrentWords').innerText = currentWord
    document.getElementById('placeToPutFutureWords').innerText = futureWords
}

// ========================
// Next word selection
// ========================

function selectNextWord(){
    wordLibraryI += 1
    letterArrayI = 0
    currentWordLibraryInt += 1
    pastWords = pastWords + currentWord + ' '
    currentWord = wordLibrary[currentWordLibraryInt]
    futureWords = futureWords.replace(currentWord,'')
    document.getElementById('placeToPutPastWords').innerText = pastWords
    document.getElementById('placeToPutCurrentWords').innerText = currentWord
    document.getElementById('placeToPutFutureWords').innerText = futureWords
}

// ========================
// Check if the current word is on the top line or not
// ========================

function lineCheck(){
    if(document.getElementById('placeToPutCurrentWords').getBoundingClientRect().top > 295){
        pastWords = ''
        document.getElementById('placeToPutPastWords').innerText = pastWords
    }
}