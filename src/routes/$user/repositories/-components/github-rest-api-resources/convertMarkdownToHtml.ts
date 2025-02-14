import hljs from "highlight.js";
import showdown from "showdown";

export function convertMarkdownToHtml(markdown: string): string {
  showdown.extension("highlight", () => {
    function htmlunencode(text: string): string {
      return text.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    }
    return [
      {
        type: "output",
        filter: (text: string, converter: any, options: any): string => {
          var left = "<pre><code\\b[^>]*>",
            right = "</code></pre>",
            flags = "g";
          var replacement = (
            wholeMatch: string,
            match: string,
            left: string,
            right: string
          ): string => {
            match = htmlunencode(match);
            var lang = (left.match(/class=\"([^ \"]+)/) || [])[1];
            left = left.slice(0, 18) + "hljs " + left.slice(18);
            if (lang && hljs.getLanguage(lang)) {
              return left + hljs.highlight(match, { language: lang }).value + right;
            } else {
              return left + hljs.highlightAuto(match).value + right;
            }
          };
          return showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags);
        },
      },
    ];
  });

  const converter = new showdown.Converter({
    ghCompatibleHeaderId: true,
    simpleLineBreaks: true,
    ghMentions: true,
    extensions: ["highlight"],
    tables: true,
  });

  const preContent = `
    <html>
      <head>
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="UTF-8">
         <link rel="stylesheet"node_modules/highlight.js/styles/atom-one-dark.css">
        <script defer  src="https://plausible.io/js/script.js"></script>
        <style>
          .note {border-left: 4px solid var(--note-color,#61aeee); padding: 5px; margin: 10px 0;}
          .note span{color: var(--note-color,#61aeee);}
          .tip {border-left: 4px solid var(--tip-color,#07f75f); padding: 5px; margin: 10px 0;}
          .tip span{color: var(--tip-color,#07f75f);}
          .warning {border-left: 4px solid var(--warning-color,#f4041c); padding: 5px; margin: 10px 0;}
          .warning span{color: var(--warning-color,#f4041c);}
          .important {border-left: 4px solid var(--important-color,#9808f9); padding: 5px; margin: 10px 0;}
          .important span{color: var(--important-color,#9808f9);}
          .caution {border-left: 4px solid var(---caution--color,#f9d90e); padding: 5px; margin: 10px 0;}
          .caution span{color: var(---caution--color,#f9d90e);}
        </style>
      </head>
      <body>
        <div id=''>
      `;

  const postContent = `
        </div>
      </body>
    </html>`;
  const generatedHtml = converter
    .makeHtml(markdown)
    .replace("<p>[!NOTE]", "<p class='note'><span> 📝 Note</span>")
    .replace("<p>[!TIP]", "<p class='tip'><span>💡 Tip </span>")
    .replace("<p>[!WARNING]", "<p class='warning'> <span> 🚨 Warning </span>")
    .replace("<p>[!IMPORTANT]", "<p class='important'><span> 🔥 Important </span>")
    .replace("<p>[!CAUTION]", "<p class='caution'> <span>⚠️ Caution </span>");


  const html: string = preContent + generatedHtml + postContent;

  return html;
}

// > [!NOTE]
// > Highlights information that users should take into account, even when skimming.

// > [!TIP]
// > Optional information to help a user be more successful.

// > [!IMPORTANT]
// > Crucial information necessary for users to succeed.

// > [!WARNING]
// > Critical content demanding immediate user attention due to potential risks.

// > [!CAUTION]
// > Negative potential consequences of an action.
