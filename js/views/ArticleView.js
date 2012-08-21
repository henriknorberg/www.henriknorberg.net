/////////////////////////////////////////////////
//*          	HEAD View
/////////////////////////////////////////////////

$(function() {

    var p = {}; 

// static interface:

// public properties:
    p.data = undefined;

    p.pageElements = null;

//  public methods:
    p.initialize = function(params) {
        this.model.bind('change:state', this.updatePage, this);
    
        
        this.preHeadline = this.$('.pre-headline');
        this.h1 = this.$('h1');
        this.h2 = this.$('h2');
        this.article = this.$('section .body-tekst');

        this.pageElements = [this.preHeadline,this.h1,this.h2,this.article];
         console.log("Article VIEW INIT")  
    };

//  protected methods:
    p.updatePage = function (model, value, options) {
        console.log("ArticleView updatePage: "+appData[value]);

        this.data = appData[value];
        this.stateColor = this.data.pageData.color;

       // /* ANIMATE OUT
        p.transAllOut(this.pageElements);
        var that = this;
        setTimeout(function(){
            that.replaceWithStateData();
        }, AppModel.STEP_SPEED * Math.floor(this.pageElements.length));

        //*/

        //this.replaceWithStateData();
    };

    p.replaceWithStateData = function () {
        console.log(" Title  "+this.data.story.title);
        
        //Henrik todo: make clean up functions in case new content fails

        this.preHeadline.html(this.data.story.preHeadline);
        this.h1.html( this.data.story.title).css({"color":this.stateColor});
        this.h2.html( this.data.story.subTitle);
        this.article.html( this.data.story.story);

        p.initAnimState(this.pageElements);

        p.transAllIn(this.pageElements);


    };

    p.initAnimState = function (elems){
         elems.forEach(function(el){
            el.addClass('init-state').removeClass('in').removeClass('out');
         });
    };

    p.transAllIn = function (elems){
        elems.forEach(function(el,indx){
                setTimeout(function(){
                      p.transIn(el);
                    }, AppModel.STEP_SPEED * (indx));
        });
    };

    p.transAllOut = function (elems){
        if(!elems) return
        elems.forEach(function(el,indx){
                setTimeout(function(){
                      p.transOut(el);
                    }, AppModel.STEP_SPEED * indx);
        });
    };

    p.transIn = function (el) {
       el.addClass('init-state').addClass('in').removeClass('out');
    };

    p.transOut = function (el) {
      el.addClass('out').removeClass('in').removeClass('init-state');
    };

	window.ArticleView = Backbone.View.extend(p, {});
}); 