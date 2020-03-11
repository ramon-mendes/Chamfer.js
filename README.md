![](https://github.com/ramon-mendes/Chamfer.js/raw/master/img/chamferjs.png)

Make any HTML element to have **chamfered borders/stroke** and, optionally, a solid fill.

[DEMO](http://chamferjs.azurewebsites.net/)

---

![](https://github.com/ramon-mendes/Chamfer.js/raw/master/img/demo.png)

# Usage

Include chamfer.js, and optionally include ResizeObserver.js

```
<script src="dist/chamfer.js"></script>
<script src="dist/ResizeObserver.js"></script>
```

Then choose the method to create the chamfer:

**Method 1:** `ChamferBg(el, options)` - it creates a chamfered background using Canvas API and set it as the CSS background-image of the element.

**Method 2:** `ChamferEnvelop(el, options)` - it appends 4 CSS based triangle DOM elements around the target, making the chamfer overlay.

Call `ChamferBg/ChamferEnvelop(el:Element, [options:Object])` for each element to chamfer:

```JS
var el = document.getElementById('box');
ChamferBg(el, {
	size: 20,
	sw: 6,
	sc: '#447aec',
	fc: '#21ceff',
	tl: false,
	br: false,
	resize_observe: true
});
```


The following options and their default values are available:

```JS
{
	size: 5,	// chamfer size
	sw: 1,		// stroke width
	sc: 'black',	// stroke color,
	fc: undefined,	// fill color
	fp: undefined,	// URL of an image to use as fill pattern

	tl: true,	// chamfer top-left corner?
	tr: true,	// chamfer top-right corner?
	bl: true,	// chamfer bottom-left corner?
	br: true,	// chamfer bottom-right corner?

	resize_observe: false
	// turn on resize_observe observer?
	// this will observe whenever the element
	// resizes and will refresh the background
}
```

You will need to set `resize_observe` to true and include `ResizeObserver.js` if you use **method 1** and your element may change its size at runtime, because then it will need to recreate the chamfered background.

# Real-life usage samples

- https://atcommandercore.azurewebsites.net
- Your site here! If you are using Chamfer.js in your site, I would be glad to put it in this list. To do it just create an new issue with the URL.

# TODO

- Allow to choose the angle of the chamfer
- Allow to set individual stroke color for each border
- Allow to set the fill as a gradients
- Allow to set stroke style (ex.: dashed)
