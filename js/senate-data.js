var data = JSON.parse(JSON.stringify(data));

function check() {
    document.getElementById("table-data").innerHTML = "";
    var valor = document.getElementById("party").value;
    document.getElementById("party").innerHTML = `<option class="state" value="all">All</option>`;
    let congress = document.getElementsByClassName("congress");
    let members = data.results[0].members;
    let arrayCheckbox = [];
    var arraySelect = [];
    var ar = [];
    for (let i = 0; i < congress.length; i++) {
        if (congress[i].checked) {
            arrayCheckbox.push(congress[i].value);
        }
    }console.log(arrayCheckbox)
    for (let a = 0; a < members.length; a++) {
        for (let b = 0; b < arrayCheckbox.length; b++) {
            if (members[a].middle_name == null) {
                members[a].middle_name = "  ";
            }
            if (members[a].party == arrayCheckbox[b] && (valor == "all" || valor == members[a].state)) {
                var showTable = '<tr>' +
                    '<td>' + members[a].first_name + " " + members[a].middle_name + " " + members[a].last_name + '</td>' +
                    '<td>' + members[a].party + '</td>' +
                    '<td>' + members[a].state + '</td>' +
                    '<td>' + members[a].seniority + '</td>' +
                    '<td>' + members[a].votes_with_party_pct + '</td>' +
                    '<td>' + members[a].total_votes + '</td></tr>';
                document.getElementById("table-data").innerHTML += showTable;
                if (arraySelect.indexOf(members[a].state) == -1) {
                    arraySelect.push(members[a].state);
                }
            }
        }
    }
    for (let s = 0; s < arraySelect.length; s++) {
        document.getElementById("party").innerHTML += `<option class="state" value= ${arraySelect[s]}> ${arraySelect[s]} </option>`;
    }
    document.getElementById("party").value = valor;
}
document.getElementById("party").innerHTML = `<option class="state" value="all">All</option>`;
check();

