import getAllQueries from './getAllQueries'

const queries = getAllQueries(require.context('../queries', true, /\.js$/))
export default queries
