    

    var MediaModalView = Backbone.ModalView.extend(
    {
        template: "",
        initialize:
            function()
            {
                
            },
        events:
            {
                "click #escape-route": "close"
            },
        close:
            function( event)
            {
                event.preventDefault();
                 $(".modal-media").removeClass("modal-media");
                 console.log("MediaModalView: "+ this.$el );
            },
        render:
            function(t)
            {

                this.modElement = t;
                this.$el.html(t.html());
                return this;
            },

        hideModal:
            function()
            {
                 $(".modal-media").removeClass("modal-media");

                this.trigger( "closeModalWindow");

                this.hideModalBlanket();
                $(document.body).unbind( "keyup", this.keyup);
                $(document.body).unbind( "click", this.click);

                if( this.options.bodyOverflowHidden === true)
                {
                    $(document.body).css( "overflow", this.originalBodyOverflowValue);
                }

                var container = this.modalContainer;
                $(this.modalContainer)
                    .fadeOut(
                        this.options.fadeOutDuration,
                        function()
                        {
                            container.remove();
                        });
            }
    });
