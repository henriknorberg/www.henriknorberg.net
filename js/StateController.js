/////////////////////////////////////////////////
//*              STATE Controller
/////////////////////////////////////////////////

$(function () {

 console.log("StateController INIT") 

    var p = {};

//  protected properties
    p.initComplete = false;

//  public properties
    p.appRouter = null;
    p.appData = null;
    p.pageData = null;  
    p.mainMenu = null;
    // p.news = null;
    p.featureProduct = null;
    p.productBar = null;
    p.updates = null;
    p.story = null;
    p.body = null;
    p.html = null;
    p.hiddenNav = null;


//  public methods
    p.initialize = function (params) {
        if(this.initComplete == true){ return false; }
        this.initComplete = true;

        //  Listen for State Changes
        this.model.bind('change:state', this.updateState, this);
        this.model.bind('change:menuState', this.updateMenuState, this);

        //Adjust transition times depending on Browser. IE9 does not support CSS transitions
        if (navigator.appVersion.indexOf("MSIE") != -1){
            AppModel.TRANSITION_TIME_SHORT = 0;
            AppModel.TRANSITION_TIME_LONG = 50;
        }
        
        // Create Views

        /*VIEWS*/
        this.head = new HeadView({el:$('head'), model:this.model});
        this.menu = new MainMenuView({el:$('header nav'), model:this.model});
        this.article = new ArticleView({el:$('#main article'), model:this.model});

        this.body = $('body');
        this.html = $('html');

        //  Setup hashbang routes
        this.appRouter = new AppRouter({model:this.model});
        Backbone.history.start({pushState: false, root: "/"});
    }

//  private methods

    // States
    p.updateState = function(model, value, options) {
        this.pageData = appData[value].pageData;
        this.updateColor();
        if(this.model.get('home') == value){
            $('html, body').animate({ scrollTop: 0 }, 250)
        }
    }
    p.updateColor = function() {
        var self = this;
        $('.color-bg-CreateJS').each(function (i) {
            $(this).css('background-color', self.pageData.color);
        });        

    }

    window._model = null;




    p.updateMenuState = function(model, value, options) {
        this.updateModel(model, value);
    }
    p.updateModel = function(model,value) {
        var data = appData[value];
        this.model.set({
            pageData:              data.pageData,
            stateClass:             data.pageData.classID,
            featureProductData:     data.featureProductData,
            storyData:              data.story,
            docs:                   data.docs,
            tutorials:              data.tutorials
        });
    }
    p.handleScroll = function (event) {
        var scroll = this.body.scrollTop();
        if(scroll == 0) {
            scroll = this.html.scrollTop();
        }

        this.model.set({ scrollY: scroll })
        
        if(this.model.get('scrollY') < 70 && this.model.get('showModal') == false) {
            this.mainMenu.$('.sticky-bg').removeClass('in').addClass('out');
        } else {
            this.mainMenu.$('.sticky-bg').removeClass('out').addClass('in');
        }
    }

    window.StateController = Backbone.View.extend(p,{});

});