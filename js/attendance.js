var stats = {
  "num_rep": 0,
  "array_rep":[],
  "array_dem":[],
  "array_ind":[],
  "num_dem":0,
  "num_ind":0,
  "total":0,
  "pct_rep":0,
  "pct_dem":0,
  "pct_ind":0,
  "least_loyalty":[],
  "most_loyalty":[],
  "least_attendance": [],
  "most_attendance":[]
}
//-----DECLARACION DE VARIABLES GLOBALES---------------//
var datos = JSON.parse(JSON.stringify(data));
var estadisticas = JSON.parse(JSON.stringify(stats));
var members = datos.results[0].members;
var arrays = [];
var arrays2 = [];
var tabla1 = document.getElementById("table-congress");
//----------------FUNCIONES---------------------//
for (let i = 0; i < members.length; i++) {
  stats.array_rep = members.filter(e => e.party == "R");
  stats.array_dem = members.filter(e => e.party == "D");
  stats.array_ind = members.filter(e => e.party == "I");
  stats.num_rep = stats.array_rep.length;
  stats.num_dem = stats.array_dem.length;
  stats.num_ind = stats.array_ind.length;
  stats.total = stats.num_rep + stats.num_dem + stats.num_ind;
}
tabla1.innerHTML = '<tr align="center">' +
  "<td>Republicanos</td>" +
  "<td>" + stats.num_rep + "</td>" +
  "<td>" + pct_votes(stats.array_rep) + "</td>" +
  "</tr>" +
  '<tr align="center">' +
  "<td>Democratas</td>" +
  "<td>" + stats.num_dem + "</td>" +
  "<td>" + pct_votes(stats.array_dem) + "</td>" +
  "</tr>" +
  '<tr align="center">' +
  "<td>Independientes</td>" +
  "<td>" + stats.num_ind + "</td>" +
  "<td>" + pct_votes(stats.array_ind) + "</td>" +
  "</tr>" +
  '<tr align="center"><td> Total</td>' +
  "<td>" +
  stats.total +
  "</td></tr>";

function MeterEnArray(arraay, obj) {
  for (var i = 0; i < arraay.length; i++) {
    obj.push({
      prop1: arraay[i].first_name,
      prop2: arraay[i].missed_votes,
      prop3: arraay[i].missed_votes_pct,
      prop4: arraay[i].total_votes,
      prop5: arraay[i].votes_with_party_pct
    });
  }
  return obj;
}
function ordenarTodos(arrays, num) {
  if (num == 1) {
    arrays.sort(function (a, b) {
      if (a.prop5 > b.prop5) {
        return 1;
      }
      if (a.prop5 < b.prop5) {
        return -1;
      }
      return 0;
    });
  } else if (num == 0) {

    arrays.sort(function (c, d) {
      if (c.prop3 > d.prop3) {
        return 1;
      }
      if (c.prop3 < d.prop3) {
        return -1;
      }
      return 0;
    });
  }

  return arrays;
}

function pct_votes(array) {
  let pctRep = 0;
  let pct = 0;
  for (let r = 0; r < array.length; r++) {
    pctRep += array[r].votes_with_party_pct;
  }
  pct = Math.round(pctRep / array.length);
  if (isNaN(pct)) {
    return "-";
  }
  else {
    return pct + "%";
  }
}
function mostrarTodos(arrays, num) {
  var pct = Math.round(arrays.length * 0.1);
  for (var i = 0; i < arrays.length; i++) {
    if (num == 1) {
      var showTable = '<tr align="center" >' +
        '<td align="center" >' + arrays[i].prop1 + "</td>" +
        '<td align="center" >' + arrays[i].prop4 + "</td>" +
        '<td align="center">' + arrays[i].prop5 + "%</td></tr>";
      var contenido = {
        "nombre": arrays[i].prop1,
        "missed_votes": arrays[i].prop4,
        "missed_votes_pct": arrays[i].prop5
      }
      if (i < arrays.length * 0.1) {
        var tabla2 = document.getElementById("most");
        tabla2.innerHTML += showTable;
        // stats.most_attendance.push(contenido);


      } else if (i >= arrays.length - pct) {
        var tabla3 = document.getElementById("least");
        tabla3.innerHTML += showTable;
        // stats.least_attendance.push(contenido)
      }
    }else if(num == 0){
      var showTable = '<tr align="center" >' +
      '<td align="center" >' + arrays[i].prop1 + "</td>" +
      '<td align="center" >' + arrays[i].prop2 + "</td>" +
      '<td align="center">' + arrays[i].prop3 + "%</td></tr>";
    var contenido = {
      "nombre": arrays[i].prop1,
      "missed_votes": arrays[i].prop2,
      "missed_votes_pct": arrays[i].prop3
    }
    if (i < arrays.length * 0.1) {
      var tabla3 = document.getElementById("most");
      tabla3.innerHTML += showTable;
      // stats.most_attendance.push(contenido);


    } else if (i >= arrays.length - pct) {
      var tabla2 = document.getElementById("least");
      tabla2.innerHTML += showTable;
      // stats.least_attendance.push(contenido)
    }
    }
  }
}