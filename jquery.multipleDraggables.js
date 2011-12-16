/*
 * jQuery Multiple Draggables
 *
 * Version 0.4
 *
 * Author : Hadeer Younis <iistcrimi@gmail.com>
 *
 */
(function ($) {
    $.fn.multipleDraggable = function (options) {
        var settings = $.extend({
            duration: 1000,
            start: function () {},
            drag: function () {},
            stop: function () {},
        }, options);
        var no_animate = false;
        var offset = 0;
        var toggle = true;
        this.addClass('ui-multi-draggables');
        this.mousedown(function () {
            $(this).addClass('ui-multi-dragging');
        })
        attachtaskDragEventHandler();

        /*******************HELPER METHODS***************************/

        function attachtaskDragEventHandler() {
            $('.ui-multi-draggables').draggable({
                start: function () {
                    startHelper();
                    settings.start();
                },
                drag: function (e) {
                    dragHelper(e);
                    settings.drag();
                },
                stop: function () {
                    stopHelper();
                }
            }).removeAttr('style')
        }

        function startHelper() {

            offset = $('.ui-multi-dragging:first').offset();
            $('.ui-multi-draggables').each(function () {
                $(this).attr('x', $(this).offset().left).attr('y', $(this).offset().top).css({
                    top: $(this).attr('y') + 'px',
                    left: $(this).attr('x') + 'px'
                })
            }).css('position', 'absolute');
            window.setTimeout(help, 200);
        }

        function stopHelper() {
            $('.ui-multi-draggables').each(function () {
                $(this).animate({
                    top: $(this).attr('y') + 'px',
                    left: $(this).attr('x') + 'px'
                }, settings.duration, function () {
                    $(this).removeAttr('style');
                    settings.stop();
                });
            });
            no_animate = false;
        }

        function help() {
            toggle = false;
            $('.ui-multi-draggables').each(function () {
                var offset_me = $('.ui-multi-dragging:first').offset();
                $(this).stop().animate({
                    top: offset_me.top + 'px',
                    left: offset_me.left + 'px'
                }, 100, function () {
                    no_animate = true;
                    toggle = true;
                });
            });
        }

        function dragHelper(e) {
            var offset_new = $('.ui-multi-dragging:first').offset();
            if (!no_animate && toggle) {
                $('.ui-multi-draggables').each(function () {
                    var me_x = parseInt($(this).attr('x'), 10) + (offset_new.left - offset.left);
                    var me_y = parseInt($(this).attr('y'), 10) + (offset_new.top - offset.top);
                    $(this).css({
                        top: me_y + 'px',
                        left: me_x + 'px'
                    });
                });
            } else if (!toggle) {
                $('.ui-multi-draggables').each(function () {
                    $(this).stop().animate({
                        top: offset_new.top + 'px',
                        left: offset_new.top + 'px'
                    }, 100, function () {
                        no_animate = true;
                        toggle = true;
                    });
                });
            } else {
                $('.ui-multi-draggables').offset(offset_new);
            };
        }
    };
})(jQuery);
