// Code to fetch crypto live values and update the HTML elements based on the selected country
function updateCryptoValues(country) {
  var currencySymbol;
  switch (country) {
    case "USD":
      currencySymbol = "$";
      break;
    case "EUR":
      currencySymbol = "€";
      break;
    case "GBP":
      currencySymbol = "£";
      break;
    case "INR":
      currencySymbol = "₹";
      break;
    default:
      currencySymbol = "";
  }
  $.getJSON(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" +
      country +
      "&order=market_cap_desc&per_page=10&page=1&sparkline=false",
    function (data) {
      var cryptoValuesHtml = "";
      for (var i = 0; i < data.length; i++) {
        var crypto = data[i];
        cryptoValuesHtml += "<tr>";
        cryptoValuesHtml +=
          "<td>" +
          crypto.name +
          " (" +
          crypto.symbol.toUpperCase() +
          ")</td>";
        cryptoValuesHtml +=
          "<td>" +
          currencySymbol +
          crypto.current_price.toLocaleString() +
          "</td>";
        cryptoValuesHtml +=
          "<td>" +
          currencySymbol +
          crypto.market_cap.toLocaleString() +
          "</td>";
        cryptoValuesHtml +=
          "<td>" +
          currencySymbol +
          crypto.total_volume.toLocaleString() +
          "</td>";
        cryptoValuesHtml +=
          "<td>" +
          crypto.circulating_supply.toLocaleString() +
          " " +
          crypto.symbol.toUpperCase() +
          "</td>";
        cryptoValuesHtml += "</tr>";
      }
      $("#crypto-values").html(cryptoValuesHtml);
    }
  );
}

// Event listener to update crypto values whenever the selected country changes
$("#country").change(function () {
  var country = $(this).val();
  updateCryptoValues(country);
});

// Initial update with the default selected country (USD)
updateCryptoValues("USD");


// Get the current month and year///////////////////////////////////////////////////////////////////////////
var today = new Date();
var year = today.getFullYear();
var month = today.getMonth();

// Set the month and year in the HTML element
document.getElementById("month").innerHTML =
  "Calendar for " + getMonthName(month) + " " + year;

// Generate the calendar for the current month
generateCalendar(year, month);

// Function to generate the calendar for a given month and year
function generateCalendar(year, month) {
  var firstDay = new Date(year, month, 1);
  var lastDay = new Date(year, month + 1, 0);
  var table = document.getElementById("calendar-body");
  var date = 1;

  // Loop through each row in the calendar
  for (var i = 0; i < 6; i++) {
    var row = document.createElement("tr");

    // Loop through each column in the row
    for (var j = 0; j < 7; j++) {
      var cell = document.createElement("td");

      // Add the date to the cell if it falls within the current month
      if (i == 0 && j < firstDay.getDay()) {
        // Empty cell before the start of the month
      } else if (date > lastDay.getDate()) {
        // Empty cell after the end of the month
      } else {
        // Cell for a date within the current month
        var cellText = document.createTextNode(date);
        cell.appendChild(cellText);

        // Add the "current-date" class to today's date
        if (
          date == today.getDate() &&
          year == today.getFullYear() &&
          month == today.getMonth()
        ) {
          cell.classList.add("current-date");
        }
        date++;
      }

      row.appendChild(cell);
    }

    table.appendChild(row);
  }
}

// Function to get the name of a month from its index
function getMonthName(month) {
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[month];
}


