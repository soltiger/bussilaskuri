function BusCard( oneTimeTicket, oneMonthTicket ) {
  this.oneTimeTicket = oneTimeTicket;
  this.oneMonthTicket = oneMonthTicket;
}

/**
 * Set a validation state for input element
 * @param String el Input element selector
 * @param String state State as in "error", "warning" or "success" of omit if you want to clear
 * @param String error Validation error message or omit if you want to clear
 */
function validateInput(params) {
  var formGroup = $(params.el).closest(".form-group");
  formGroup.removeClass("has-error", "has-success", "has-warning");
  formGroup.find("div.error-message").remove();
  if (params.state) formGroup.addClass("has-"+params.state);
  if (params.error) formGroup.append("<div class='error-message text-danger'>"+params.error+"</div>");
}

// Normal buscard prices
normalCard = new BusCard( 1.74, 47.0 );
workCardPrice = 41.50;

// Discount buscard prices
studentCard = new BusCard( 1.26, 33.0 );
kidCard = new BusCard( 0.87, 23.50 );

// Without buscard
normalWithoutCardPrice = 2.60;
kidWithoutCardPrice = 1.00;

function validateForm() {
  if (validateNumber($("#ticketsPerWeek").val())) {
    validateInput({ el: "#ticketsPerWeek" });
    return true;
  }
  else {
    validateInput({ el: "#ticketsPerWeek", state: "error", error: "Syötä joku järkevä numero!" });
    return false;
  }
}


function validateNumber( maybeNumber ) {
  if( maybeNumber !== "") {
    var value = maybeNumber.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    var intRegex = /^\d+$/;
    if(!intRegex.test(value)) {
      return false;
    }
  }
  else {
    return false;
  }

  return true;
}

function countTicketsForMonth( ticketsPerWeek ) {
  return Math.ceil( ticketsPerWeek / 7 * 30 );
}

$( function() {
  $( "#calculateButton" ).click( function() {
    if( validateForm() ) {
      var ticketsPerWeek = $("#ticketsPerWeek").val();
      ticketsPerMonth = countTicketsForMonth( ticketsPerWeek );

      var buscard = "";

      switch( $('input:radio[name=discount]:checked').val() ) {
        case 'normal':
          buscard = normalCard;
        withoutCard = normalWithoutCardPrice;
        break;

        case 'student':
          buscard = studentCard;
        withoutCard = normalWithoutCardPrice;
        break;

        case 'kid':
          buscard = kidCard;
        withoutCard = kidWithoutCardPrice;
        break;
      }

      htmlString = "";
      htmlString += "Matkustat " + ticketsPerMonth + " kertaa seuraavan kuukauden aikana. ";
      htmlString += "Tämä maksaisi:<br>";
      htmlString += (ticketsPerMonth * buscard.oneTimeTicket ).toFixed(2) + " eur bussikortilla, (" + ticketsPerMonth + " x " + buscard.oneTimeTicket +" eur)<br>";
      htmlString += (buscard.oneMonthTicket).toFixed(2) + " eur kuukausikortilla, (" + 1 + " x " + buscard.oneMonthTicket +" eur)<br>";

      if( ticketsPerMonth <= 50 ) {
        htmlString += (workCardPrice).toFixed(2) + " eur työmatkakortilla tai sitten (" + 1 + " x " + workCardPrice +" eur) <br>";
      }
      else {
        htmlString += ( workCardPrice + ( (ticketsPerMonth-50) * buscard.oneTimeTicket ) ).toFixed(2) + " eur työmatkakortilla ja bussikortilla, (" + 1 + " x " + workCardPrice + " eur + " + (ticketsPerMonth-50) + " x " + buscard.oneTimeTicket + " eur )<br>";
      }

      htmlString += (ticketsPerMonth * withoutCard ).toFixed(2) + " eur ilman mitään bussikortteja. (" + ticketsPerMonth + " x " + withoutCard +" eur)<br>";

      htmlString += "<font size='1'>(Jos menetit rahaa laskurin toimiessa väärin, ota yhteys <strike>Matlockiin</strike>Columboon.)</font><br>";

      $( "#results" ).html( htmlString );
    }
  });
});
