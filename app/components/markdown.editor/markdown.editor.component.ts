// Adapted from: 
// https://raw.githubusercontent.com/hardbyte/angular2-bt-components/master/app/components/markdown/aceEditor.ts

import {ElementRef, Directive, EventEmitter} from 'angular2/core';

declare var ace:any;

// Note the aceEditor doesn't have a template so is a Directive
@Directive({
    selector: '[markdown-editor]',
    inputs: [
        'source'
    ],
    outputs: ['contentChange: change']
})
export class MarkdownEditor {
    // http://ace.c9.io/#nav=api&api=editor
    public editor;

    /** When the markdown content changes we broadcast the entire document. */
    contentChange: EventEmitter<any> = new EventEmitter();

    constructor(elementRef: ElementRef) {
        // Note the constructor doesn't have access to any data from properties
        // We can instead use a setter

        // This is the <div ace-editor> root element
        // Ideally this wouldn't be required
        var el = elementRef.nativeElement;

        this.editor = ace.edit(el);
        //this.editor.setTheme("ace/theme/monokai");
        this.editor.getSession().setMode("ace/mode/markdown");
        this.editor.getSession().setUseWrapMode(true);
        this.editor.setOption("showPrintMargin", false)

        this.editor.$blockScrolling = Infinity;

        this.editor.on("change", (e) => {
            // Discard the delta (e), and provide whole document
            this.contentChange.next(this.editor.getValue());
        });

    }

   set source(text) {
      this.editor.setValue(text || "");
      this.editor.clearSelection();
      //this.editor.focus();
    }


}