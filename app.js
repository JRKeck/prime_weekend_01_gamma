$(document).ready(function() {
	var totalSalary = 0;
	var employeeSalary = 0;
	var rowCounter = 0;
	console.log(totalSalary);

	//Place form inputs into formObj and call addRow
	$(".employee-form").submit(function(event){
		event.preventDefault();

		var $inputs = $(".employee-form :input");
		var formObj = {};

		$inputs.each(function(){
			formObj[this.id] = $(this).val();
		});

		$( ".employee-form" ).each(function(){
		    this.reset();
		});
		if (rowCounter <= 0) {
			addRow(formObj);
		}
		else {
			addRowAlpha(formObj);
		}
	});
	//Remove a row by clicking on x
	$("body").on('click', '.remove-row', function() {
		$(this).closest('tr').remove();
		employeeSalary = $(this).parent().prev().text();
		redeuceSalary(employeeSalary);
		rowCounter--;
	});
	//Adds a row to the list
	function addRow(formObj) {
		$(".results tbody").append("<tr><td>"+formObj.fname+"</td><td>"+formObj.lname+"</td><td>"+formObj.empnum+"</td><td>"+formObj.title+"</td><td data-review='"+formObj.review+"'>"+formObj.review+"</td><td>"+formObj.salary+"</td><td><button class='remove-row btn-danger btn-xs'><i class='fa fa-times'></i></button></td></tr>");
		addSalary(formObj.salary);
		rowCounter++;
	}
	//Adds a row in alphabetical order
	function addRowAlpha(formObj) {
		var added;
		$('.employee-table > tbody  > tr').each(function() {
			if ($(this).children().first().next().text() > formObj.lname) {
				$(this).before("<tr><td>"+formObj.fname+"</td><td>"+formObj.lname+"</td><td>"+formObj.empnum+"</td><td>"+formObj.title+"</td><td data-review='"+formObj.review+"'>"+formObj.review+"</td><td>"+formObj.salary+"</td><td><button class='remove-row btn-danger btn-xs'><i class='fa fa-times'></i></button></td></tr>");
				added = true;
			}

		});
		if (!added) {$(".results tbody").append("<tr><td>"+formObj.fname+"</td><td>"+formObj.lname+"</td><td>"+formObj.empnum+"</td><td>"+formObj.title+"</td><td data-review='"+formObj.review+"'>"+formObj.review+"</td><td>"+formObj.salary+"</td><td><button class='remove-row btn-danger btn-xs'><i class='fa fa-times'></i></button></td></tr>");
}
	
		rowCounter++;
	}
	//increase total salary
	function addSalary(salary) {
		salary = parseInt(salary);
		totalSalary += salary;
		$('.total-comp-num').text(totalSalary);
	}
	//decrease total salary
	function redeuceSalary(salary) {
		salary = parseInt(salary);
		totalSalary -= salary;
		$('.total-comp-num').text(totalSalary);
	}


});
