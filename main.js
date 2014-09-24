$(document).on('ready', function() {
  
	var currentTotalDays = 0;
	var currentTotalItems = 0;
	var initialWeek = 7;
	
	currentTotalDays = newDay(initialWeek,currentTotalDays);
	
	// Listen for clicks on Add Agenda Item buttons, when clicked create a new agenda item in the proper day's container.
	$('a').on('click', function(){
		var tempID = $(this).parent().attr('id');
		var dayID = removeButtonFromID(tempID);
		currentTotalItems = newAgendaItem(dayID, currentTotalItems);
		console.log(currentTotalItems);
	});

	$(document).on('keypress','.agendainput', function(event) {
		if (event.which === 13) {
			var tempText = $(this).val();
			var tempID = $(this).attr('id');
			var noteText = $('<p class = "note" id="'+tempID+'"></p>').text(tempText);
			$(this).replaceWith(noteText);
		}
	});

	$(document).on('click','.agendaitem', function(){
		if ($(this).children().attr('class') === 'note') {
		// var tempID = $(this).attr('id');
			$(this).remove();
		// $('#note'+tempID).parent().remove();
		};
	});

	$(window).on('scroll', function() {
  		if ($(window).scrollTop() == ($(document).height() - $(window).height())) {
    		currentTotalDays = newDay(1, currentTotalDays);
      	};
    });
  

});

	
// newDay takes in two parameters, num - the number of days you want it to create, and total, which is the current running total of days that have been created.  It then appends the proper number of dayContainers and their elements to the main Container, giving them all ids.  Note the placeholder item that shows up on each day.

function newDay (num, total) {
		
	var number = num;
	var totaldays = total;	

	for (var i = 0; i < num; i++){
		var dayContainer = $('<div class="daycontainer" id="daycont' + totaldays +'"></div>');
		var dateContainer = $('<div class="datecontainer" id="datecont' + totaldays +'"></div>');
		var agendaContainer = $('<div class="agendacontainer" id="agendacont' + totaldays +'"></div>');
		var addButton = $('<div class="addbutton" id="button' + totaldays +'"><a href="#">Click to add an agenda item.</a></div>');
		var dayDate = moment().add(totaldays, 'days').format('MMM Do YYYY');
		$('.container').append(dayContainer);
		dayContainer.append(dateContainer);
		dateContainer.text(dayDate);
		dayContainer.append(agendaContainer);
		agendaContainer.append(addButton);
		totaldays++;
		
	};

	return totaldays;
};

//newAgendaItem takes in two parameters, the ID of the placeholder item clicked on, and the current number of agenda items.  It then creates a new agenda item, assigns it  
function newAgendaItem (dateID, numItems) {
	var agendaItem = $('<div class="agendaitem" id="aitem' + numItems + '"></div>');
	var agendaInput = $('<textarea class="agendainput" id="text' + numItems + '"></textarea>');
	var agendaID = '#agendacont' + dateID;
	$(agendaID).append(agendaItem);
	agendaItem.append(agendaInput);
	numItems++;
	return numItems;
}

// removeButtonFromID takes in one parameter as a string.  It's to remove the 'button' part of a button's id, so the number can then be added to the agenda item's ID.
function removeButtonFromID (myString) {
	var myNewString = myString.replace('button', '');
	return myNewString;
};

