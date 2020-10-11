// Club = 0
// Diamond = 1
// Heart = 2
// Spade = 3

function calculate() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(get_preferences_data()); // POST data

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

function get_preferences_data() {

    kings_preferences = [];
    queens_preferences = [];

    // Kings Preferences
    for (king = 0; king < 4; king++) {

        king_pref = []; // For single king

        for (preference = 1; preference <= 4; preference++) {
            data_id = "k" + king + "-p" + preference;
            king_pref.push(decode_table_data(document.getElementById(data_id).textContent));
        }

        kings_preferences.push(king_pref);
    }

    // Queens Preferences
    for (queen = 0; queen < 4; queen++) {

        queen_pref = []; // For single queen

        for (preference = 1; preference <= 4; preference++) {
            data_id = "q" + queen + "-p" + preference;
            queen_pref.push(decode_table_data(document.getElementById(data_id).textContent));
        }

        queens_preferences.push(queen_pref);
    }

    console.log(kings_preferences);
    console.log(queens_preferences);

    preferences_data = {
        'kings_preferences': kings_preferences,
        'queens_preferences': queens_preferences
    };

    return preferences_data;
}

function decode_table_data(data) {

    if (data.includes("♣"))
        return 0;
    else if (data.includes("♦"))
        return 1;
    else if (data.includes("♥"))
        return 2;
    else
        return 3;
}