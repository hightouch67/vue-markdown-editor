import markdownItHljs from '@/utils/markdown-it-hljs';
import markdownItLink from '@/utils/markdown-it-link';
import markdownItAttr from 'markdown-it-attrs';
import markdownItLineNumber from '@/utils/markdown-it-line-number';
import markdownItHeadingTag from '@/utils/markdown-it-heading-tag';
import { kebabCase } from '@/utils/util';

// style
import '@/assets/css/github-markdown';

const { mdIt, hljs } = markdownItHljs({
  codeBlockClass: (lang) => `v-md-hljs-${lang}`,
});

mdIt
  .use(markdownItLink, {
    externalAttrs: {
      target: '_blank',
    },
  })
  .use(markdownItAttr, {
    allowedAttributes: ['width', 'height'],
  })
  .use(markdownItHeadingTag, {
    getMarks(content) {
      return [
        {
          attr: 'data-v-md-heading',
          value: kebabCase(content),
        },
      ];
    },
  })
  .use(markdownItLineNumber);

export default {
  previewClass: 'github-markdown-body',
  configure(callback) {
    callback(mdIt, hljs);
  },
  markdownParser: mdIt,
};
