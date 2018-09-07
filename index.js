const postcss = require('postcss');

const defaultOptions = [
    { min: 320, coeff: 1 },
    { min: 480, coeff: 1.5 },
    { min: 768, coeff: 1 },
    { min: 1280, coeff: 0.94 },
    { min: 1366, coeff: 1 },
    { min: 1440, coeff: 1.05 },
    { min: 1600, coeff: 1.171 },
    { min: 1920, coeff: 1.4 }
];

const processDecls = (decl, option) => {
    if (!/\d+iz/.test(decl.value)) return;
    const splitted = decl.value.split(/(\d+iz)/);
    splitted.forEach((v, i) => {
        if (/(\d+iz)/.exec(v)) {
            const convertTo = option.convertTo || 'vw';
            let newValue;
            if (convertTo === 'vw') {
                const newValueInVw = parseInt(v, 10) / option.min *
                    100 *
                    option.coeff;
                newValue = `${newValueInVw}vw`;
            } else if (convertTo === 'px') {
                const newValueInPx = parseInt(v, 10) * option.coeff;
                newValue = `${newValueInPx}px`;
            }
            splitted[i] = newValue;
        }
    });
    const newValue = splitted.join('');
    decl.cloneBefore({ value: newValue });
    decl.remove();
};

const processOneMediaRule = (rule, param, opts) => {
    const newRule = rule.cloneBefore({ params: param });
    const regexp = /(min|max)-width: (\d+)px/;
    const selectedParams = regexp.exec(param);
    if (!selectedParams) return;
    const prop = selectedParams[1];
    const value = parseInt(selectedParams[2], 10);
    const option = opts.filter((o) => {
        return (Object.keys(o).indexOf(prop) !== -1) && (o[prop] === value);
    })[0];
    // if (!option) {
    //     console.warn(`No coefficient for ${prop}: ${value} are given`);
    // }
    newRule.walkDecls(decl => processDecls(decl, option));
};

const processAllMediaRules = (mediaRule, opts) => {
    mediaRule.params.split(/, ?/).forEach((mediaParam) => {
        return processOneMediaRule(mediaRule, mediaParam, opts);
    });
    mediaRule.remove();
};

module.exports = postcss.plugin('postcss-inazuma', (opts = defaultOptions) => {
    return (root) => {
        root.walkAtRules(rule => processAllMediaRules(rule, opts));
    };
});
