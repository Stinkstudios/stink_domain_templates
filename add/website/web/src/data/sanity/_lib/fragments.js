import getAllQueries from './getAllQueries'

const fragments = getAllQueries(require.context('./fragments', true, /\.js$/))

export default fragments
