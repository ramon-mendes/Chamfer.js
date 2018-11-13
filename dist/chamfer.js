function ChamferEnvelop(el, opt)
{
	//console.log(el.tagName.toLowerCase()=="img");

	opt = opt || {};
	opt.tl = opt.tl === undefined ? true : opt.tl;
	opt.tr = opt.tr === undefined ? true : opt.tr;
	opt.bl = opt.bl === undefined ? true : opt.bl;
	opt.br = opt.br === undefined ? true : opt.br;

	var COLOR = opt.cc || 'white';
	var SIZE = opt.size !== undefined ? opt.size : 10;
	var SW = opt.sw!==undefined ? opt.sw : 1;
	if(SW)
		SIZE += Math.ceil(SW/2);
	
	function EnvelopInternal()
	{
		var rc = el.getBoundingClientRect();
		rc.width = Math.ceil(rc.width);
		rc.height = Math.ceil(rc.height);
		
		// wrap the element with a div
		var el_wraper = document.createElement('div');
		el.parentNode.insertBefore(el_wraper, el);
		el_wraper.appendChild(el);
		el_wraper.style.position = "relative";
		el_wraper.style.width = rc.width + "px";
		el_wraper.style.height = rc.height + "px";
		
		function CreateCorner(bt, br, bb, bl)
		{
			var el_corner;
			el_corner = document.createElement("div")
			el_corner.style.position = "absolute";
			el_corner.style.width = 0;
			el_corner.style.height = 0;
			if(bt!==undefined)
			{
				el_corner.style.borderTop = "solid " + SIZE + "px " + (bt ? COLOR : "transparent");
				el_corner.style.top = 0;
			}
			if(br!==undefined)
			{
				el_corner.style.borderRight = "solid " + SIZE + "px " + (br ? COLOR : "transparent");
				el_corner.style.left = 0;
			}
			if(bb!==undefined)
			{
				el_corner.style.borderBottom = "solid " + SIZE + "px " + (bb ? COLOR : "transparent");
				el_corner.style.bottom = 0;
			}
			if(bl!==undefined)
			{
				el_corner.style.borderLeft = "solid " + SIZE + "px " + (bl ? COLOR : "transparent");
				el_corner.style.right = 0;
			}
	
			el_wraper.appendChild(el_corner);
		}
	
		if(opt.tl)
			CreateCorner(true, false, undefined, undefined);
		if(opt.tr)
			CreateCorner(true, undefined, undefined, false);
		if(opt.br)
			CreateCorner(undefined, undefined, true, false);
		if(opt.bl)
			CreateCorner(undefined, false, true, undefined);
	
		if(opt.sw!==0)
		{
			var el_bg = document.createElement('div');
			el_bg.style.position = "absolute";
			el_bg.style.zIndex = "1";
			el_bg.style.width = rc.width + "px";
			el_bg.style.height = rc.height + "px";
			el_bg.style.pointerEvents = "none";
			el_wraper.insertBefore(el_bg, el_wraper.firstChild);
	
			//opt.size = SIZE-1;
	
			ChamferBg(el_bg, opt);
		}
	}

	if(el.tagName.toLowerCase()=="img" && (el.complete && el.naturalHeight !== 0)==false)
		// image not loaded
		el.onload = EnvelopInternal;
	else
		EnvelopInternal();
}

function ChamferBg(el, opt)
{
	opt = opt || {};
	opt.tl = opt.tl===undefined ? true : opt.tl;
	opt.tr = opt.tr===undefined ? true : opt.tr;
	opt.bl = opt.bl===undefined ? true : opt.bl;
	opt.br = opt.br===undefined ? true : opt.br;

	const SIZE = opt.size!==undefined ? opt.size : 10;
	const SW = opt.sw!==undefined ? opt.sw : 1;
	const SC = opt.sc || 'black';
	const FC = opt.fc;
	const FP = opt.fp;

	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");

	function SetBg() {
		var rc = el.getBoundingClientRect();
		rc.width = Math.floor(rc.width);
		rc.height = Math.floor(rc.height);
		const W = rc.width-SW;
		const H = rc.height-SW;

		ctx.canvas.width = rc.width;
		ctx.canvas.height = rc.height;
		ctx.beginPath();
		ctx.translate(SW/2, SW/2);
		if(opt.tl)
		{
			ctx.moveTo(0, SIZE);
			ctx.lineTo(SIZE, 0);
		} else {
			ctx.moveTo(0, 0);
		}
		if(opt.tr)
		{
			ctx.lineTo(W-SIZE, 0);
			ctx.lineTo(W, SIZE);
		} else {
			ctx.lineTo(W, 0);
		}
		if(opt.br)
		{
			ctx.lineTo(W, H-SIZE);
			ctx.lineTo(W-SIZE, H);
		} else {
			ctx.lineTo(W, H);
		}
		if(opt.bl)
		{
			ctx.lineTo(SIZE, H);
			ctx.lineTo(0, H-SIZE);
		} else {
			ctx.lineTo(0, H);
		}
		ctx.closePath();
	
		if(SW)
		{
			ctx.lineWidth = SW;
			ctx.strokeStyle = SC;
			ctx.stroke();
		}
		if(FP)
		{
			var img = new Image();
			img.src = FP;
			img.onload = function() {
				var pattern = ctx.createPattern(img, 'repeat');
				ctx.fillStyle = pattern;
				ctx.fill();
				
				var imgUrl = canvas.toDataURL();
				el.style.background = 'url(' + imgUrl + ') no-repeat';
			};
		}
		else
		{
			if(FC)
			{
				ctx.fillStyle = FC;
				ctx.fill();
			}

			var imgUrl = canvas.toDataURL();
			el.style.background = 'url(' + imgUrl + ') no-repeat';
		}
	}

	if(opt.resize_observe)
	{
		new ResizeObserver(function(entries) {
			SetBg();
		}).observe(el);
	}
	
	SetBg();
}