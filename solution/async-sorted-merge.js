"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {

    const getLogEntries = async (logSources) => {
      let logEntries = {};
      for (let source in logSources) {
        logEntries[source] = await logSources[source].popAsync();
      };
      return logEntries;
    };

    const sortLogEntries = (logEntries) => {
      let sortedLogEntries = [];
      for (let source in logEntries) {
        if (logEntries[source]) {
          sortedLogEntries.push(logEntries[source]);
        };
      };

      sortedLogEntries.sort((a, b) => {
        return a.date - b.date;
      });

      return sortedLogEntries;
    };

    const logEntries = await getLogEntries(logSources);
    let sortedLogEntries = sortLogEntries(logEntries);

    sortedLogEntries.forEach((entry) => {
      printer.print(entry);
    });

    printer.done();
    resolve(console.log("Async sort complete."));
  });
};
