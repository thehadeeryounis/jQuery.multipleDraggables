/*

A jQuery multiple draggable

Version 0.3

Author:
	Hadeer Younis

Project ho'.ui-multi-draggables':
	http://elleestcrimi.'.ui-multi-draggables'/2011/12/16/jquery-multiple-draggables

License:
This source file is subject to the BSD license bundled with this package.
Available online: {@link http://www.opensource.org/licenses/bsd-license.php}
If you did not receive a copy of the license, and are unable to obtain it, 
learn to use a search engine.
*/
(function ($) {
    $.fn.multipleDraggable = function (options) {
        var settings = $.extend({
            duration: 300,
            start:function(){},
            drag:function(){},
            stop:function(){},
        }, options);
        var no_animate = false;
        this.addClass('ui-multi-draggables');
        attachtaskDragEventHandler();
        

        /*******************HELPER '.ui-multi-draggables'THODS***************************/
        function attachtaskDragEventHandler() {
            $('.ui-multi-draggables').draggable({
                start: function () {
                    $('.ui-multi-draggables').each(function () {
                        $(this).attr('x', $(this).offset().left).attr('y', $(this).offset().top).css({
                            top: $(this).attr('y') + 'px',
                            left: $(this).attr('x') + 'px'
                        })
                    }).css('position', 'absolute');
                    settings.start();
                },
                stop: function () {
                    taskDragStopHelper();
                },
                drag: function (e) {
                    taskDragDraggingHelper(e);
                    settings.drag();
                }
            }).removeAttr('style')
        }

        function taskDragStopHelper() {
            $('.ui-multi-draggables').each(function () {
                $(this).animate({
                    top: $(this).attr('y') + 'px',
                    left: $(this).attr('x') + 'px'
                }, settings.duration, function () {
                    $(this).removeAttr('style');
                    wait = 0;
                    settings.stop();
                });
            });
            no_animate = false;
        }

        function taskDragDraggingHelper(e) {
            if (!no_animate) {
                $('.ui-multi-draggables').each(function () {
                    var x = e.pageX - $(this).width() / 2;
                    var y = e.pageY - $(this).height() / 2;
                    if (y - 5 < $(this).offset().top && y + 5 > $(this).offset().top && x - 5 < $(this).offset().left && x + 5 > $(this).offset().left) {
                        no_animate = true;
                    }
                    $(this).stop().animate({
                        top: y + 'px',
                        left: x + 'px'
                    }, settings.duration);
                });
            } else {
                $('.ui-multi-draggables').css({
                    top: e.pageY - $(this).width() / 2 + 'px',
                    left: e.pageX - $(this).height() / 2 + 'px'
                });
            };
        }
    };
})(jQuery);
