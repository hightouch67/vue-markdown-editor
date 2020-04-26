const ol = /^\s*([\d]+\.)( \[[ xX]])? /;
const ul = /^\s*([-*])( \[[ xX]])? /;

const ulSyntax = /([*-] |[\d]+\. )/;
const olSyntax = /([\d])+\.( \[[ xX]])? /;

export default {
  mounted() {
    this.registerHotkeys({
      key: 'enter',
      action: () => {
        const cursorLineLeftText = this.getCursorLineLeftText();
        let suffix;
        let syntax;

        if (ol.test(cursorLineLeftText)) {
          suffix = 'x. ';
          syntax = olSyntax;
        } else if (ul.test(cursorLineLeftText)) {
          suffix = '- ';
          syntax = ulSyntax;
        } else {
          this.replaceSelectionText('\n', 'end');
          return;
        }

        const indent = cursorLineLeftText.search(syntax);
        const suffixIndex = indent + suffix.length;
        let beforeText = cursorLineLeftText.slice(0, suffixIndex);
        const content = cursorLineLeftText.slice(suffixIndex, cursorLineLeftText.length);

        if (content) {
          if (suffix === 'x. ') {
            beforeText = beforeText.replace(/(\d+)/, window.parseInt(beforeText) + 1);
          }

          this.replaceSelectionText(`\n${beforeText}`, 'end');
        } else {
          // break
          this.delLineLeft();
          this.replaceSelectionText('\n', 'end');
        }
      },
    });
  },
};
