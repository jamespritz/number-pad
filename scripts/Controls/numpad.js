
(function ($) {

    $(document).ready(function () {

        $.extend(true, window, { jp: { numpad: new numpad() } });

        var KEY_ESC = 27, KEY_RTRN = 13, KEY_BKSPC = 8, KEY_DEL = 46;


        function numpad() {

            $.extend(this, {
                'show': _show
                , 'hide': _hide
            });


            //log util
            function Log(message) {
                try {
                    if (options.debug) {
                        console.log(message);
                    }
                } catch (e) {
                    //do nothing
                }
            }

            var template = Handlebars.templates['numpad']({});

            var visible = false;
            var $_content;
            var $_numpad;
            var $_this;
            var cb;
            var options;


            function _init() {

                $_numpad = $(template);
                $_numpad.appendTo('body');
                $_content = $_numpad.find('.content');


                $_numpad.on('touchstart click', '.key', handleNumPadTouchOrClick)
                    .click(function (e) { e.stopPropagation(); });



                $('html').bind('touchstart click', _hide)
                    .keyup(function (e) {

                        if (visible) {
                            switch (event.keyCode) {

                                case KEY_ESC:
                                    Edit('OK');
                                    cancelEvent(event);
                                    break;
                                case KEY_RTRN:
                                    Edit('OK');
                                    cancelEvent(event);
                                    break;
                                case KEY_BKSPC:
                                    return false;
                                    break;
                                case KEY_DEL:
                                    return false;
                                    break;
                                default:
                                    if ((event.keyCode >= 48) || (event.keyCode <= 57)) {
                                        Edit(String.fromCharCode(event.keyCode));
                                        cancelEvent(event);
                                        break;
                                    }
                            }
                        }
                    }).keydown(function (e) {

                        if (visible) {
                            switch (event.keyCode) {

                                case KEY_ESC:
                                    Edit('OK');
                                    cancelEvent(event);
                                    break;
                                case KEY_RTRN:
                                    Edit('OK');
                                    cancelEvent(event);
                                    break;
                                case KEY_BKSPC:
                                    Edit('Del');
                                    return false;
                                    break;
                                case KEY_DEL:
                                    Edit('Del');
                                    return false;
                                    break;

                                default:


                            }
                        }
                    });

            }

            function _hide(e) {

                ClickOrTouch(e, function (e) {
                    $_numpad.hide('fast'); visible = false;

                });


            }

            function _show(settings) {

                options = $.extend({
                    debug: false
                    , callBack: function (e) { alert("Callback Required"); }
                    , includeDecimal: false
                    , maxLength: 4
                    , x: 0
                    , y: 0
                }, settings);

                Log('{0} {1}'.format($(window).width(), $(window).height()));

                if (options.x == 0) {
                    options.x = ($(window).width() - $_numpad.width()) / 2;
                }
                if (options.y == 0) {
                    options.y = (($(window).height() - $_numpad.height()) / 2) + $('body').scrollTop();
                }

                $_numpad.css("left", options.x).css("top", options.y).show('fast');
                $_content.text('0');
                cb = options.callBack;
                visible = true;

                cancelEvent(event);

            }


            function handleNumPadTouchOrClick(e) {


                ClickOrTouch(e, function (e) {
                    console.log($(e.target).text());
                    var key = $(e.target).text();
                    Edit(key);
                    cancelEvent(e);
                });



            }

            function Edit(key) {
                var txt = $_content.text().trim();
                switch (key) {
                    case 'Del':

                        if (txt.length == 1)
                            $_content.text('0');
                        else if ((txt != '0') && (txt.length > 0))
                            $_content.text(txt.substr(0, txt.length - 1));

                        break;
                    case 'C':
                        $_content.text('0');
                        break;
                    case 'OK':

                        cb(txt);
                        $_numpad.hide('fast');
                        break;

                    default:
                        if ((key != '0') || (txt.length > 0)) {
                            if (txt == '0') txt = '';
                            if ((txt + key).length <= options.maxLength) {
                                $_content.text(txt + key);
                            }
                        }
                        break;
                }
            }

            _init();
        }
    });


})(jQuery);