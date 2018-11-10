const opts = {}

const input = `
@media (min-width: 320px) and (max-width: 719px) {
    .awesomeTitle {
        font-size: 14iz;
    }
}
`

const output = `
@media (min-width: 320px) and (max-width: 719px) {
    .awesomeTitle {
        font-size: 4.375vw;
    }
}
`

module.exports = {
    input: input,
    output: output,
    opts: opts
}
