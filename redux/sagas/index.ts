import { all } from 'redux-saga/effects';

const allImport = (exportWatchers: { [s: string]: () => Generator }) => {
  return Object.keys(exportWatchers).map((key) => exportWatchers[key]());
};

export default function* () {
  yield all([]);
}
