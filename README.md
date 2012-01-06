# jQuery.multipleDraggables

This is a jQuery plugin that works on top of jQueryUI to offer multiple draggable elements. So it basically allows the user to drag multiple objects at the same. This plugin uses CSS3 for the animations, but default functionality will still work in older browsers.

## Dependencies

* jQuery
* jQueryUI

## Contact

Twitter: @elleestcrimi

Email  : iistcrimi@gmail.com

## Usage

1) You must include this in the head part of your html page. Where “.draggable” is the class given to all the elements that will be dragged together.

```
<script src="jquery.js"></script>
<script src="jqueryui.js"></script>
<script src="jquery.multipleDraggable.js"></script>
<script>
$(function(){
        $('.draggable').multipleDraggable();
});
</script>
</head>
```

2) You can extend the functionality by adding start, drag & stop functions just like in jQuery’s draggable.

```
$('.draggable').multipleDraggable({
        start: function(){ console.log('Starting Multiple Drag');},
        drag: function(){ console.log('dragging!');},
        stop: function(){ console.log('Stopped Multiple Drag');}
});
```

3) In the body part of your html page all you need to add is the following:

```
<body>
<div class="draggable" ></div>
<div class="draggable" ></div>
<div class="draggable" ></div>
<div class="draggable" ></div>
</body>
```

4) And thats it!

5) You can see the demo at [this link](http://labs.elleestcrimi.me/jquery-multipledraggable/)
