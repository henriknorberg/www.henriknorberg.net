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
        console.log("HeadView INIT");
        this.model.bind('change:state', this.updateData, this);
        this.favicon = $('#favicon');
        this.description = $('meta[name=description]');
    };

//  protected methods:
    p.updateData = function (model, value, options) {
        console.log("HEADView _updateState: "+appData[value]);

        this.data = appData[value];
        this.favicon.attr('href', this.data.headData.favicon);

        this.updateView();
    };
    p.updateView = function () {
        document.title = this.data.headData.titleTag;
        this.description.attr('content', this.data.headData.description);
    };
	window.HeadView = Backbone.View.extend(p, {});
});