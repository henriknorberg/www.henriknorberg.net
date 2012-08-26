    

    var GalleryView = Backbone.View.extend(
    {
        template: "",
        initialize:
            function()
            {

                this.template = _.template( this.template);
            },
        render:
            function(mediaData, template) {
               

                
                // Using Plates for templating
                var that = this;
                var map = new Plates.Map();

                map.where('class').is('thumb').use('thumb').as('src');
                map.where('class').is('media-title').use('title');
                map.where('class').is('desc').use('desc');
                map.where('class').is('url').use('url').as('href');

                var output = Plates.bind(template, mediaData, map);
                console.log(this.$(".media-area"));
                this.$el.html(output);

                //Add interactions and Modal
                this.$(".media-item").each(function(i,item){
                    $(item).click(function(){
                        var mContent = $(this).clone();
                        mContent.addClass("modal-media-init").addClass("modal-media");

                        console.log(mContent);
                        //*
                        var view = new MediaModalView();
                        view.render(mContent).showModal({
                            fadeInDuration:500,
                            css:
                            {
                                "border": "none",
                                "background-color": "#f6f6f6",
                                "padding":"1.5em",
                                "-webkit-box-shadow": "0px 0px 15px 4px rgba(0, 0, 0, 0.5)",
                                "-moz-box-shadow": "0px 0px 15px 4px rgba(0, 0, 0, 0.5)",
                                "box-shadow": "0px 0px 16px 8px rgba(0, 0, 0, 0.5)",

                                "-webkit-border-radius": "0px",
                                "-moz-border-radius": "0px",
                                "border-radius": "0px"
                            }
                        });
                  });
        });
        

        console.log(that.pageElements);            

            }
    });
