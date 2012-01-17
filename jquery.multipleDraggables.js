/*
 * jQuery Multiple Draggables
 *
 * Version 0.6
 *
 * Author : Hadeer Younis <iistcrimi@gmail.com>
 *
 */
(function ($) {
    $.fn.multipleDraggables = function (options) {

        var settings = $.extend({
            start: function() {},
            drag: function() {},
            stop: function() {},
            select: false,
            click: function() {},
            placeholder: 'clone',
            highlight: 'highlight'
        }, options);

        var offset = 0;
        var us = this;
        var t;
        var to_drag = this;

        if(settings.select)
        {
            onClickHandler();
        }
        else
        {
            this.mousedown(function () {
                $('.ui-multi-dragging').removeClass('ui-multi-dragging');
                $(this).addClass('ui-multi-dragging');
            });
            attachDragEventHandler(this);
        }
        /*******************HELPER METHODS***************************/

        function onClickHandler()
        {
            $(us).click(function(){
                if($(this).hasClass('ui-multi-fix'))
                {
                    $(this).removeClass('ui-multi-fix');
                    return;
                }
                $(this).toggleClass('ui-multi-selected '+settings.highlight);
                if($(this).hasClass('ui-multi-selected '+settings.highlight))
                {
                    to_drag = $('.ui-multi-selected');
                    $(this).mousedown(function () {
                        $('.ui-multi-dragging').removeClass('ui-multi-dragging');
                        $(this).addClass('ui-multi-dragging');
                    });
                    attachDragEventHandler(this);
                }
                else
                {
                    to_drag = $('.ui-multi-selected');
                    $(this).draggable("destroy")
                    $(this).unbind('mousedown');
                }
                settings.click()
            });
        }

        function attachDragEventHandler(me) {
            $(me).draggable({
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
            offset = $('.ui-multi-dragging').position();
            $('.ui-multi-dragging').addClass('ui-multi-fix')
            var i = 0;
            var sisters = [];
            $(to_drag).each(function () {
                jQuery.data(this, 'x', $(this).position().left);
                jQuery.data(this, 'y', $(this).position().top);
                sisters.push($(this).clone())
            }).css('position', 'absolute');
            $(to_drag).each(function(){
                $(this).after(sisters[i].addClass(settings.placeholder));
                if($(this).hasClass('ui-multi-dragging'))
                {
                    $(this).css('margin-right','-'+$(this).outerWidth()+'px')
                    $(this).next().removeClass('ui-multi-dragging');
                }
                i++;
            });
            t = window.setTimeout(help, 400);
        }

        function revertHelper() {
            clearTimeout(t);
            $(to_drag).each(function () {
                if($(this).hasClass('ui-multi-dragging'))
                    return;
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
            $('.clone').remove()
            settings.stop();
        }

        function help() {
            var deg = 15;
            $(to_drag).each(function () {
                if($(this).hasClass('ui-multi-dragging'))
                    return;
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
                if($(this).hasClass('ui-multi-dragging'))
                    return;
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