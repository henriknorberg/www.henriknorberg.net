/////////////////////////////////////////////////
//*          	APPLICATION Model
/////////////////////////////////////////////////

$(function () {

    var p = {};
    var s = {}  ;


//	static properties:
    s.debugMode = true;
    s.TRANS_SHORT = 250;
    s.TRANS_LONG = 500;
    s.STEP_SPEED = 250;

//	public properties:
    p.defaults = {
        scrollY:            null,
        home:               "Home",
        // States
        state:              null,
        stateClass:         null,
        menuState:          null,
        menuStateColor:     null,

 		// Data
        stateData:          null,
        headData:           null,
        storyData:          null
    };

//	public methods:
console.log("APP MODEL INIT") 

//	create object
	window.AppModel = Backbone.Model.extend(p, s);

});