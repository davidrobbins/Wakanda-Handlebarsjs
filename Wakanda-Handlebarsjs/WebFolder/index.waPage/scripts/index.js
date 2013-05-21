
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock

var personUL$ = $('#personUL'), //Get jQuery reference to our <ul> for listing the Person collection.
	personDetailTemplateSource = $("#person-list-template").html(),
	personDetailTemplateFn = Handlebars.compile(personDetailTemplateSource),
	personData = "";
		
function buildPersonGrid() {
	personUL$.children().remove(); 
	
	ds.Person.all({
		onSuccess: function(ev1) {
			ev1.entityCollection.forEach({
				onSuccess: function(ev2) {	
					personData = 	{
						firstName:  ev2.entity.firstName.getValue(),
						lastName: 	ev2.entity.lastName.getValue(),
						city:    	ev2.entity.city.getValue(),
						dataId: 	ev2.entity.ID.getValue()
					};
					personUL$.append(personDetailTemplateFn(personData));
				}
			}); //ev1.entityCollection.forEach
		}
	});
	
}
// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		//event handlers
		personUL$.on('mouseenter', '.personPreview', function (event) {
	   		$(this).addClass('personSelected');
		});
		
		personUL$.on('mouseleave', '.personPreview', function (event) {
	   		$(this).removeClass('personSelected');
		});
		
		personUL$.on('click', '.personPreview', function (event) {
			var this$ = $(this);
	   		this$.addClass('personPermSelected');
	   		this$.siblings().removeClass('personPermSelected');
	   		
	   		/**/
	   		var personId = this$.children('div.personIdent').attr('data-id');
	   		ds.Person.find("ID = :1", personId, {
	   			onSuccess: function(event) {
	   				personObj.name = event.entity.fullName.getValue();
	   				waf.sources.personObj.sync();
	   			}
	   		});
	   		
		});
		
		buildPersonGrid();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
