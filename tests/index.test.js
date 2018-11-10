const postcss = require('postcss');
const fs = require('fs');
const samplesDirPath = './tests/samples/'
const inazuma = require('..');

const run = (input, output, opts) => {
    return postcss([inazuma(opts)]).process(input)
        .then((result) => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
};

const testExamples = fs.readdirSync(samplesDirPath).map(fileName => {
    const sample = require(`./samples/${fileName}`, 'utf8')
    const name = fileName.split('.')[0]
    it(name, () => {
        return run(
            sample.input,
            sample.output
        );
    });
})
