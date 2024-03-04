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
  images: {
    unoptimized: true
  },
  i18n: {
    // locales: ['en', 'zh'],
    locales: ['en'],
    defaultLocale: 'en'
  },
  redirects: () => [
    // Language→Guides pages are moved under Book section
    {
      source: '/language/guides/:page*',
      destination: '/book/:page*',
      permanent: true,
    },
    {
      source: '/book/guides', // <- base link used in docs
      destination: '/book/guides/getting-started',
      permanent: true,
    },
    {
      source: '/book/cs', // <- base link used in docs
      destination: '/book/cs/from-func',
      permanent: true,
    },

    // Getting Started is now a part of Book→Guides sub-section
    {
      source: '/start',
      destination: '/book/guides/getting-started',
      permanent: true,
    },
    {
      source: '/start/:slug(first|deploy|test)',
      destination: '/book/guides/getting-started/:slug',
      permanent: true,
    },

    // Language→Guides→Grammar is now under Language section as a Specification page
    {
      source: '/book/grammar',
      destination: '/language/spec',
      permanent: true,
    },

    // Evolution section is moved under Language section
    {
      source: '/evolution',
      destination: '/language/evolution/overview',
      permanent: true,
    },
    {
      source: '/language/evolution', // <- base link used in docs
      destination: '/language/evolution/overview',
      permanent: true,
    },
    {
      source: '/evolution/:page*',
      destination: '/language/evolution/:page*',
      permanent: true,
    },

    // Language→Changelog is merged with the Evolution page
    {
      source: '/book/changelog',
      destination: '/language/evolution/overview',
      permanent: true,
    },

    // Additional conveniences for Language section
    {
      source: '/language/ref', // <- base link used in docs
      destination: '/language/ref/common',
      permanent: true,
    },
    {
      source: '/language/libs', // <- base link used in docs
      destination: '/language/libs/overview',
      permanent: true,
    },

    // Tools are now part of a new Ecosystem section
    {
      source: '/tools/:page*',
      destination: '/ecosystem/tools/:page*',
      permanent: true,
    },
    {
      source: '/ecosystem/tools', // <- base link used in docs
      destination: '/ecosystem/tools/typescript',
      permanent: true,
    },

    // Small updates in naming of pages or sub-sections
    {
      source: '/book/message-modes',
      destination: '/book/message-mode',
      permanent: true,
    },
    {
      source: '/ecosystem/tools/vs',
      destination: '/ecosystem/tools/vscode',
      permanent: true,
    },
  ],
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