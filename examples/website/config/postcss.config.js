const inazuma = require('../../../index')
const inazumaOptions = [
  { min: 320, coeff: 1 },
  { min: 480, coeff: 1.5 },
  { min: 1024, coeff: 1 },
  { min: 1366, coeff: 1 }
];

const mediaVariables = require('postcss-media-variables')

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    // inazuma(inazumaOptions),
    mediaVariables(),
    require('postcss-css-variables'),
    require('postcss-calc'),
    mediaVariables(),
    require('postcss-cssnext')({
      features: {
        rem: false, // it will not add fallback from rem to px
      },
    }),
  ]
};
