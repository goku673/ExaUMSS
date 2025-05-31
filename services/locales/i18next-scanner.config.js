module.exports = {
    input: [
        'app/**/*.{js,ts,jsx,tsx}',
        'components/ui/**/*.{js,ts,jsx,tsx}',
        'components/adminProfile/**/*.{js,ts,jsx,tsx}',
        'components/edithProfile/**/*.{js,ts,jsx,tsx}',
        'components/HomeScreen/**/*.{js,ts,jsx,tsx}',
        'components/Setting/**/*.{js,ts,jsx,tsx}',
      ],
      
    output: './',
    options: {
      debug: false,
      removeUnusedKeys: true,
      sort: true,
      func: {
        list: ['i18next.t', 'i18n.t', 't'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      trans: {
        component: 'Trans',
        i18nKey: 'i18nKey',
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      lngs: ['es', 'en'],
      ns: ['translation'],
      defaultLng: 'es',
      defaultNs: 'translation',
      resource: {
        loadPath: 'locales/{{lng}}/{{ns}}.json',
        savePath: 'locales/{{lng}}/{{ns}}.json',
        jsonIndent: 2,
        lineEnding: '\n'
      }
    }
  };
  