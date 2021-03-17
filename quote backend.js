Parse.initialize("Application ID", "JavaScript key");

function saveInput(){
        //get our new values 
        var gallons = document.getElementById('gallons').value.trim();
        var dtinput = document.getElementById('dtinput').value.trim();
  
        
       // dont continue if either value is blank
       if(gallons=="" ||dtinput=="" ){
           alert ('Please fill in both fields.') ;
           return; 
       }
       
   
        // create the `Parse` object
        var gallond = Parse.Object.extend("gallond");
		var _gallond = new gallond();
		
        // set the object's values to our input values
		_gallond.set("gallons", gallons);
		_gallond.set("dtinput", dtinput);
		
        // save the object
		_gallond.save(null, {
		  success: function(_gallond) {
            // if the save succeeded, add the new info to our page
            retrieveSavedInputs()
            
		  },
		  error: function(_gallond, error) {
            // save failed, do error handeling here
			console.log('Failed to create new object, with error code: ' + error.message);
		  }
	    });
  }


function retrieveSavedInputs(){
     
      // create a query to search for  our `Klass` items
      var gallons = Parse.Object.extend("gallons");
      var state = Parse.Object.extend("state");
      var rateHistory = Parse.Object.extend("rateHistory");
      var query = new Parse.Query(gallons);
          query.find({
			success: function(results) {
            
              // get our table's `tbody`  and clear it
                function quoteoutput (state,gallons,rateHistory){
                   var gallons_input = gallons.gallons_input;
                   var state_location = state_location.state;
                   var rate_History = rate_History.rateHistory; 
                   var currentPrice = 1.5;

                   if (gallons_input>1000 && state_location="TX" && rate_History=true){
                     return price-per-gallons = currentPrice+ currentPrice*0.13
                   }else if (gallons_input>1000 && state_location="TX"){
                     return price-per-gallons = currentPrice+ currentPrice*0.14
                   }else if (gallons_input>1000 && rate_History=true){
                     return price-per-gallons = currentPrice+ currentPrice*0.15
                   }else if (state_location="TX" && rate_History=true){
                     return price-per-gallons = currentPrice+ currentPrice*0.14
                   }else if (gallons_input>1000){
                     return price-per-gallons = currentPrice+ currentPrice*0.16
                   }else if (state_location="TX"){
                     return price-per-gallons = currentPrice+ currentPrice*0.15
                   }else if (rate_History=true){
                     return price-per-gallons = currentPrice+ currentPrice*0.16
                   }else {
                     return price-per-gallons = currentPrice+ currentPrice*0.17
                   }
                }
                              
              }
			},
			error: function(error) {
			console.log("Error: " + error.code + " " + error.message);
			}
      });
}

// load all previously saved items
window.onload = retrieveSavedInputs(); 

//clcik handeler for the btn
document.getElementById("myBtn").addEventListener('click', saveInput , false);