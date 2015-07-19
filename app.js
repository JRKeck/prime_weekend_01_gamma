$(document).ready(function() {
	var totalSalary = 0;
	var employeeSalary = 0;
	var rowCounter = 0;
	var reviewRadioVal;
	//Place form inputs into formObj and call addRow
	$(".employee-form").submit(function(event){
		//TODO: have to capitalize names and sanitize numbers

		event.preventDefault();

		var $inputs = $(".employee-form :input");
		var formObj = {};

		$inputs.each(function(){
			formObj[this.id] = $(this).val();
			//prevent the radio button value from being overwritten by the loop
			if ($(this).is(':checked')) { reviewRadioVal = $(this).val();};
		});

		$( ".employee-form" ).each(function(){
		    this.reset();
		});
		//Get our radio value
		formObj.review = reviewRadioVal;
		//Make sure the names are capitallized
		formObj.fname = formObj.fname.charAt(0).toUpperCase() + formObj.fname.substring(1);
		formObj.lname = formObj.lname.charAt(0).toUpperCase() + formObj.lname.substring(1);

		addRowAlpha(formObj);
	});
	//Generate random employee
	$('.gen-random').on('click', function() {
		var randomEmployee = new Person();
		addRowAlpha(randomEmployee)
	});
	//Remove a row by clicking on x
	$("body").on('click', '.remove-row', function() {
		$(this).closest('tr').remove();
		employeeSalary = $(this).parent().prev().text();
		reduceSalary(employeeSalary);
		rowCounter--;
	});
	//Adds a row in alphabetical order
	function addRowAlpha(passedObj) {
		var added;
		if (rowCounter <= 0) {
			console.log("No other rows, append row");
			$(".results tbody").append("<tr><td>"+passedObj.fname+"</td><td>"+passedObj.lname+"</td><td>"+passedObj.empnum+"</td><td>"+passedObj.title+"</td><td data-review='"+passedObj.review+"'>"+passedObj.review+"</td><td>"+passedObj.salary+"</td><td><button class='remove-row btn-danger btn-xs'><i class='fa fa-times'></i></button></td></tr>");
		}
		else {
			$('.employee-table > tbody  > tr').each(function() {
				compareFname = $(this).children().first().text()
				compareLname = $(this).children().first().next().text();
				if (compareLname > passedObj.lname) {
					console.log(compareLname + " is greater than " + passedObj.lname + ", place "+ passedObj.lname +" before");
					$(this).before("<tr><td>"+passedObj.fname+"</td><td>"+passedObj.lname+"</td><td>"+passedObj.empnum+"</td><td>"+passedObj.title+"</td><td data-review='"+passedObj.review+"'>"+passedObj.review+"</td><td>"+passedObj.salary+"</td><td><button class='remove-row btn-danger btn-xs'><i class='fa fa-times'></i></button></td></tr>");
					added = true;
					return false;
				}
			});
			if (!added) {
				console.log("Didn't find a place to insert, append row");
				$(".results tbody").append("<tr><td>"+passedObj.fname+"</td><td>"+passedObj.lname+"</td><td>"+passedObj.empnum+"</td><td>"+passedObj.title+"</td><td data-review='"+passedObj.review+"'>"+passedObj.review+"</td><td>"+passedObj.salary+"</td><td><button class='remove-row btn-danger btn-xs'><i class='fa fa-times'></i></button></td></tr>");
			}
		}
		addSalary(passedObj.salary);
		rowCounter++;
	}
	//increase total salary
	function addSalary(salary) {
		salary = parseInt(salary);
		totalSalary += salary;
		$('.total-comp-num').text(totalSalary);
	}
	//decrease total salary
	function reduceSalary(salary) {
		salary = parseInt(salary);
		totalSalary -= salary;
		$('.total-comp-num').text(totalSalary);
	}
	//Random Num Generator
	function randomNumber(min, max) {
		return Math.floor(Math.random() * (1 + max - min) + min);
	}
	//Random employee constructor
	function Person (){
		var firstName = ["Josh", "Bill"];
		var lastName = ["KecK", "Dwyer"];
		this.fname = firstName[randomNumber(0,(firstName.length-1))]
		this.lname = lastName[randomNumber(0,(lastName.length-1))]
		this.empnum = randomNumber(1,100);
		this.title = "title";
		this.review = randomNumber(1,5);
		this.salary = randomNumber(35000,200000);
	}
});
