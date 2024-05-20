import { getHighlighter, BUNDLED_LANGUAGES } from 'shiki';
import nextra from 'nextra';
import fs from 'fs';

const grammar_tact = JSON.parse(fs.readFileSync('./grammars/grammar-tact.json', 'utf-8'));
const grammar_func = JSON.parse(fs.readFileSync('./grammars/grammar-func.json', 'utf-8'));
const grammar_ohm = JSON.parse(fs.readFileSync('./grammars/grammar-ohm.json', 'utf-8'));

const rehypePrettyCodeOptions = {
  getHighlighter: options => {
    return getHighlighter({
      ...options,
      langs: [
        ...BUNDLED_LANGUAGES,
        {
          id: 'tact',
          scopeName: 'source.tact',
          grammar: grammar_tact,
          aliases: ['tact'],
        },
        {
          id: 'func',
          scopeName: 'source.func',
          grammar: grammar_func,
          aliases: ['func'],
        },
        {
          id: 'ohm',
          scopeName: 'source.ohm',
          grammar: grammar_ohm,
          aliases: ['ohm'],
        },
      ],
    });
  },
};

/**
 * @type {import('next').NextConfig}
 */
const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  mdxOptions: {
    rehypePrettyCodeOptions
  },
  latex: true,
  defaultShowCopyCode: true
});

/**
 * @type {import('next').NextConfig}
 */
export default withNextra({
  output: 'export',
  images: {
    unoptimized: true
  },
  webpack(config) {
    const allowedSvgRegex = /components\/icons\/.+\.svg$/

    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg')
    )
    fileLoaderRule.exclude = allowedSvgRegex

    config.module.rules.push({
      test: allowedSvgRegex,
      use: ['@svgr/webpack']
    })
    return config
  },
});
