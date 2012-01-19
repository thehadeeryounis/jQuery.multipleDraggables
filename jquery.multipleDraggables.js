/*
 * jQuery Multiple Draggables
 *
 * Version 0.9
 *
 * Author : Hadeer Younis <iistcrimi@gmail.com>
 *
 */
(function ($) {
    $.fn.multipleDraggables = function (options) {

        var settings = $.extend({
            handle: false,
            select: false,  
            placeholder: 'clone',
            highlight: 'ui-multi-selected',
            liveMode: false,
            selector: false,
            start: function() {},
            drag: function() {},
            stop: function() {},
            click: function() {}
        }, options);

        var offset = 0;
        var t;
        var to_drag = this;
        var down = 1;

        init(this);
    
        /*******************HELPER METHODS***************************/

        function init(us)
        {
            if(settings.liveMode)
            {
                $(settings.selector).live('mouseover',function(){
                    if(!jQuery.data(this, "jqm"))
                    {
                        attachDragEventHandler(this);
                        attachMouseListener(this);
                        jQuery.data(this, "jqm", true);
                    }
                });
            }
            
            us.each(function(){
                jQuery.data(this, "jqm", true);
            });

            attachDragEventHandler(us);

            attachMouseListener(us);
        }

        function attachMouseListener(us)
        {
            $(us).mousedown(function () {
                if($(this).hasClass(settings.highlight))
                    down = 1;
                else
                    down = -1;
                $(this).addClass(settings.highlight);
                $('.ui-multi-dragging').removeClass('ui-multi-dragging');
                $(this).addClass('ui-multi-dragging');
                to_drag = $('.'+settings.highlight).not('.ui-multi-dragging');
                console.log(to_drag);
            });

            if(!settings.select)
                $(us).addClass(settings.highlight)
            else
                $(us).mouseup(function(){
                    down++;
                    if(down == 2)
                        $(this).removeClass(settings.highlight)
                    settings.click()    
                });
        }

        function attachDragEventHandler(me) {
            $(me).draggable({
                handle: settings.handle,
                start: function () {
                    startHelper();
                    settings.start();
                },
                drag: function (e) {
                    dragHelper(e);
                    settings.drag();
                },
                addClasses: false,
                stop: function () {
                    stopHelper();  
                },
                revert: function(){
                    revertHelper();
                    return true;
                },
                revertDuration: 500,
                zIndex:10
            }).removeAttr('style')
        }

        function startHelper() {
            down++;
            offset = $('.ui-multi-dragging').position();
            $(to_drag).each(function () {
                jQuery.data(this, 'x', $(this).position().left);
                jQuery.data(this, 'y', $(this).position().top);
                $(this).after('<div class="'+settings.placeholder+'"></div>')
                $(this).next().hide();
            }).css('position', 'absolute');
            $('.ui-multi-dragging').after('<div class="'+settings.placeholder+'"></div>');
            $('.ui-multi-dragging').css({
                marginRight: '-'+$('.ui-multi-dragging').outerWidth()+'px !important',
                position: 'relative !important'
            });
            $('.'+settings.placeholder).show();
            t = window.setTimeout(help, 400);
        }

        function revertHelper() {
            clearTimeout(t);
            $(to_drag).each(function () {
                $(this).addClass('animate2').css({
                    transform: 'rotate(0deg)',
                    '-moz-transform': 'rotate(0deg)',
                    '-o-transform': 'rotate(0deg)',
                    '-webkit-transform': 'rotate(0deg)',
                    top: jQuery.data(this, "y") + 'px',
                    left: jQuery.data(this, "x") + 'px'
                })
            })
        }

        function stopHelper() {
            $(to_drag).removeClass('rotate animate animate2').removeAttr('style')
            $('.'+settings.placeholder).remove();
            $('.ui-multi-dragging').removeAttr('style');
            settings.stop();
        }

        function help() {
            var deg = 15;
            $(to_drag).each(function () {
                $(this).addClass('animate')
                var d_x = offset.left - parseInt(jQuery.data(this, "x"));
                var d_y = offset.top - parseInt(jQuery.data(this, "y"));
                deg *= -1;
                $(this).css({
                    transform: 'translate(' + d_x + 'px,' + d_y + 'px) rotate('+deg+'deg) ',
                    '-moz-transform': 'translate(' + d_x + 'px,' + d_y + 'px) rotate('+deg+'deg) ',
                    '-o-transform': 'translate(' + d_x + 'px,' + d_y + 'px) rotate('+deg+'deg) ',
                    '-webkit-transform': 'translate(' + d_x + 'px,' + d_y + 'px) rotate('+deg+'deg) '
                })
            })
        }

        function dragHelper(e) {
            var offset_new = $('.ui-multi-dragging').position();
            $(to_drag).each(function () {
                var me_x = parseInt(jQuery.data(this, "x"), 10) + (offset_new.left - offset.left);
                var me_y = parseInt(jQuery.data(this, "y"), 10) + (offset_new.top - offset.top);
                $(this).css({
                    top: me_y + 'px',
                    left: me_x + 'px'
                });
            });
        }
    };
})(jQuery);