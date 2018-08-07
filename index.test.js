const postcss = require('postcss');
const plugin = require('./');

const run = (input, output, opts) => {
    return postcss([plugin(opts)]).process(input)
        .then((result) => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
};

it('does something', () => {
    const css = `
@media (min-width: 320px), (min-width: 768px) {
    width: 10iz;
    background-position: 10iz 10iz;
    height: 100px;
}
    `;
    const expected = `
@media (min-width: 320px) {
    width: 3.125vw;
    background-position: 3.125vw 3.125vw;
    height: 100px;
}
@media (min-width: 768px) {
    width: 1.3020833333333335vw;
    background-position: 1.3020833333333335vw 1.3020833333333335vw;
    height: 100px;
}
    `;
    return run(css, expected);
});
