$(document).ready(function() {
	var totalSalary = 0;
	var employeeSalary = 0;
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
		addRow(formObj);
	});
	//Remove a row by clicking on x
	$("body").on('click', '.remove-row', function() {
		$(this).closest('tr').remove();
		employeeSalary = $(this).parent().prev().text();
		redeuceSalary(employeeSalary);
	});
	//Adds a row to the list
	function addRow(formObj) {
		$(".results tbody").append("<tr><td>"+formObj.fname+"</td><td>"+formObj.lname+"</td><td>"+formObj.empnum+"</td><td>"+formObj.title+"</td><td data-review='"+formObj.review+"'>"+formObj.review+"</td><td>"+formObj.salary+"</td><td><button class='remove-row btn-danger btn-xs'><i class='fa fa-times'></i></button></td></tr>");
		addSalary(formObj.salary);
	}
	//increase total salary
	function addSalary(salary) {
		salary = parseToNum(salary);
		totalSalary += salary;
		$('.total-comp-num').text(totalSalary);
	}
	//decrease total salary
	function redeuceSalary(salary) {
		salary = parseToNum(salary);
		totalSalary -= salary;
		$('.total-comp-num').text(totalSalary);
	}
	//parese to num
	function parseToNum(num) {
		num = parseInt(num);
		return num;
	}

});
