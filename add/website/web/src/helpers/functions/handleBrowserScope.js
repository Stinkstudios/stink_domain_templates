import Bowser from "bowser"
import browserScope from '~/../built.browserScope.json'

export default function handleBrowserScope() {
    try {
        const {browser} = Bowser.getParser(window.navigator.userAgent).parsedResult
        const match = browserScope.browsers.find(s => s.name === browser.name.toLowerCase())
        if(
            !match ||
            (
                browser.version < match.version && 
                window.location.href.indexOf("/notSupported") < 0
            )
        ) { 
            window.location.href = "/notSupported"
        } else if( 
            browser.version >= match.version && 
            window.location.href.indexOf("/notSupported") > -1
        ){
            window.location.href = '/'
        }
    }
    catch(e) {
        console.log('no window present')
    }
}