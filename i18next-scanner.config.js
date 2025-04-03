const fs = require('fs');
const path = require('path');

module.exports = {
  input: [
    'src/**/*.{js,jsx,ts,tsx}',
    // Ignorer les tests
    '!src/**/*.test.{js,jsx,ts,tsx}',
    // Ignorer les fichiers de configuration
    '!**/node_modules/**',
    '!**/dist/**',
    '!i18next-scanner.config.js',
  ],
  output: './src/locales/',
  options: {
    debug: true,
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      fallbackKey: function(ns, value) {
        return value;
      },
    },
    lngs: ['fr', 'en'],
    ns: [
      'translation',
      'dashboard',
      'index',
      'tenue'
    ],
    defaultLng: 'fr',
    defaultNs: 'translation',
    defaultValue: (lng, ns, key) => {
      if (lng === 'fr') {
        // Pour le français, utiliser la clé comme valeur par défaut
        return key;
      }
      // Pour les autres langues, marquer comme "À TRADUIRE"
      return `[À TRADUIRE] ${key}`;
    },
    resource: {
      loadPath: './src/locales/{{lng}}/{{ns}}.json',
      savePath: './{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n'
    },
    nsSeparator: ':',
    keySeparator: '.',
    interpolation: {
      prefix: '{{',
      suffix: '}}'
    },
    metadata: {},
    allowDynamicKeys: true
  },
  transform: function customTransform(file, enc, done) {
    "use strict";
    
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    
    // Analyser les appels à t() et Trans
    parser.parseFuncFromString(content, { list: ['t', 'i18next.t', 'i18n.t'] }, (key, options) => {
      parser.set(key, Object.assign({}, options));
    });
    
    // Analyser les appels à composant <T k="..." />
    const tComponentRegex = /<T\s+k=["']([^"']+)["']/g;
    let match;
    
    while ((match = tComponentRegex.exec(content)) !== null) {
      const key = match[1];
      parser.set(key);
    }
    
    // Continuer
    done();
  }
};
