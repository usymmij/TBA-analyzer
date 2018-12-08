//call using:
//  <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script>
//  <script src='apiRetrieve.js'></script>

var baseURL =  'https://www.thebluealliance.com/api/v3/';
var hmm = '';
var hmmKey;
var hmmVal;
var jqxhr;

function TBAretrieve(inURL){
	jqxhr = $.ajax({
	url: baseURL + inURL,
	dataType:'HTML',
	async: false,
	success:(function(data){
		hmm = data;
		hmm = JSON.parse(hmm, (hmmKey, hmmVal));
	}),
	headers: {'X-TBA-Auth-Key': '7zyl3s8GtJlKGQs0jo053ZHYyY4pXaYJuYGNV85sOhF4cUAnyZ6idKGVVm6lLMpw'}    
});
}