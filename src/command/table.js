export const name = 'table';

export default function (editor) {
  editor.insert(() => {
    const content = '|column1|column2|column3|\n|-|-|-|\n|content1|content2|content3|';

    return {
      text: content,
      selected: 'column1',
    };
  });
}
