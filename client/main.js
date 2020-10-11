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

    fetch("https://royal-match.herokuapp.com/", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            display_results(result);
        })
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

function encode_table_data(preference_number) {

    symbols = ["♣", "♦", "♥", "♠"];
    return symbols[preference_number];
}

function display_results(result) {

    matches = result['matches'];
    calculation_logs = result['logs'];

    // Display Stable Matches
    const resultsDiv = document.getElementById("matching-results");
    var result_table = document.createElement("table");
    result_table.classList.add("center");

    var result_table_data = `
    <tr>
        <td>Queen ♣</td>
        <td>Queen ♦</td>
        <td>Queen ♥</td>
        <td>Queen ♠</td>
    </tr>
    <tr>
        <td>King ${encode_table_data(matches[0])}</td>
        <td>King ${encode_table_data(matches[1])}</td>
        <td>King ${encode_table_data(matches[2])}</td>
        <td>King ${encode_table_data(matches[3])}</td>
    </tr>
    `;

    result_table.innerHTML = result_table_data;
    resultsDiv.appendChild(result_table);

    // Display Calculation Logs
    const logsDiv = document.getElementById("calculation-logs");

    for (let i = 0; i < calculation_logs.length; i++) {

        var log_entry = document.createElement("li");
        log_entry.innerHTML = calculation_logs[i];

        logsDiv.appendChild(log_entry);
    }
}