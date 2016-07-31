//var ObjA = {
//		name: 'objA',
//		sayName: function(){
//			//return "I'm the " + this.name;	
//		}
//}
//
//
//console.log(ObjB);
//var ObjB = {
//		name: 'objB',
//		sayName: function(){
//			//return this.name;			
//			//console.log(this);
//		}
//}
//console.log(ObjB);


/* verify */
//var obj = function() {
//	
//	this.name = 'Shiv';
//	this.age = 32;
//	sayName = function(){
//		return this.name;
//		console.log(this);
//	};
//	sayAge = function(){
//		return this.age;		
//	};
//}
////var aa = new obj();
//console.log(aa.name);


//Function Declaration
//function add(a,b) {
//	return a + b;
//	console.log('a');
//};
//add(5,2);

//var add = function(a,b) {console.log(a + b)};
//add(5,2);


//Javascript Inheritance
//var emp = function(empId, trans){	
//	this.empId = empId;
//	this.trans = trans
//}
//
//emp.prototype.myPersonal = function(empName, salary, address){
//	this.empName = empName;
//	this.salary = salary;
//	this.address = address;	
//	console.log(this.empName);
//	console.log(this.salary);
//}
//
//
//var emp1 = new emp( "444", "car");
////emp1.myPersonal('Shiv',"10000","guindy");
////console.log(emp1.myPersonal());
//console.log(emp1.myPersonal("Karthik", "20", "Adyar"));
//console.log(emp1);
//
//
//document.getElementById("empName").innerHTML = emp1.empName;
//document.getElementById("empId").innerHTML = emp1.empId;
//document.getElementById("salary").innerHTML = emp1.salary;
//document.getElementById("trans").innerHTML = emp1.trans;



//Adding subclass and calling base class

//Base class
var emp = function(empId, trans){	
	this.empId = empId;
	this.trans = trans;
}

emp.prototype.addionalDetails = function(){
console.log("I got  Bonus this year");
}

var empPersonal = function(salary, address){
	emp.call(this);
	this.salary = salary;
	this.address = address;
}

var newEmp = new emp(444, "car");

empPersonal.prototype = Object.create(emp.prototype);
empPersonal.prototype.constructor = empPersonal;


var empDetails = new empPersonal("2000","Adyar");


//console.log(newEmp.addionalDetails(50000));
//console.dir(newEmp);
console.log(empDetails);
//empDetails.push(newEmp);



//var Job = function(){
//	this.needJob = true;
//	this.empId = 444;
//}
//
//Job.prototype.print = function(){
//	console.log(this.needJob ? "Please hire me" : "no thank you");
//}
//
//var TechJob = function(title, needJob){
//	Job.call(this);
//	this.title = title;
//	this.needJob = needJob;
//}
//
//TechJob.prototype = Object.create(Job.prototype);
//TechJob.construtor = TechJob;
//
//
//var softwarePosition1 = new TechJob('Javascript Programmer', true);
//var softwarePosition2 = new TechJob('VB Programmer', false);
//
//console.log(softwarePosition1);
//console.log(softwarePosition2);









