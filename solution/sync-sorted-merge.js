"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  let logEntries = {};
  for (let source in logSources) {
    logEntries[source] = logSources[source].pop();
  };

  let sortedLogEntries = [];
  for (let source in logEntries) {
    if (logEntries[source]) {
      sortedLogEntries.push(logEntries[source]);
    };
  };

  sortedLogEntries.sort((a, b) => {
    return a.date - b.date;
  });

  sortedLogEntries.forEach((entry) => {
    printer.print(entry);
  });

  printer.done();

  return console.log("Sync sort complete.");
};
