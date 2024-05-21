import type {Config} from 'jest';

const config: Config = {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,ts}'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    moduleFileExtensions: [
        'js',
        'ts'
    ],
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    "moduleNameMapper": {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    "modulePaths": [
        "<rootDir>/src",
        "<rootDir>/node_modules"
    ]
};

export default config;