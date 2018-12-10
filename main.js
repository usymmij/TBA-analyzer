//call using:
//  <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script>
//  <script src='apiRetrieve.js'></script>
//  <script src='/gameCalculation/main.js'></script>

function start(currentYear, maxYear){
    var yearWeekAr = [];
    if(parseInt($("input[name='yearInput']").val()) >= 2016 && parseInt($("input[name='yearInput']").val()) <= parseInt(maxYear) && parseInt(maxYear) != "NaN"){
        if($("input[name='yearInput']").val() != null){
            yearWeekAr[0] = parseInt($("input[name='yearInput']").val());
        }
    }
   else{
        yearWeekAr[0] = currentYear;
    }
    for(var i = 1; i < 7; i++){
        if($("input[name='w"+i+"']").is(":checked")){
            yearWeekAr[i] = 1;
        }else{
            yearWeekAr[i] = 0;
        }
    }
    return yearWeekAr;
}
/*
function (){

}
*/