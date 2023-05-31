(function( $ ) {
  
   $(document).ready(function() {
    "use strict";

    $( "#cica_chatgpt-button-submit" ).on( "click", function(e) { 
      e.preventDefault();
      // Get the element that contains the typing animation
      var cicg_chatGptText = $('#chatgpt-text').val();
  
      //general settings value
      var cicg_apiKey =  chatgpt_settings_data.chatgpt_api_key;
      var cicg_apiMaxTokens = parseFloat(chatgpt_settings_data.chatgpt_api_max_tokens);
      var cicg_apiTemperature = parseFloat(chatgpt_settings_data.api_temperature);
    
      var cicg_apiTitle = {
         "url": "https://api.openai.com/v1/completions",
         "method": "POST",
         "timeout": 0,
         "headers": {
           "Content-Type": "application/json",
           "Authorization": "Bearer "+ cicg_apiKey
         },
         "data": JSON.stringify({
           "model": "text-davinci-003",
           "prompt": 'Please generate desciption about'+cicg_chatGptText,
           "max_tokens": cicg_apiMaxTokens,
           "temperature": cicg_apiTemperature
         }),
         beforeSend: function(){ 
            $('.response-icon').hide();
            $('.response-loader').show();
        },
       };   
       $.ajax(cicg_apiTitle).done(function (response) {
        var headingInput = $('#chatgpt-text').val();        
        var $container = $('#message-container');    
        var postDescriptionApi = response.choices[0].text;
        var jsonTextRemove = postDescriptionApi.replace(/^\s+/, '');
        var htmlString = jsonTextRemove.replace(/\n/g, '<br>');
        
         var message = htmlString.split(' ');
         var i = 0;
         var delay = 50; // delay between each character
         var timeoutDelay = 1000; // delay between each response
         var heading = '<div class="response-heading">'+headingInput+'</div>';
         var typing = setInterval(function() {
           if (i === 0) {
             $container.append(heading);
           }
           $container.append(message[i] + ' ');
           i++;
           if (i === message.length) {
             clearInterval(typing);
             setTimeout(function() {
               $container.append('<br>');
               $container.scrollTop($container[0].scrollHeight);
             }, timeoutDelay);
           }
           
               
         }, delay);  
         var clearInput = $('#chatgpt-text').val(''); 
         $('.cica_chatgpt-button-loader').hide();       
       });
      });
     
    });
    
})( jQuery );