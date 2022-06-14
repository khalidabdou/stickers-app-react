//const API='http://77.243.85.134:9000' 
const API= process.env.REACT_APP_API || 'http://localhost:9000'
const API_STICKERS= API+'/packs/'
const API_LANGUAGES= API+'/languages'
const API_CATEGORIES= API+'/categories/'

export {API,API_STICKERS, API_LANGUAGES, API_CATEGORIES}