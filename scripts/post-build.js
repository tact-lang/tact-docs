// import fs from 'fs';
// import path from 'path';
import { overrideRootWithTargetConfig } from './pre-build.js';

/* ---------------- */
/* ---- Script ---- */
/* ---------------- */

// 1. Place correct configuration for the local i18n setup

const configs = [
  {
    root: 'next.config.js',
    target: 'i18n-next.config.js'
  },
  {
    root: 'theme.config.jsx',
    target: 'i18n-theme.config.jsx'
  },
];

overrideRootWithTargetConfig(configs);

// 2. TBD
