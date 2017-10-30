$(document).ready(function(e){
  loadData();

  $("#showHistory").click(function(e){
    loadData();
  });

  $(inputSteps.submitButton).click(function(e){

    e.preventDefault(); //to keep it from reloading

    var d = new Date();
    var createdStepDay = {};
    var month;
    var day = d.getDay();

    switch( parseInt(d.getMonth()) ) {
        case 1: month = "01"; break;
        case 2: month= "02"; break;
        case 3: month= "03"; break;
        case 4: month= "04"; break;
        case 5: month= "05"; break;
        case 6: month= "06"; break;
        case 7: month= "07"; break;
        case 8: month= "08"; break;
        case 9: month= "09"; break;
        case 10: month= "10"; break;
        case 11 : month="11"; break;
        case 12 : month= "12"; break;
        default: "Didn't work";

        // case 1: month = "January"; break;
        // case 2: month= "February"; break;
        // case 3: month= "March"; break;
        // case 4: month= "April"; break;
        // case 5: month= "May"; break;
        // case 6: month= "June"; break;
        // case 7: month= "July"; break;
        // case 8: month= "August"; break;
        // case 9: month= "September"; break;
        // case 10: month= "October"; break;
        // case 11 : month="November"; break;
        // case 12 : month= "December"; break;
    }
    //day formatting
    if(d.getDay() < 10){
      day = String("0" + d.getDay());
    }


    createdStepDay.dateStepped = month + "\/" + day + "\/" + "2017";
    createdStepDay.steps = $(inputSteps.stepsForDay).val();


    var stepDayToDB = $.ajax({
      type: "POST",
      url: "rest/stepDays", //this url must map to our post controller method, proper pathing
      datatype:"json",
      contentType:"application/json",
      data:JSON.stringify(createdStepDay)
    });

    //now we'll put stuff in here to empty the div with the form, and display the new row in it
    //remember to append all of this to a div
    stepDayToDB.done(loadData);
  });
}); //closes off document.ready

  function loadSingleInstance(data, status){
    var newData = $.ajax({
      type:"GET",
      url:"rest/stepDays/" + data.id, //was data[id] and was saying its undefined... why ?
      datatype:"json"
    });

    newData.done(populateTable);
  }

  function loadData(){

	$("#content").empty();

    var stepDays = $.ajax({
      type:"GET",
      url:"rest/stepDays",
      datatype:"json"
    });
    stepDays.done(populateTable);
  }


//need to make sure this in scope at some point
//data is name of our list of objects
  function populateTable(data, status){ //does this HAVE to have these names in params?

    var steps = 0; //something to keep running total

    var $h3 = $("<h3>");
    $h3.text("Steps Log: ");
    $("#content").append($h3);

      var $table = $("<table>");
      $table.attr("id", "stepTable");

    //header stuff
      var $thead = $("<thead>");
      var $tr = $("<tr>");
      var $thID = $("<th>");
      var $thDate = $("<th>");
      var $thSteps = $("<th>");
      var $thEdit = $("<th>");
      var $thDelete = $("<th>");
      $thID.text("ID");
      $thDate.text("Date");
      $thSteps.text("Steps");
      // $thEdit.text("Edit");
      // $thDate.text("Delete");
      $tr.append($thID, $thDate, $thSteps);//, $thEdit, $thDelete
      $thead.append($tr);
      $table.append($thead);

    //body stuff. Need to build it in a loop and if only one entry, great, if more, also great
    //need to add the StepDay to the DB, and then call the whole new list from the db and do this
    //this (table creation stuff) can even get moved out to its own function
      var $tbody = $("<tbody>");

      data.forEach(function(element){
    	  console.log(element)
        //creating dom elements
        var $tr = $("<tr>");
        var $tdID = $("<td>");
        var $tdDate = $("<td>");
        var $tdSteps = $("<td>");
        var $tdEdit = $("<button>");
        var $tdDelete = $("<button>");
        //assigning the text in each dom element to the current StepDay's properties
        $tdID.text(element.id); //element.id.. id is the property name in the POJO. Name must match exactly
        $tdDate.text(element.dateStepped);
        $tdSteps.text(element.steps);
        //giving buttons ids to target them
        $tdEdit.attr("id", "edit" + $tdID.text());//want this to have an id unique to each row
        $tdEdit.text("Edit"); //button says "Edit"
        $tdDelete.attr("id", "delete"+ $tdID.text());
        $tdDelete.text("Delete");
        //append each of these to the row
        $tr.append($tdID, $tdDate, $tdSteps, $tdEdit, $tdDelete);
        //append to the table body
        $tbody.append($tr);

        //Click events for update, and delete, within ForEach so each one gets an event
        $tdDelete.click(function(e){
          //call to the delete method in controller
          var deleteStepDay = $.ajax({
            type:"DELETE",
            url:"rest/stepDays/" + element.id, //element.id because $tdID.text() is not in scope.
          });
          deleteStepDay.done(loadData); //when done, go to loadData method
        });

      $tdEdit.click(function(e){
          //need to clear the page, (empty out the divs), place this in there
          //need to include reloading the stuff into the divs in the loadData method
          //... might already be doing that tho
          //call to update method in controller


          //empty the content div and append a form
          $("#content").empty();
          var $form = $("<form>");
          $form.attr("name", "editForm");
          // $inputDate = $("<input>");
          // $inputDate.attr("name", "inputDate");
          // $pDate =$("<p>");
          // $pDate.text("Date: ");
          $inputSteps = $("<input>");
          $inputSteps.attr("name", "inputSteps");
          $pSteps =$("<p>");
          $pSteps.text("Steps: ");
          $submitButton = $("<button>");
          $submitButton.attr("name", "inputButton");
          $submitButton.text("Update");

          $form.append($pSteps, $inputSteps, $submitButton);
          $("#content").append($form);

          var newStepDayForUpdate;
          $(editForm.inputButton).click(function(e){ //we refer to forms by name property only
            e.preventDefault(); //don't want to refresh when we clicked a form
            newStepDayForUpdate = {
              "steps":$(editForm.inputSteps).val()
            }
            var updateStepDay = $.ajax({
              type:"PUT",
              url:"rest/stepDays/" + element.id, //local object in for each
              datatype:"json",
              contentType:"application/json",
              data:JSON.stringify(newStepDayForUpdate)
            });

            updateStepDay.done(loadData);
          });
      });

      //running total of steps
      steps = steps + element.steps;

    });

      //append body to the table, and the table to content div
      $table.append($tbody);
      $("#content").append($table);

      //Add the running total of steps to the new div
      $("#progressReport").empty();
      $h3Steps = $("<h3>");
      $h3Steps.text("Total Steps to Date: " + steps);
      $("#progressReport").append($h3Steps);




  }
