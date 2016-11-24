var tsm = require('teamcity-service-messages');

var REPORTER = 'LessHint';

function addElement(collection, element) {
    collection.push(element);
    return element;
}

module.exports = {
    report: results => {
        tsm.testSuiteStarted({ name: REPORTER });

        if (results && results.length > 0) {
            results.reduce((currentFiles, result) => {
                var rules = (
                    currentFiles.find(f => result.file === f.name) ||
                    addElement(currentFiles, { name: result.file, rules: [] })
                ).rules;

                (
                    rules.find(r => result.linter === r.linter) ||
                    addElement(rules, { linter: result.linter, errors: [] })
                ).errors.push(result);

                return currentFiles;
            }, [])
                .forEach(file => {
                    tsm.testSuiteStarted({ name: file.name });

                    file.rules.forEach(rule => {
                        tsm.testSuiteStarted({ name: rule.linter });

                        rule.errors.forEach(error => {
                            var name = "line " + error.line + ", col " + error.column + ", " + error.message;
                            tsm.testStarted({ name: name })
                                .testFailed({
                                    name: name,
                                    message: error.message,
                                    detailed: "evidence:" + error.source + " severity: " + error.severity
                                })
                                .testFinished({ name: name });
                        });
                        tsm.testSuiteFinished({ name: rule.linter });
                    });
                    tsm.testSuiteFinished({ name: file.name });
                });
        }

        tsm.testSuiteFinished({ name: REPORTER });
    }
};