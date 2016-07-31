var gAutoPrint = true; // Tells whether to automatically call the print function
function printSpecial4()
{

if (document.getElementById != null)
{
var html = '<HTML>\n<HEAD>\n';

var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth();
curr_month++;
var curr_year = d.getFullYear();
var cd = curr_month + "/" + curr_date + "/" + curr_year;

if (document.getElementsByTagName != null)
{
var headTags = document.getElementsByTagName("head");
if (headTags.length > 0)
html += headTags[0].innerHTML;
}

html += '\n</HE>\n<BODY>\n';

var printReadyElem = document.getElementById("printReady4");

if (printReadyElem != null)
{
$('.career-logo,.pgtitle_print').show();
html += printReadyElem.innerHTML + cd;

}
else
{
alert("Could not find the printReady function");
return;
}

html += '\n</BO>\n</HT>';

var printWin = window.open("","printSpecial4");
printWin.document.open();
printWin.document.write(html);
printWin.document.close();
if (gAutoPrint)
printWin.print();
}
else
{
alert("The print ready feature is only available if you are using an browser. Please update your browswer.");
}
}