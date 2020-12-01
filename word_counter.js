/*!
 * froala_editor v2.8.5 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2018 Froala Labs
 */

(function ($) {
    $.extend($.FE.DEFAULTS, {
        wordCounter: false,
    });

    $.FE.PLUGINS.charCounter = function(editor) {
        var counter;

        function countWords() {
            var text = editor.el.innerText || "";
            text = text.replace(/\s+/gi, " ");
            text = text.trim();
            return text.length ? text.split(' ').length : 0;
        }

        function updateCounter() {
            if (editor.opts.wordCounter) {
                var text = countWords() + " " + (editor.opts.wordCounterLabel || "words");
                counter.text(text);
                editor.opts.toolbarBottom && counter.css("margin-bottom", editor.$tb.outerHeight(!0));
                var t = editor.$wp.get(0).offsetWidth - editor.$wp.get(0).clientWidth;
                0 <= t && ("rtl" === editor.opts.direction ? counter.css("margin-left", t) : counter.css("margin-right", t))
            }
        }
        return {
            _init: function() {
                if(!!editor.opts.wordCounter && !!editor.$wp){
                    counter = $('<span class="fr-counter"></span>').css("bottom", editor.$wp.css("border-bottom-width"));

                    $(editor.$box).after(counter);
                    editor.events.on("paste.afterCleanup", updateCounter);
                    editor.events.on("keyup contentChanged input", function() {
                        editor.events.trigger("charCounter.update")
                    });
                    editor.events.on("charCounter.update", updateCounter);
                    editor.events.on("html.set", updateCounter);
                    editor.events.trigger("charCounter.update");
                    void editor.events.on("destroy", function() {
                        $(editor.o_win).off("resize.char" + editor.id);
                        counter.removeData().remove();
                        counter = null
                    });
                }
            },
            count: countWords
        }
    }
})(jQuery);
