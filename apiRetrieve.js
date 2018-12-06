<!DOCTYPE HTML>
<html>
	<p id='demo'>qwer</p>
	<div></div>
  <body>
  
  <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script>
  
    <button>qwertyuioplkjhgfdsaxcvbnmkjohsfydoiusa</button>
  <script>

 $('button').click(function(){
 var hmm = '';
 var jqxhr = $.ajax({
    url: 'https://www.thebluealliance.com/api/v3/team/frc4253',
	dataType:'HTML',
	headers: {'X-TBA-Auth-Key': '7zyl3s8GtJlKGQs0jo053ZHYyY4pXaYJuYGNV85sOhF4cUAnyZ6idKGVVm6lLMpw'}    
})
$.when(jqxhr).done(function(data) { 
    $('#demo').replaceWith("");
	console.log(data);
	hmm = jQuery.parseHTML(data);
   $('div').append(hmm);
   });
 });
</script>
  </body>
</html>	
