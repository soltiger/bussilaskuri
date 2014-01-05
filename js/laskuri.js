function BusCard( oneTimeTicket, oneMonthTicket ) {
	this.oneTimeTicket = oneTimeTicket;
	this.oneMonthTicket = oneMonthTicket;
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

function validateNumber( maybeNumber ) {
	if( maybeNumber != "") {
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
		ticketsPerWeek = $('#ticketsPerWeek').val();
		if( validateNumber( ticketsPerWeek ) ) {
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
			htmlString += "Tämä maksaisi:<br>" 
			htmlString += (ticketsPerMonth * buscard.oneTimeTicket ).toFixed(2) + " eur bussikortilla, (" + ticketsPerMonth + " x " + buscard.oneTimeTicket +" eur)<br>";
			htmlString += (buscard.oneMonthTicket).toFixed(2) + " eur kuukausikortilla, (" + 1 + " x " + buscard.oneMonthTicket +" eur)<br>";
			htmlString += (workCardPrice).toFixed(2) + " eur työmatkakortilla tai sitten (" + 1 + " x " + workCardPrice +" eur) <br>";
			htmlString += (ticketsPerMonth * withoutCard ).toFixed(2) + " eur ilman mitään bussikortteja. (" + ticketsPerMonth + " x " + withoutCard +" eur)<br>";
			
			$( "#results" ).html( htmlString );
		}
		else {
			$( "#results" ).html( "Syötä joku järkevä numero!" );
		}
	});
});