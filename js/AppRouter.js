/////////////////////////////////////////////////
//*          	APPLICATION Router
//***************************************** 

$(function () {
    var p = {};


//	static properties:


//	public properties:
    p.model = null;
    p.stateQuery = null;
    p.data = null;
    p.routes = {
        "" : "navigateHome",
        ":query/:page" : "setState",
        "*undefined": "navigate404"
    };



//	public methods:
    p.initialize = function (params) {
        this.model = params.model;
    };

//  protected methods:
    p.navigateHome = function() {
        this.navigateTo('#!/home');
    };

    p.setState = function(query, page) {
        this.data = appData[page];
         console.log('AppRoute: Navigate to State ', page);

        if(this.data){
            
            // page setup
            this.model.set({
                stateClass: this.data.pageData.classID,
                state: page,
                menuState: page
            });

            var myQuery = '#!/'+page;
            this.navigateTo(myQuery);
        } else {
            this.navigate404();
        }

        // navigate
    };

    p.navigateTo = function (query) {
        // console.log('Navigating to ', query);
        this.navigate(""+query, {trigger:true, replace:true, pushstate:true});        
    }
    //  Error handling
    p.navigate404 = function () {
         console.log('404page');
        //window.location = '/404.html';
    }

//	create object
	window.AppRouter = Backbone.Router.extend(p, {});
    //window.AppRouter.history.start({pushState:true});
});