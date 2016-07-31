;(function($){
	$(document).ready(function(){
	
		/*var numberWithCommas = function(x,len=2) {*/
		var numberWithCommas = function(x,len) {
			var parts = x.toString().split(".");
			parts[0] = parts[0].replace(/,/g,'');
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			if (typeof(parts[1]) != 'undefined') {
				var decLen = parts[1].length;
				//console.log(decLen,len);
				if (decLen > len) {
					decLen = len;
				}
				parts[1] = parts[1].substring(0,decLen);
				if (decLen == 0) {
					return parts[0];
				} else {
					return parts.join(".");
				}
			} else {
				return parts[0];
			}
		}
		
		var calculateMe = function () {
			// calculate tax first off negotiated price
			var tax = parseFloat($('.tax').val());
			var msrp = parseInt($('.msrp').text().replace(/\$/g,'').replace(/,/g,''));
			var negotiated = parseInt($('.negotiated').val().replace(/,/g,''));
			//console.log($('.msrp').text().replace(/\$/g,''));
			if (negotiated > 0) { msrp = negotiated;}
			var residualValue = msrp * 0.57;
			
			var taxVal = (tax/100)*msrp;
			var taxValString = numberWithCommas(taxVal,0);
			$('.taxval').text('$'+taxValString);
			
			var titleandreg = parseFloat($('.titleandreg').val().replace(/,/g,''));
			var tradein = parseFloat($('.tradein').val().replace(/,/g,''));
			var downpayment = parseFloat($('.downpayment').val().replace(/,/g,''));
			var moneyfactor = parseFloat($('.moneyfactor').val().replace(/,/g,''));
			var leaseterm = parseInt($('.leaseterm').val().replace(/,/g,''));
			
			var netCost = msrp + titleandreg - downpayment - tradein;
			var depreciation = netCost - residualValue;
			
			var depreciationMonthlyPayment = depreciation / leaseterm;
			var moneyFactorPayment = (netCost + residualValue) * (moneyfactor/2400);
			
			var bottomLineMonthly = depreciationMonthlyPayment + moneyFactorPayment;
			//var monthlyLease = bottomLineMonthly + (bottomLineMonthly * (taxVal/100));

			
			var loanAmount = msrp + taxVal + titleandreg - downpayment - tradein;
			var annualAmount = (loanAmount * (moneyfactor/100)) / 12;
			var loanBottomLine = 1 - (1 / Math.pow((1 + (((moneyfactor/100)) / 12)),leaseterm));
			var paymentAmount = annualAmount / loanBottomLine;

			moLeaseString = numberWithCommas(bottomLineMonthly,0);
			totalLeaseString = numberWithCommas(bottomLineMonthly*leaseterm,0);
			
			moLoanString = numberWithCommas(paymentAmount,0);
			totalLoanString = numberWithCommas(loanAmount,0);
			
			$('.totalLease').text('$'+totalLeaseString);
			$('.moLease').text('$'+moLeaseString);
			
			$('.totalLoan').text('$'+totalLoanString);
			$('.moLoan').text('$'+moLoanString);
			
		}
		
		$('#select-vehicle').click(function(){
			$(".white-wash").show();
			$("#select-trade-in").show();
		});
		
		$('#closeme, .white-wash').click(function(e) {
			if (this == e.target) {
				$(".white-wash").hide();
			}
		});
	
		$('.calc-box input').blur(function(){
			$this = $(this);
			var decPoint = parseInt($this.attr('data-decpoint'));
			if (isNaN(decPoint)) {
				decPoint = 2;
			}
			$('.calc-box .'+$this.attr('name'))
				.val( numberWithCommas($this.val(),decPoint) );
			calculateMe();
		});
		calculateMe();
	});
})(jQuery);