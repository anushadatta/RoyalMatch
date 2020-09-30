// Club = 1
// Diamond = 2
// Heart = 3
// Spade = 4

function calculate() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "kings_preferences": [2, 3, 1, 4], "queens_preferences": [3, 1, 4, 2] });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:5000/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}