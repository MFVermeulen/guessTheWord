/*Let's try Javascript*/

var wordArray = ["coffee", "time", "humor", "money", "succes", "pizza"];
var theWord = wordArray[Math.floor((Math.random())*wordArray.length)];
var i = 1;
var hiddenWord = "";
var foundLetters = new Array(theWord.length);
var wordNotFound = true;

while(i <= theWord.length){
	hiddenWord += "_ ";
	i+=1;
}

/*HTML generator part*/

document.querySelector('.hiddenWord').innerHTML = hiddenWord;

document.querySelector('.infoHiddenWord').innerHTML = "<br>Press a key to try to find the word!<br>";

document.getElementById('hint').onclick = function(event) {hintFunction()};

document.onkeydown = function(event) {
						  var keyCode = event.which || event.keyCode;
						  var letter = String.fromCharCode(keyCode);
						  checkLetter(letter.toUpperCase());
						  };

/*********************************************************************************************/



/*Functions part*/

/*Since it is not possible to change characters in a string, lets use the following function.*/

function changeCharAt(string, index, char){
	return string.substr(0, index) + char + string.substr(index+1);
}

function hintFunction() {
	
	if(wordNotFound){
		var notShown = true;
		while(notShown){
			var randomIndex = Math.floor((Math.random())*theWord.length);
			if(foundLetters[randomIndex] != 1){
				notShown = false;		  
			}
		}
		var randomLetter = theWord[randomIndex];
		checkLetter(randomLetter.toUpperCase());
	}
	
}


function checkLetter(theLetter){
	var chosenChar = theLetter;
	var check = -1;
	
	for(j = 0; j < theWord.length; j++){
		if(chosenChar.toUpperCase() === theWord.charAt(j).toUpperCase()){
			if(foundLetters[j] != 1){
				foundLetters[j] = 1;
				check = j;
				j = 10000; /*If the letter has been found, interrupt the for loop.*/
			}
			
		}
	}
	
	if(check == -1){
		document.querySelector('.messageHiddenWord').innerHTML = "<br>" + chosenChar +" is not a missing letter in the word. Try again!<br>";
	} else {
		if(check == 0){
			hiddenWord = changeCharAt(hiddenWord, 0, chosenChar);
		} else {
			newIndex = (check*2);
			hiddenWord = changeCharAt(hiddenWord, newIndex, chosenChar);
		}
		document.querySelector('.hiddenWord').innerHTML = hiddenWord;
		document.querySelector('.messageHiddenWord').innerHTML = "<br>Well done!<br>";
	}
	
	/*Check if all letters have been found.*/
	
	for(k = 0; k < foundLetters.length; k++){
		if(foundLetters[k] == 1){
			wordNotFound = false;
		} else {
			wordNotFound = true; /*If there are still letters pending to be found, skip the for loop and proceed.*/
			k = 10000;
		}
	}
		
	if(wordNotFound == false){
		document.querySelector('.hiddenWord').innerHTML = "Great. The word you were looking for is: " + theWord.toUpperCase() + "!";
		document.querySelector('.infoHiddenWord').innerHTML = "<br><br>";
		document.querySelector('.messageHiddenWord').innerHTML = "";
	}
	
}

/***************************************************************************************/
