const fromPairs = pairs => pairs.reduce((res, [key, value]) => ({
    ...res,
    [key]: value
}), {})

function moduleNameMapperFromTSPaths(tsconfig) {
    if (!tsconfig.compilerOptions?.paths) return {}
    return fromPairs(
        Object.entries(tsconfig.compilerOptions.paths).map(([k, [v]]) => [
            `^${k.replace(/\*/, "(.*)")}`,
            `<rootDir>/${v.replace(/\*/, "$1")}`,
        ]),
    )
}
const tsconfig = require("./tsconfig.json")
const moduleNameMapper = moduleNameMapperFromTSPaths(tsconfig)

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    testPathIgnorePatterns: ['<rootDir>/test/fixtures'],
    coveragePathIgnorePatterns: ['<rootDir>/test/'],
    moduleNameMapper
};
