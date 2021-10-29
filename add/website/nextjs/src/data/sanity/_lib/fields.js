import getAllQueries from './getAllQueries'

const fields = getAllQueries(require.context('../fields', true, /\.js$/))
export default fields
