// Club = 0
// Diamond = 1
// Heart = 2
// Spade = 3

function create_table() {

    // Kings Preferences
    for (let king = 0; king < 4; king++) {

        for (let preference = 1; preference <= 4; preference++) {
            var data_id = "k" + king + "-p" + preference;
            var table_cell = document.getElementById(data_id);

            var options_list = `
            Queen 
            <select id="select-${data_id}">
                <option value="0">♣</option>
                <option value="1">♦</option>
                <option value="2">♥</option>
                <option value="3">♠</option>
            </select>
            `;

            table_cell.innerHTML = options_list;
        }
    }

    // Queens Preferences
    for (let queen = 0; queen < 4; queen++) {

        for (let preference = 1; preference <= 4; preference++) {
            var data_id = "q" + queen + "-p" + preference;
            var table_cell = document.getElementById(data_id);

            var options_list = `
            King 
            <select id="select-${data_id}">
                <option value="0">♣</option>
                <option value="1">♦</option>
                <option value="2">♥</option>
                <option value="3">♠</option>
            </select>
            `;
            table_cell.innerHTML = options_list;
        }
    }
}

function calculate_matches() {
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
            data_id = "select-k" + king + "-p" + preference;
            var value = document.getElementById(data_id).value;
            king_pref.push(parseInt(value));
        }

        // Input validation
        if (has_duplicates(king_pref)) {
            alert('The kings preferences have been incorrectly selected. Please follow the instructions.');
            location.reload(True);
        }

        kings_preferences.push(king_pref);
    }

    // Queens Preferences
    for (queen = 0; queen < 4; queen++) {

        queen_pref = []; // For single queen

        for (preference = 1; preference <= 4; preference++) {
            data_id = "select-q" + queen + "-p" + preference;
            var value = document.getElementById(data_id).value;
            queen_pref.push(parseInt(value));
        }

        // Input validation
        if (has_duplicates(queen_pref)) {
            alert('The queens preferences have been incorrectly selected. Please follow the instructions.');
            location.reload(True);
        }

        queens_preferences.push(queen_pref);
    }

    console.log(kings_preferences);
    console.log(queens_preferences);

    preferences_data = {
        'kings_preferences': kings_preferences,
        'queens_preferences': queens_preferences
    };

    console.log(preferences_data);

    return preferences_data;
}

// Ensure preferences correctly selected
function has_duplicates(arr) {
    return new Set(arr).size !== arr.length;
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

    // Reset result divs
    document.getElementById("matching-results").innerHTML = "";
    document.getElementById("calculation-logs").innerHTML = "";

    // 1. Display Stable Matches
    const resultsDiv = document.getElementById("matching-results");

    // 1.1 Heading
    var result_heading = document.createElement("h3");
    result_heading.innerHTML = "RESULTS";
    resultsDiv.appendChild(result_heading);

    // 1.2 Matches
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

    // 2. Display Calculation Logs
    const logsDiv = document.getElementById("calculation-logs");

    // 2.1 Heading
    var logs_heading = document.createElement("h3");
    logs_heading.innerHTML = "CALCULATION LOGS";
    logsDiv.appendChild(logs_heading);

    // 2.2 Encoding
    var encoding = document.createElement("p");
    encoding.innerHTML = "Please note, for the purpose of calculation [♣ = 0], [♦ = 1], [♥ = 2], [♠ = 3]."
    logsDiv.appendChild(encoding);

    // 2.3 Logs
    for (let i = 0; i < calculation_logs.length; i++) {

        var log_entry = document.createElement("li");
        log_entry.innerHTML = calculation_logs[i];

        logsDiv.appendChild(log_entry);
    }
}