/*
    (c) 2010 by jQTouch project members.
*/

(function($) {
    var $body,
        $head=$('head'),
        config={
            hoverDelay: 10,
            moveThreshold: 10,
            pressDelay: 1000,
            useFastTouch: true, // experimental
        },
        orientation='portrait',
        lastTime=0,
        lastAnimationTime=0,
        publicObj={},
        tapBuffer=351;
        
    function clickHandler(e) {
    	
        if (!$.tapReady()) {
            e.preventDefault();
            return false;
        }
        
        var $el = $(e.target);
        
        if ($el && $el.attr('href') && !$el.isExternalLink()) {
            e.preventDefault();
        } 
        
        if (!$.support.touch) {
        	$el.makeActive();
            $(e.target).trigger('tap', e);
            setTimeout($el.unselect, 250);
        }
    }
   
    function getOrientation() {
        return orientation;
    }
    function orientationChangeHandler() {
        orientation = Math.abs(window.orientation) == 90 ? 'landscape' : 'portrait';
        $('body').removeClass('portrait landscape').addClass(orientation).trigger('turn', {orientation: orientation});
    }
   
    function supportForAnimationEvents() {
        return ( typeof WebKitAnimationEvent != 'undefined') ||
			( typeof AnimationEvent != 'undefined');
    }
    function supportForTouchEvents() {
        if (typeof TouchEvent != 'undefined') {
            if (window.navigator.userAgent.indexOf('Mobile') > -1) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    
    function touchStartHandler(e) {
        
        if (!$.tapReady()) {
            e.preventDefault();
            return false;
        }

        var $el = $(e.target);
        
        if (!$el.length) {
            return;
        }

        var startTime = (new Date).getTime(),
            hoverTimeout = null,
            pressTimeout = null,
            touch,
            startX,
            startY,
            deltaX = 0,
            deltaY = 0,
            deltaT = 0;

        if (event.changedTouches && event.changedTouches.length) {
            touch = event.changedTouches[0];
            startX = touch.pageX;
            startY = touch.pageY;
        }
        
        $el.bind('touchmove',touchMoveHandler).bind('touchend',touchEndHandler).bind('touchcancel',touchCancelHandler);

        hoverTimeout = setTimeout(function() {
            $el.makeActive();
        }, config.hoverDelay);

        pressTimeout = setTimeout(function() {
            $el.unbind('touchmove',touchMoveHandler).unbind('touchend',touchEndHandler).unbind('touchcancel',touchCancelHandler);
            $el.unselect();
            clearTimeout(hoverTimeout);
            $el.trigger('press');
        }, config.pressDelay);
        
        function touchCancelHandler(e) {
            clearTimeout(hoverTimeout);
            $el.unselect();
            $el.unbind('touchmove',touchMoveHandler).unbind('touchend',touchEndHandler).unbind('touchcancel',touchCancelHandler);
        }

        function touchEndHandler(e) {
            $el.unbind('touchend',touchEndHandler).unbind('touchcancel',touchCancelHandler);
            clearTimeout(hoverTimeout);
            clearTimeout(pressTimeout);
            if (Math.abs(deltaX) < config.moveThreshold && Math.abs(deltaY) < config.moveThreshold && deltaT < config.pressDelay) {
                $el.trigger('tap', e);
                setTimeout($el.unselect, 250);
            } else {
                $el.unselect();
            }
        }

        function touchMoveHandler(e) {
            updateChanges();
            var absX = Math.abs(deltaX);
            var absY = Math.abs(deltaY);
            var direction;
            if (absX > absY && (absX > 35) && deltaT < 1000) {
                if (deltaX < 0) {
                    direction = 'left';
                } else {
                    direction = 'right';
                }
                $el.unbind('touchmove',touchMoveHandler).unbind('touchend',touchEndHandler).unbind('touchcancel',touchCancelHandler);
                $el.trigger('swipe', {direction:direction, deltaX:deltaX, deltaY: deltaY});
            }
            $el.unselect();
            clearTimeout(hoverTimeout);
            if (absX > config.moveThreshold || absY > config.moveThreshold) {
                clearTimeout(pressTimeout);
            }
        }

        function updateChanges() {
            var firstFinger = event.changedTouches[0] || null;
            deltaX = firstFinger.pageX - startX;
            deltaY = firstFinger.pageY - startY;
            deltaT = (new Date).getTime() - startTime;
        }

    }
    
    $(document).ready(function() {
    	
    	if(!$.support) $.support = {};
    	
        $.support.animationEvents = supportForAnimationEvents();
        $.support.touch = supportForTouchEvents() && config.useFastTouch;
        
        $.fn.isExternalLink = function() {
            var $el = $(this);
            return ($el.attr('target') == '_blank' || $el.attr('rel') == 'external' || $el.is('a[href^="http://maps.google.com"], a[href^="mailto:"], a[href^="tel:"], a[href^="javascript:"], a[href*="youtube.com/v"], a[href*="youtube.com/watch"]'));
        }
        $.fn.makeActive = function() {
            return $(this).addClass('active');
        }
        $.fn.press = function(fn) {
            if ($.isFunction(fn)) {
                return $(this).live('press', fn);
            } else {
                return $(this).trigger('press');
            }
        }
        $.fn.swipe = function(fn) {
            if ($.isFunction(fn)) {
                return $(this).live('swipe', fn);
            } else {
                return $(this).trigger('swipe');
            }
        }
        $.fn.tap = function(fn) {
            if ($.isFunction(fn)) {
                return $(this).bind('tap', fn);
            } else {
                return $(this).trigger('tap');
            }
        }
        $.fn.unselect = function(obj) {
            if (obj) {
                obj.removeClass('active');
            } else {
                $('.active').removeClass('active');
            }
        }
        
        $('body').unbind('touchstart').bind('touchstart', touchStartHandler)
            .unbind('click').bind('click', clickHandler)
            .unbind('orientationchange').bind('orientationchange', orientationChangeHandler)
            .trigger('orientationchange');
    });

})(Zepto);