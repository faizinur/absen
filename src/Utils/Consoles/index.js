let log = (...args) => { if (__DEV__) { console.log(...args) } }
let info = (...args) => { if (__DEV__) { console.info(...args) } }
let warn = (...args) => { if (__DEV__) { console.warn(...args) } }

export { log, info, warn }
export default log;