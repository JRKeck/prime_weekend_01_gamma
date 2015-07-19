$(document).ready(function() {
	var totalSalary = 0;
	var employeeSalary = 0;
	var rowCounter = 0;
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
		redeuceSalary(employeeSalary);
		rowCounter--;
	});
	//Adds a row in alphabetical order
	function addRowAlpha(passedObj) {
		var added;
		if (rowCounter <= 0) {
			$(".results tbody").append("<tr><td>"+passedObj.fname+"</td><td>"+passedObj.lname+"</td><td>"+passedObj.empnum+"</td><td>"+passedObj.title+"</td><td data-review='"+passedObj.review+"'>"+passedObj.review+"</td><td>"+passedObj.salary+"</td><td><button class='remove-row btn-danger btn-xs'><i class='fa fa-times'></i></button></td></tr>");
		}
		else {
			$('.employee-table > tbody  > tr').each(function() {
				if ($(this).children().first().next().text() > passedObj.lname) {
					$(this).before("<tr><td>"+passedObj.fname+"</td><td>"+passedObj.lname+"</td><td>"+passedObj.empnum+"</td><td>"+passedObj.title+"</td><td data-review='"+passedObj.review+"'>"+passedObj.review+"</td><td>"+passedObj.salary+"</td><td><button class='remove-row btn-danger btn-xs'><i class='fa fa-times'></i></button></td></tr>");
					added = true;
					return false;
				}
			});
			if (!added) {$(".results tbody").append("<tr><td>"+passedObj.fname+"</td><td>"+passedObj.lname+"</td><td>"+passedObj.empnum+"</td><td>"+passedObj.title+"</td><td data-review='"+passedObj.review+"'>"+passedObj.review+"</td><td>"+passedObj.salary+"</td><td><button class='remove-row btn-danger btn-xs'><i class='fa fa-times'></i></button></td></tr>");
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
	function redeuceSalary(salary) {
		salary = parseInt(salary);
		totalSalary -= salary;
		$('.total-comp-num').text(totalSalary);
	}
	//Random Employee Generator
	function randomNumber(min, max) {
		return Math.floor(Math.random() * (1 + max - min) + min);
	}
	function Person (){
		var firstName = ["Josh"]
		var lastName = ["KecK"];
		this.fname = firstName[randomNumber(0,(firstName.length-1))]
		this.lname = lastName[randomNumber(0,(lastName.length-1))]
		this.empnum = randomNumber(1,100);
		this.title = "title";
		this.review = randomNumber(1,5);
		this.salary = randomNumber(35000,200000);
	}
});
