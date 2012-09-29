/////////////////////////////////////////////////
//*              MENU View
/////////////////////////////////////////////////

$(function() { 

    var p = {}; 

// public properties:
    p.menu = null;
    p.pageData = null;
    p.myDemoData = null;
    p.underline = null;
    p.pageColor = null;
    p.tempMenuItem = null;
    p.setRegElement = null;

    p.activeMenu =null;
    p.activeMenuItem =null;
    
    p.prevActiveMenu =null;

    p.events = {
        'click .main-menu li a': 'handleClick',
        'mouseenter .main-menu li a':'handleMouseEnter',
        'mouseleave .main-menu li a':'handleMouseLeave',
        'focusin .main-menu li a':'handleMouseEnter',
        'focusout .main-menu li a':'handleMouseLeave'
    };

//  public methods:
    p.initialize = function(params) {        
        this.model.bind('change:menuState', this.updatePage, this);


        this.menu = this.$('.main-menu'); //not SET!
        this.menu.append('<li class="main-menu-underline nav-item"></li>');

        this.activeMenu =".home";
        this.underline = $('.main-menu-underline');
        
        console.log("MainMenuView INIT");
    }

//  protected methods:
    p.updatePage = function (model, value, options) {
        
        

        var titleTag = appData[value].banner.description;
        this.$('.main-menu a').attr('title', titleTag);
        this.activeMenuItem = appData[value].pageData.classId;
        this.pageData = appData[value].pageData;
        this.tempMenuItem = this.$('.' + appData[value].pageData.classID);
        this.pageColor = this.pageData.color;

        console.log("updatePage: "+this.pageColor   );
        
        this.updateUnderline();
    }
    p.updateUnderline = function () {

        if (this.setRegElement) this.setRegElement.removeClass("activeMenu");
        this.setRegElement = this.model.get('menuState') ? this.tempMenuItem : this.activeMenu;
        this.setRegElement.addClass("activeMenu");
        //var newWidth = $(this.setRegElement).find('.text-product').width();
        var newWidth = $(this.setRegElement).width();
        console.log("_updateUnderline: width ==   "+ newWidth);
       
        var newXPos = Math.floor(this.setRegElement.position().left);
       
        this.underline.css({"left" : newXPos, "background-color" : this.pageColor});
        this.underline.width(newWidth);
    }

    //  HOVER STATES
    p.handleMouseEnter = function (event) {

        /*
        var newXPos = Math.floor($(event.currentTarget).position().left);
        this.underline.css({"left" : newXPos, "background-color" : this.pageColor});
        */
        
        /*
        console.log("Mouse Over Menu " +     $(event.currentTarget).attr("class") + " | " + this.pageData.classID);
        this.prevActiveMenu = this.pageData.classID;
        this.model.set({
            menuState: $(event.currentTarget).attr("class")
        });
        */
    }
    p.handleMouseLeave = function (event) {
        /*
        var newXPos = Math.floor(this.setRegElement.position().left);
        this.underline.css({"left" : newXPos, "background-color" : this.pageColor});
        */

        /*
        console.log("Mouse Out " + this.model.get('menuState'));
        //this.prevActiveMenu = $(event.currentTarget).attr("class");
        this.model.set({
            menuState: this.prevActiveMenu//this.model.get('menuState')
        });
        */
    }

    //Resize
    $(window).resize(function() {
        window.App.menu.updateUnderline()
    });


    p.handleClick = function (event){
        var isDisabled = $(event.currentTarget).hasClass("disabled")
        if(isDisabled){
            event.preventDefault();
        }
    }
    

//  create object
    window.MainMenuView = Backbone.View.extend(p, {});

});