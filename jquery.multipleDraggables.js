/*
 * jQuery Multiple Draggables
 *
 * Version 0.5
 *
 * Author : Hadeer Younis <iistcrimi@gmail.com>
 *
 */
(function ($) {
    $.fn.multipleDraggable = function (options) {
        var settings = $.extend({
            start: function () {},
            drag: function () {},
            stop: function () {},
        }, options);
        var offset = 0;
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
                $(this).attr('x', $(this).offset().left).attr('y', $(this).offset().top).offset($(this).offset());
            }).css('position', 'absolute');
            window.setTimeout(help, 400);
        }

        function stopHelper() {
            $('.ui-multi-draggables').addClass('animate2').each(function () {
                $(this).css({
                    transform: 'rotate(0deg)',
                    '-moz-transform': 'rotate(0deg)',
                    '-o-transform': 'rotate(0deg)',
                    '-webkit-transform': 'rotate(0deg)',
                    top: $(this).attr('y') + 'px',
                    left: $(this).attr('x') + 'px'
                })
            })
            window.setTimeout(cleanup, 700);
        }

        function cleanup() {
            $('.ui-multi-draggables,.ui-multi-dragging').removeClass('ui-multi-dragging rotate animate animate2').removeAttr('style');
            settings.stop();
        }

        function help() {
            var deg = 15;
            $('.ui-multi-draggables:not([class~="ui-multi-dragging"])').addClass('animate').each(function () {
                var d_x = offset.left - parseInt($(this).attr('x'));
                var d_y = offset.top - parseInt($(this).attr('y'));
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
            var offset_new = $('.ui-multi-dragging:first').offset();
            $('.ui-multi-draggables').each(function () {
                var me_x = parseInt($(this).attr('x'), 10) + (offset_new.left - offset.left);
                var me_y = parseInt($(this).attr('y'), 10) + (offset_new.top - offset.top);
                $(this).css({
                    top: me_y + 'px',
                    left: me_x + 'px'
                });
            });
        }
    };
})(jQuery);
