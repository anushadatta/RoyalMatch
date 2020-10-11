// Club = 0
// Diamond = 1
// Heart = 2
// Spade = 3

function calculate() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "kings_preferences": [
            [2, 3, 1, 0],
            [2, 3, 1, 0],
            [2, 3, 1, 0],
            [2, 3, 1, 0]
        ],
        "queens_preferences": [
            [2, 3, 1, 0],
            [2, 3, 1, 0],
            [2, 3, 1, 0],
            [2, 3, 1, 0]
        ]
    });

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