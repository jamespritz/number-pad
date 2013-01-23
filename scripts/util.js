/*
Author: Dave Gardyasz -- http://lot224.net
Helper Function: ensures an event is properly terminated.
*/
function cancelEvent(e) {
    e = !e ? window.event : e;

    if (e.stopPropagation)
        e.stopPropagation();
    if (e.preventDefault)
        e.preventDefault();
    e.cancelBubble = true;
    e.cancel = true;
    e.returnValue = false;
    return false;
}



function ClickOrTouch(evt, handler) {

    var $el = $(evt.target);
    var touched = false;
    touched = $el.data('touched');

    if (evt.type == 'touchstart') {
        //set touched attr to avoid click event
        $el.data('touched', true);
        //relay to handler
        handler(evt);
    } else if (evt.type == 'click') {
        if (touched) {
            //don't execute event, since caller already handled touch
            $el.data('touched', false);
            return false;
        } else {
            //relay event
            handler(evt);
        }
    }

}

function isFunction(check) {
    var getClass = {};
    return check && getClass.toString.call(check) == '[object Function]';
}

/*
Author: Dave Gardyasz -- http://lot224.net
Helper Functions: String format methods
*/
if (!String.prototype.format) {
    String.prototype.format = function () {
        var n = this;
        for (var i = 0; i < arguments.length; i++) {
            var e = new RegExp('\\{' + (i) + '\\}', 'gm');
            n = n.replace(e, arguments[i]);
        }
        return n;
    }
}

if (!String.format) {
    String.format = function () {
        for (var i = 1; i < arguments.length; i++) {
            var e = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            arguments[0] = arguments[0].replace(e, arguments[i]);
        }
        return arguments[0];
    }
}


function WindowToCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
        x: (x - bbox.left) * (canvas.width / bbox.width),
        y: (y - bbox.top) * (canvas.height / bbox.height)
    };
}


function CanvasToWindow(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
        x: (x * (bbox.width / canvas.width)) + bbox.left,
        y: (y * (bbox.height / canvas.height)) + bbox.top
    };
}

function PagePos(e) {

    var posx = 0;
    var posy = 0;
    if (!e) var e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    }
    else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return { x: posx, y: posy };

}

/*
Author: James Pritz -- http://www.jamespritz.com
Helper Function: conversion between em and px for exact measurement
*/
$.fn.toEm = function (settings) {
    settings = jQuery.extend({
        scope: 'body'
    }, settings);
    var that = parseInt(this[0], 10),
        scopeTest = jQuery('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;">&nbsp;</div>').appendTo(settings.scope),
        scopeVal = scopeTest.height();
    scopeTest.remove();
    return (that / scopeVal).toFixed(8);
};

$.fn.toPx = function (settings) {
    settings = jQuery.extend({
        scope: 'body'
    }, settings);
    var that = parseFloat(this[0]),
        scopeTest = jQuery('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;">&nbsp;</div>').appendTo(settings.scope),
        scopeVal = scopeTest.height();
    scopeTest.remove();
    return Math.round(that * scopeVal);
};