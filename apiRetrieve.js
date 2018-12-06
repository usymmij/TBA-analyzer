<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script>

<script>
var hmm = '';
var hmmKey;
var hmmVal;
var jqxhr = $.ajax({
	url: 'https://www.thebluealliance.com/api/v3/team/frc4253',
	dataType:'HTML',
	headers: {'X-TBA-Auth-Key': '7zyl3s8GtJlKGQs0jo053ZHYyY4pXaYJuYGNV85sOhF4cUAnyZ6idKGVVm6lLMpw'}    
})
$.when(jqxhr).done(function(data) { 
	console.log(data);
	hmm = data;
	hmm = JSON.parse(hmm, (hmmKey, hmmVal));
	console.log(hmm);
});
</script>
