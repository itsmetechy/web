//Scope
//var a = 1;
////parent
// var aa = function foo(){
////child
//	 console.log(this);	 
// }
// aa();

//context 
// var obj = {
//		name:'shiva',
//		foo:function(a,b,c){
//			console.log(this === window);
//			console.log(b);
//		} 
// }
//  obj.foo.apply(window, [1, 2, 3]);


//Simple Closure
//var passed = 3;
//var addTo = function() {
//	var inner = 2;
//	return passed + inner;
//};
//
//console.dir(addTo());
//var passed = 4;

//Closure in detail
//console.log(this);

//var addTo = function(passed){
//	var inner = 4;	
//	var add = function(){
//		return passed + inner;		
//	}
//	return add;
//}
//
//console.log(addTo());
//var addition = new addTo(5);
//console.log(addition());


//Chaining

//var global = 'Global';
//var a = '1';
//
//function foo(){
//	var global = "No local";
//	var b= 2;
//	alert(a);
//	function goo(){
//		alert(b);
//	}
//	return goo();
//}
//
//foo();
//alert(b);

//function Person(hair, eyes){
//	this.hair= hair;
//	this.eyes= eyes;
//	
//	
//}
//
//Person.prototype = function(){
//	this.age = 32;
//	this.car = "benz";
//}
//var aa = new Person('black','brown');
//console.dir(aa);







var trainer = {
	name : 'Nag',
	doTeach : function(sub) {
		var notes;
		console.log(this.name + " teaching " + sub);
		notes = "JS-notes";
		function learn() {
			console.log('learing ' + sub + " with " + notes);
		}
		console.log("teaching end..");
		return learn;
	}
};

var learnFunc = trainer.doTeach('JS');
learnFunc();






























































 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
$(function() {

});