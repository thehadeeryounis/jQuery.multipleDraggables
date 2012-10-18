(function ($) {
    $.fn.isAfter = function (sel) {
        return this.prevAll(sel).length != 0;
    }

    $.fn.multipleDraggables = function (method) {
        if (methods[method]) return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        else if (typeof method === 'object' || !method || method == undefined) return methods.init.apply(this, arguments);
        else $.error('Method ' + method + ' does not exist on jQuery.tooltip');
    };
var deg = 10;
var dropped = false;
var settings = {
    select: false,
    placeholder: 'clone',
    highlight: 'following',
    liveMode: false,
    selector: false,
    appendTo: 'body',
    start: function () {},
    drag: function () {},
    stop: function () {},
    click: function () {}
};
var methods = {
    init: function (options) {
        settings = $.extend(settings, options);
        $('.column').data('md',settings)
        $('.column').each(function (i, col) {
            col.addEventListener('dragstart', methods.dragStart, false);
            col.addEventListener('dragenter', methods.dragEnter, false);
            col.addEventListener('dragover', methods.dragOver, false);
            col.addEventListener('dragleave', methods.dragLeave, false);
            col.addEventListener('dragend', methods.dragEnd, false);
            col.addEventListener('drag', methods.drag, false);
            col.addEventListener('drop', methods.drop, false);
        }).click(methods.click).mousedown(methods.mouseDown);
    },
    get: function(field) {
        return methods.dragging().data('md')[field]
    },
    dragging: function(){
        return $(".dragging:first").removeClass('following')
    },
    mouseDown: function () {
        $(this).addClass("dragging being-dragged");
    },
    dragStart: function (e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
        me = methods.dragging()
        dropped = false;
        offset = me.offset()
        varx = offset.left - e.pageX
        vary = offset.top - e.pageY
        $('.' + methods.get('highlight')).addClass("being-dragged").each(function (i, obj) {
            var obj = $(this)
            var clone = obj.clone()
            clone.css({
                top: $(obj).offset().top,
                left: $(obj).offset().left,
            }).toggleClass(methods.get('placeholder'))

            $(methods.get('appendTo')).prepend(clone)

            var d_x = offset.left - $(obj).offset().left;
            var d_y = offset.top - $(obj).offset().top;
            clone.data('off', {
                top: d_y,
                left: d_x
            })
            clone.data('off_org', $(obj).offset())
            deg *= -1;
            clone.css({
                transform: 'translate(' + d_x + 'px,' + d_y + 'px) rotate(' + deg + 'deg) ',
                '-moz-transform': 'translate(' + d_x + 'px,' + d_y + 'px) rotate(' + deg + 'deg) ',
                '-o-transform': 'translate(' + d_x + 'px,' + d_y + 'px) rotate(' + deg + 'deg) ',
                '-webkit-transform': 'translate(' + d_x + 'px,' + d_y + 'px) rotate(' + deg + 'deg) ',
            })
        });
        $('.being-dragged').css('opacity', '0.4')
    },
    drag: function (e) {
        var pos = methods.dragging().offset()
        $('.' + methods.get('placeholder')).each(function () {
            var d_x = -1 * ($(this).data('off').left - e.pageX - varx)
            var d_y = -1 * ($(this).data('off').top - e.pageY - vary)
            $(this).css({
                top: d_y + "px",
                left: d_x + "px",
            })
        })
    },
    dragEnd: function (e) {
        if (dropped) {
            $('.' + methods.get('placeholder')).each(function () {
                $(this).css({
                    transform: 'translate(0px,0px) rotate(0deg) ',
                    '-moz-transform': 'translate(0px,0px) rotate(0deg) ',
                    '-o-transform': 'translate(0px,0px) rotate(0deg) ',
                    '-webkit-transform': 'translate(0px,0px) rotate(0deg) ',
                    top: $(this).data('off_org').top + "px",
                    left: $(this).data('off_org').left + "px",
                })
            })
            setTimeout(function () {
                $('.' + methods.get('placeholder')).remove()
                $('.being-dragged').css('opacity', '1')
            }, 500)
        }
        $('.dragging').addClass('following')
        $('.over,.dragging,.being-dragged').removeClass('over dragging being-dragged');

    },
    dragEnter: function (e) {
        $(this).addClass('over')
    },
    dragOver: function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
        $(this).addClass('over')
        return false;
    },
    dragLeave: function (e) {
        $('.over').removeClass('over');
    },
    drop: function (e) {
        dropped = true;
        e.stopPropagation();
        if ($(this).is('.following')) {
            $(this).removeClass('following')
            methods.moveElements($(this))
            $(this).addClass('following')
        } else if ($(this).is('.dragging')) {} else methods.moveElements($(this))

        $('.being-dragged').css('opacity', '1')
        $('.clone').remove();
        return false;

    },
    click: function () {
        $(this).toggleClass("following")

        $(this).removeClass("dragging being-dragged");
    },
    moveElements: function (me) {
        if (me.isAfter('.dragging')) me.after($('.dragging,.following'))
        else me.before($('.dragging,.following'))
    }
}
})(jQuery);