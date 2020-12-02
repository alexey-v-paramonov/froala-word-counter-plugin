# froala-word-counter-plugin
This Froala wysiwyg editor plugin counts words

Usage:

Add plugin js code to your page and

```
.froalaEditor({
   wordCounter: true,
   wordCounterLabel: "words",
   wordCounterBbCode: false,
   wordCounterTimeout: 0,
});      
```

## Options
- wordCounter - Enable the word-counter
- wordCounterLabel - Allow translation of the label used
- wordCounterBbCode - Enable bb-code compatible stripping mode
- wordCounterTimeout - Time in milliseconds to delay updating the word-counter to reduce reflow events