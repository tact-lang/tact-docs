const { getHighlighter, BUNDLED_LANGUAGES } = require('shiki');
const fs = require('fs');
const grammarTact = JSON.parse(fs.readFileSync(require.resolve('./grammar-tact.json'), 'utf-8'));
const grammarFunc = JSON.parse(fs.readFileSync(require.resolve('./grammar-func.json'), 'utf-8'));

const rehypePrettyCodeOptions = {
  getHighlighter: options => {
    return getHighlighter({
      ...options,
      langs: [
        ...BUNDLED_LANGUAGES,
        {
          id: 'tact',
          scopeName: 'source.tact',
          grammar: grammarTact,
          aliases: ['tact'],
        },
        {
          id: 'func',
          scopeName: 'source.func',
          grammar: grammarFunc,
          aliases: ['func'],
        },
      ],
    });
  },
};

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  mdxOptions: {
    rehypePrettyCodeOptions
  }
});

module.exports = withNextra({
  images: {
    unoptimized: true
  }
});