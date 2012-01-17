# jQuery.multipleDraggables

This is a jQuery plugin that works on top of jQueryUI to offer multiple draggable elements. So it basically allows the user to select multiple elements to drag at the same. This plugin uses CSS3 for the animations, but default functionality will still work in older browsers.

## Version

* 0.8 beta

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
        start: function(){ 
	        console.log('Starting Multiple Drag');
	    },
        drag: function(){ 
	        console.log('dragging!');
	    },
        stop: function(){ 
	        console.log('Stopped Multiple Drag');
	    }
});
```

3) You can enable the user to first select the item's to be dragged by setting the 'select' attribute to true. You can also specifiy a custom class for the selected item's to have to diffrentiate them from the none selected items using the 'highlight' attribute. Moreover you can extend the select functionality by adding a click function.

```
$('.draggable').multipleDraggable({
	select: true,
	highlight: 'highlighted',
	click: function(){ 
		console.log('Selected element to drag');
	}
});
```

4) Also if you don't like the way the placeholder looks, you can customize it by setting a custom class to the 'placeholder' attribute.

```
$('.draggable').multipleDraggable({
	placeholder: 'placeholder'
});
```

5) In the body part of your html page all you need to add is the following:

```
<body>
	<div class="draggable"></div>
	<div class="draggable"></div>
	<div class="draggable"></div>
	<div class="draggable"></div>
	<div class="draggable"></div>
	<div class="draggable"></div>
</body>
```

5) And thats it!

6) You can see the demo at [this link](http://labs.elleestcrimi.me/jquery-multipledraggable/)
