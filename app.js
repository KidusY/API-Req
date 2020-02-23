//Search by breed
function getDogBreed(breed) {
	fetch(`https://dog.ceo/api/breed/${breed}/images`)
		.then((response) => response.json())
		.then((responseJson) => {
			console.log(responseJson.message);
			displayResultsForbreed(responseJson);
		})
		.catch((err) => console.log(err));
}

//get random dog pics
function getDogImage(load = 3) {
	fetch(`https://dog.ceo/api/breeds/image/random/${load}`)
		.then((response) => response.json())
		.then((responseJson) => {
			console.log(responseJson);
			displayResultsForRandom(responseJson);
		})
		.catch((error) => alert('Something went wrong. Try again later.'));
}
//generate by breed
function watchFormForBreed() {
	$('.SearchbyBreed').submit((e) => {
		e.preventDefault();
		let value = $('#SearchbyBreed').val().trim();
		getDogBreed(value);
	});
}

//generate random pic
function watchFormForRandomPic() {
	//on submit
	$('.SearchRandomPic').submit((e) => {
		e.preventDefault();
		let value = $('.range')[0].value;

		//validator
		if (value <= 0) {
			$('img').remove();
			$('.error').text('ERROR');
		} else {
			$('.error').text('');
			getDogImage(value);
		}
	});



}

//display results for breed
function displayResultsForbreed(url) {
	let random = Math.floor(Math.random() * Math.floor(50));
	$('img').remove();
	$('h2').remove();
	if (url.code == 404) {
		console.log('error');
		$('.resultsforBreed').append(`<h2>${url.message}"</h2>`);
	} else {
		$('h2').remove();
		console.log(url);
		$('.resultsforBreed').append(`<img src="${url.message[random]}" alt="">`);
	}
}

//display results for random pics
function displayResultsForRandom(url) {
	let store = [];
	$('img').remove();
	for (let links of url.message) {
		store.push(links);
	}

	for (let imgLinks of store) {
		$('.results').append(`<img src="${imgLinks}" alt=""> `);
	}
}

$(function () {
	console.log('App loaded! Waiting for submit!');
	watchFormForRandomPic();
	watchFormForBreed();
});