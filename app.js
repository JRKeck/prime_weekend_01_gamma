$(document).ready(function() {
	var totalSalary = 0; //keep track of total salaries added to the list
	var employeeSalary = 0; //Holds the salary of the employee being removed
	var rowCounter = 0; //Check for a empty table
	var reviewRadioVal; //Radio button value so it doesn't get overwritten by .each()
	//Place form inputs into formObj and call addRowAlpha
	$(".employee-form").submit(function(event){

		event.preventDefault();

		var $inputs = $(".employee-form :input");
		var formObj = {};

		$inputs.each(function(){
			formObj[this.id] = $(this).val();
			//prevent the radio button value from being overwritten by the loop and stor it in
			if ($(this).is(':checked')) { reviewRadioVal = $(this).val();};
		});
		$( ".employee-form" ).each(function(){
		    this.reset();
		});
		//Make sure the names are capitallized for alphabetical purposes
		formObj.fname = formObj.fname.charAt(0).toUpperCase() + formObj.fname.substring(1);
		formObj.lname = formObj.lname.charAt(0).toUpperCase() + formObj.lname.substring(1);
		//insert the form radio value in the object
		formObj.review = reviewRadioVal;
		//Check for characters in salary
		formObj.salary = removeNonNumberic(formObj.salary);
		if (!formObj.salary) {formObj.salary = 0;}
		addRowAlpha(formObj);
	});
	//Generate random employee and put into an Object and call addRowAlpha
	$('.gen-random').on('click', function() {
		var randomEmployee = new Person();
		addRowAlpha(randomEmployee)
	});
	//Remove a row by clicking on button
	$("body").on('click', '.remove-row', function() {
		$(this).closest('tr').remove();
		employeeSalary = $(this).parent().prev().text();
		employeeSalary = removeNonNumberic(employeeSalary);
		reduceSalary(employeeSalary);
		rowCounter--;
	});
	//Adds a row in alphabetical order
	function addRowAlpha(passedObj) {
		var added;
		if (rowCounter <= 0) {
			$(".results tbody").append("<tr><td>"+passedObj.fname+"</td><td>"+passedObj.lname+"</td><td>"+passedObj.empnum+"</td><td>"+passedObj.title+"</td><td data-review='"+passedObj.review+"'><span>"+passedObj.review+"</span></td><td>"+formatToDollars(passedObj.salary)+"</td><td><button class='remove-row btn-danger btn-xs'><i class='fa fa-times'></i></button></td></tr>");
		}
		else {
			$('.employee-table > tbody  > tr').each(function() {
				compareFname = $(this).children().first().text()
				compareLname = $(this).children().first().next().text();
				if (compareLname == passedObj.lname) {
					if (compareFname >= passedObj.fname) {
						$(this).before("<tr><td>"+passedObj.fname+"</td><td>"+passedObj.lname+"</td><td>"+passedObj.empnum+"</td><td>"+passedObj.title+"</td><td data-review='"+passedObj.review+"'>"+passedObj.review+"</td><td>"+formatToDollars(passedObj.salary)+"</td><td><button class='remove-row btn-danger btn-xs'><i class='fa fa-times'></i></button></td></tr>");
						added = true;
						return false;
					}
				}
				else if (compareLname >= passedObj.lname) {
					$(this).before("<tr><td>"+passedObj.fname+"</td><td>"+passedObj.lname+"</td><td>"+passedObj.empnum+"</td><td>"+passedObj.title+"</td><td data-review='"+passedObj.review+"'>"+passedObj.review+"</td><td>"+formatToDollars(passedObj.salary)+"</td><td><button class='remove-row btn-danger btn-xs'><i class='fa fa-times'></i></button></td></tr>");
					added = true;
					return false;
				}
			});
			if (!added) {
				$(".results tbody").append("<tr><td>"+passedObj.fname+"</td><td>"+passedObj.lname+"</td><td>"+passedObj.empnum+"</td><td>"+passedObj.title+"</td><td data-review='"+passedObj.review+"'>"+passedObj.review+"</td><td>"+formatToDollars(passedObj.salary)+"</td><td><button class='remove-row btn-danger btn-xs'><i class='fa fa-times'></i></button></td></tr>");
			}
		}
		addSalary(passedObj.salary);
		rowCounter++;
	}
	//increase total salary
	function addSalary(salary) {
		salary = parseInt(salary);
		totalSalary += salary;
		$('.total-comp-num').text(formatToDollars(totalSalary));
	}
	//decrease total salary
	function reduceSalary(salary) {
		salary = parseInt(salary);
		totalSalary -= salary;
		$('.total-comp-num').text(formatToDollars(totalSalary));
	}
	//Random employee constructor
	function Person (){
		var firstName = ["Josh", "Bill", "Steve", "Scott", "Dan", "Greg", "Joan", "Caroline", "Lauren", "Sara", "Susan"];
		var lastName = ["Anderson", "Simpson", "Smith", "Peterson", "Schultz", "Williams", "Henderson"];
		var title = ["Business Analyst", "Marketing", "Sales", "Human Resources", "Accounting"]
		this.fname = firstName[randomNumber(0,(firstName.length-1))]
		this.lname = lastName[randomNumber(0,(lastName.length-1))]
		this.empnum = randomNumber(1,100);
		this.title = title[randomNumber(0,(title.length-1))];
		this.review = randomNumber(1,5);
		this.salary = randomNumber(35000,150000);
	}
	//Random Num Generator
	function randomNumber(min, max) {
		return Math.floor(Math.random() * (1 + max - min) + min);
	}
	//Remove non numeric characters
	function removeNonNumberic(str){
	var numericString = str.replace(/[^0-9]/g, '');
	return numericString;
	}
	//Add commas back into a number
	function formatToDollars(x) {
	    x = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    x = "$"+x;
	    return x;

	}
});
