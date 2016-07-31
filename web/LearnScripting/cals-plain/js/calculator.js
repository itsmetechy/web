;
(function ($) {
    $(document).ready(function () {

        /*var numberWithCommas = function(x,len=2) {*/
        var numberWithCommas = function (x, len) {
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/,/g, '');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            if (typeof (parts[1]) != 'undefined') {
                var decLen = parts[1].length;
                //console.log(decLen,len);
                if (decLen > len) {
                    decLen = len;
                }
                parts[1] = parts[1].substring(0, decLen);
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
            if ($('.tax').val() == "") {
                $('.tax').val(0);
            }
            var tax = parseFloat($('.tax').val());
            var msrp = parseInt($('.msrp').text().replace(/\$/g, '').replace(/,/g, ''));
            var negotiated = parseInt($('.negotiated').val().replace(/\$/g, '').replace(/,/g, ''));
            if (negotiated == "NaN" || negotiated == "") {
                $('.negotiated').val(0);
            }
            //console.log($('.msrp').text().replace(/\$/g,''));
            if (negotiated > 0) {
                msrp = negotiated;
            }
            var residualValue = msrp * 0.57;

            var taxVal = (tax / 100) * msrp;
            var taxValString = numberWithCommas(taxVal, 2);
            if (taxValString == "NaN") {
                $('.taxval').text('$0');
            } else {
                $('.taxval').text('$' + taxValString);
            }


            //var titleandreg = parseFloat($('.titleandreg').val().replace(/,/g, ''));
            var titleandreg = parseFloat($('.titleandreg').text().replace(/\$/g, '').replace(/,/g, ''));
            var tradein = parseFloat($('.tradein').val().replace(/,/g, ''));
            var downpayment = parseFloat($('.downpayment').val().replace(/,/g, ''));
            var moneyfactor = parseFloat($('.moneyfactor').val().replace(/,/g, ''));
            var leaseterm = parseInt($('.leaseterm').val().replace(/,/g, ''));

            var netCost = msrp + titleandreg - downpayment - tradein;
            var depreciation = netCost - residualValue;

            var depreciationMonthlyPayment = depreciation / leaseterm;
            var moneyFactorPayment = (netCost + residualValue) * (moneyfactor / 2400);

            var bottomLineMonthly = depreciationMonthlyPayment + moneyFactorPayment;
            //var monthlyLease = bottomLineMonthly + (bottomLineMonthly * (taxVal/100));


            var loanAmount = msrp + taxVal + titleandreg - downpayment - tradein;
            var annualAmount = (loanAmount * (moneyfactor / 100)) / 12;
            var loanBottomLine = 1 - (1 / Math.pow((1 + (((moneyfactor / 100)) / 12)), leaseterm));
            var paymentAmount = annualAmount / loanBottomLine;

            moLeaseString = numberWithCommas(bottomLineMonthly, 0);
            totalLeaseString = numberWithCommas(bottomLineMonthly * leaseterm, 0);

            moLoanString = numberWithCommas(paymentAmount, 2);
            totalLoanString = numberWithCommas(loanAmount, 0);

            $('.totalLease').text('$' + totalLeaseString);
            $('.moLease').text('$' + moLeaseString);

            $('.totalLoan').text('$' + totalLoanString);
            if (moLoanString == "NaN") {
                $('.moLoan').text('$0');
            } else {
                $('.moLoan').text('$' + moLoanString);
            }

            //$('.moLoan').text('$' + moLoanString);

        }

        $('#select-vehicle').click(function () {
            $(".white-wash").show();
            $("#select-trade-in").show();
        });

        $('#closeme, .white-wash').click(function (e) {
            if (this == e.target) {
                $(".white-wash").hide();
            }
        });

        var defaultMoneyFactorValue = $('.moneyfactor').val();
        $('.moneyfactor').blur(function () {
            var thisValue = $(this).val().replace(/\,/g, "");
            if (thisValue == "") {
                $('.moneyfactor').val(7.75);
            } else {
                $('.moneyfactor').val(thisValue);
                if (defaultMoneyFactorValue != thisValue) {
                    defaultMoneyFactorValue = thisValue;
                }
            }
        });
        $('.leaseterm').blur(function () {
            var thisValue = $(this).val().replace(/\,/g, "");
            if (thisValue == "") {
                $('.leaseterm').val(36);
            } else {
                $('.leaseterm').val(thisValue);
            }
        });

        $('.tradein').blur(function () {
            var thisValue = $(this).val().replace(/\,/g, "");
            if (thisValue == "") {
                thisValue = 0;
            }
            if (thisValue >= 0) {
                $('.tradein').val(numberWithCommas(thisValue));
            } else {
                $('.tradein').val(0);
            }
        });
        $('.downpayment').blur(function () {
            var thisValue = $(this).val().replace(/\,/g, "");
            if (thisValue == "") {
                thisValue = 0;
            }
            if (thisValue >= 0) {
                $('.downpayment').val(numberWithCommas(thisValue));
            } else {
                $('.downpayment').val(0);
            }
        });

        $('.negotiated').blur(function () {
            var thisValue = $(this).val().replace(/\,/g, "");
            if (thisValue == "") {
                thisValue = 0;
            }
            if (thisValue >= 0) {
                $('.negotiated').val(numberWithCommas(thisValue));
            } else {
                $('.negotiated').val(0);
            }
        });

        /* select trim value based on change*/
        $('.trimSelect .options li').live('click', function () {
            var selectedMsrp = $(this).attr('data-msrp');
            var saleTax = $(this).attr('data-sales');
            $('.negotiated').val(selectedMsrp);
            $('.msrpvalue').text(selectedMsrp);
            $('.titleandreg').text(saleTax);
            $this = $(this);
            var decPoint = parseInt($this.attr('data-decpoint'));
            if (isNaN(decPoint)) {
                decPoint = 2;
            }
            $('.calc-block .' + $this.attr('name'))
                .val(numberWithCommas($this.val(), decPoint));
            calculateMe();
        });

        $('.default .options li').live('click', function () {
            $('.msrpvalue').text('$0');
            $('.negotiated').val(0);
            $('.taxval').text('$0');
            $('.titleandreg').text('0');
            $('.tradein').val(0);
            $('.downpayment').val(0);
            $('.moLoan').text('$0');
        });

        $(".calc-block input").each(function () {
            var thisValue = $(this).val();
            thisValue = thisValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            $(this).val(thisValue);
        });

        $('.calc-block input').change(function () {
            $this = $(this);
            var decPoint = parseInt($this.attr('data-decpoint'));
            if (isNaN(decPoint)) {
                decPoint = 2;
            }
            $('.calc-block .' + $this.attr('name'))
                .val(numberWithCommas($this.val(), decPoint));
            calculateMe();
        });
        // calculateMe();
        $(".calc-block input[type='text']").numeric();
    });

})(jQuery);