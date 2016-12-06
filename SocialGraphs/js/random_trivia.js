// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var randomTrivia = document.getElementById("trivia");

var firstTime = true;

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function trivia(element){

	// When the user clicks on the button, open the modal
	btn.onclick = function() {
    	modal.style.display = "block";
		var ranBtn = randomIntFromInterval(1,6);
		console.log(ranBtn)
		// randomTrivia.innerHTML = "Did you know that " + element.id + "'s most used word is " + element.word + "?";
		switch(ranBtn){
			case 1:
				randomTrivia.innerHTML = "Did you know that " + element.id.bold() + "'s most used word is " + element.word + "?"
				break;
			case 2: 
				randomTrivia.innerHTML = "Did you know that " + element.id.bold() + "'s most related artist is " + mostStylArtist + "?"
				break;
			case 3: 
				randomTrivia.innerHTML = "Did you know that " + element.id.bold() + "'s sentimental analysis is " + element.sentiment + "?"
				break;
			case 4: 
				randomTrivia.innerHTML = "Did you know that " + element.id.bold() + " is from " + element.country + "?"
				break;
			case 5: 
				randomTrivia.innerHTML = "Did you know that there are " + element.num_for_sale + " physical releases on sale from " + element.id.bold() + " available at Discogs?"
				break;
			case 6: 
				randomTrivia.innerHTML = "Did you know that " + element.want + " Discogs users want releases of " + element.id.bold() + " right now?"
		}	
	}
	if(firstTime){
		firstTime = false;
		modal.style.display = "block";
		var ran = randomIntFromInterval(1,6);
		// randomTrivia.innerHTML = "Did you know that " + element.id + "'s most used word is " + element.word + "?";
		switch(ran){
			case 1:
				randomTrivia.innerHTML = "Did you know that " + element.id.bold() + "'s most used word is " + element.word + "?"
				break;
			case 2: 
				randomTrivia.innerHTML = "Did you know that " + element.id.bold() + "'s most related artist from this dataset is " + mostStylArtist + "?"
				break;
			case 3: 
				randomTrivia.innerHTML = "Did you know that " + element.id.bold() + "'s sentimental analysis is " + element.sentiment + "?"
				break;
			case 4: 
				randomTrivia.innerHTML = "Did you know that " + element.id.bold() + " is from " + element.country + "?"
				break;
			case 5: 
				randomTrivia.innerHTML = "Did you know that there are " + element.num_for_sale + " physical releases on sale from " + element.id.bold() + " available at Discogs?"
				break;
			case 6: 
				randomTrivia.innerHTML = "Did you know that " + element.want + " Discogs users want releases of " + element.id.bold() + " right now?"
		}
	}
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}