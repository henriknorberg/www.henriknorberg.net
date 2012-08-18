/////////////////////////////////////////////////
//*
//*          	HEAD View
//*
/////////////////////////////////////////////////

$(function() {

    var p = {}; 

// static interface:

// public properties:
    p.data = undefined;
    p.favicon = null;
    p.description = null;

//  public methods:
    p.initialize = function(params) {
        this.model.bind('change:state', this.updatePage, this);
        this.favicon = $('#favicon');
        this.description = $('meta[name=description]');
        console.log("HeadView INIT") 
    };

//  protected methods:
    p.updateState = function (model, value, options) {
        console.log("HEADView _updateState: "+appData[value]);

        this.data = appData[value];
        this.favicon.attr('href', this.data.headData.favicon);
        
        if(this.model.get('showDemoView')){
            this.replaceWithDemoData();
        } else {
            this.replaceWithStateData();
        }
    };
    p.replaceWithStatePage = function () {
        document.title = this.data.headData.titleTag;
        this.description.attr('content', this.data.headData.description);
    };
	window.HeadView = Backbone.View.extend(p, {});
});