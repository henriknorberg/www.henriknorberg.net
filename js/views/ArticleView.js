/////////////////////////////////////////////////
//*          	Article View
/////////////////////////////////////////////////

$(function() {

    var p = {}; 

// static interface:

// public properties:
    p.data = undefined;

    p.pageElements = null;

//  public methods:
    p.initialize = function(params) {
        
        this.model.bind('change:state', this.updateData, this);
    
        
        this.preHeadline = this.$('.pre-headline');
        this.h1 = this.$('h1');
        this.h2 = this.$('h2');
        this.article = this.$('section .body-tekst');
        this.mediaItem =  $("head #media-tmpl").html();

        this.$(".media-area").hide();
        this.pageElements = [this.preHeadline,this.h1,this.h2,this.article];
         console.log("Article VIEW INIT " + this.mediaItem);
    };

//  protected methods:
    p.updateData = function (model, value, options) {
        console.log("ArticleView updateData: "+appData[value]);

        this.data = appData[value];
        this.state = this.data.pageData.url;
        this.stateColor = this.data.pageData.color;

        //hide media
        this.$(".media-area").slideUp();

       // /* ANIMATE OUT
        p.transAllOut(this.pageElements);
        var that = this;
        setTimeout(function(){
            that.updateView();
        }, AppModel.STEP_SPEED *  Math.floor(this.pageElements.length));

        //*/

        //this.updateView();
    };

    p.updateView = function () {
        var that = this;
        console.log(" Title  "+this.data.story.title);
        
        //Henrik todo: make clean up functions in case new content fails

        this.preHeadline.html(this.data.story.preHeadline);
        this.h1.html( this.data.story.title).css({"color":this.stateColor});
        this.h2.html( this.data.story.subTitle);
        this.article.html( this.data.story.story);

        //animate elements in
        p.initAnimState(this.pageElements);
        p.transAllIn(this.pageElements);

        //IF MEDIA BUILD LIST
        if (this.data.media){
            //this.renderMedia(this.data.media.images);
            var gallery = new GalleryView({el:$('.media-area')});
            gallery.render(this.data.media.images, this.mediaItem);

            //open area
            this.mediaElement = this.$(".media-area");
             setTimeout( function(){
                    that.mediaElement.slideDown(800);
                },600);
            
            //fade in elements
            this.mediaElements = this.$(".media-area .media-item");

            that.mediaElements.addClass("init-fade");
            that.mediaElements.each(function(i,item){
                setTimeout( function(){
                    $(item).addClass("fade-in");
                    //that.mediaItem.show();
                }, (AppModel.STEP_SPEED * i) + 1000); 
             });

        } else {
            
           /**/
        }

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