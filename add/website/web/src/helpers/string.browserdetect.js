//adapted from https://github.com/DamonOehlman/detect-browser

module.exports = (browsers) => `
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var BrowserInfo = /** @class */ (function () {
    function BrowserInfo(name, version, os) {
        this.name = name;
        this.version = version;
        this.os = os;
        this.type = 'browser';
    }
    return BrowserInfo;
}());


// tslint:disable-next-line:max-line-length
var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var REQUIRED_VERSION_PARTS = 3;
var userAgentRules = [
    ['aol', /AOLShield\\/([0-9\\._]+)/],
    ['edge', /Edge\\/([0-9\\._]+)/],
    ['edge-ios', /EdgiOS\\/([0-9\\._]+)/],
    ['yandexbrowser', /YaBrowser\\/([0-9\\._]+)/],
    ['kakaotalk', /KAKAOTALK\\s([0-9\\.]+)/],
    ['samsung', /SamsungBrowser\\/([0-9\\.]+)/],
    ['silk', /\\bSilk\\/([0-9._-]+)\\b/],
    ['miui', /MiuiBrowser\\/([0-9\\.]+)$/],
    ['beaker', /BeakerBrowser\\/([0-9\\.]+)/],
    ['edge-chromium', /EdgA?\\/([0-9\\.]+)/],
    [
        'chromium-webview',
        /(?!Chrom.*OPR)wv\\).*Chrom(?:e|ium)\\/([0-9\\.]+)(:?\\s|$)/,
    ],
    ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\\/([0-9\\.]+)(:?\\s|$)/],
    ['phantomjs', /PhantomJS\\/([0-9\\.]+)(:?\\s|$)/],
    ['crios', /CriOS\\/([0-9\\.]+)(:?\\s|$)/],
    ['firefox', /Firefox\\/([0-9\\.]+)(?:\\s|$)/],
    ['fxios', /FxiOS\\/([0-9\\.]+)/],
    ['opera-mini', /Opera Mini.*Version\\/([0-9\\.]+)/],
    ['opera', /Opera\\/([0-9\\.]+)(?:\\s|$)/],
    ['opera', /OPR\\/([0-9\\.]+)(:?\\s|$)/],
    ['ie', /Trident\\/7\\.0.*rv\\:([0-9\\.]+).*\\).*Gecko$/],
    ['ie', /MSIE\\s([0-9\\.]+);.*Trident\\/[4-7].0/],
    ['ie', /MSIE\\s(7\\.0)/],
    ['bb10', /BB10;\\sTouch.*Version\\/([0-9\\.]+)/],
    ['android', /Android\\s([0-9\\.]+)/],
    ['ios', /Version\\/([0-9\\._]+).*Mobile.*Safari.*/],
    ['safari', /Version\\/([0-9\\._]+).*Safari/],
    ['facebook', /FBAV\\/([0-9\\.]+)/],
    ['instagram', /Instagram\\s([0-9\\.]+)/],
    ['ios-webview', /AppleWebKit\\/([0-9\\.]+).*Mobile/],
    ['ios-webview', /AppleWebKit\\/([0-9\\.]+).*Gecko\\)$/],
];
var operatingSystemRules = [
    ['iOS', /iP(hone|od|ad)/],
    ['Android OS', /Android/],
    ['BlackBerry OS', /BlackBerry|BB10/],
    ['Windows Mobile', /IEMobile/],
    ['Amazon OS', /Kindle/],
    ['Windows 3.11', /Win16/],
    ['Windows 95', /(Windows 95)|(Win95)|(Windows_95)/],
    ['Windows 98', /(Windows 98)|(Win98)/],
    ['Windows 2000', /(Windows NT 5.0)|(Windows 2000)/],
    ['Windows XP', /(Windows NT 5.1)|(Windows XP)/],
    ['Windows Server 2003', /(Windows NT 5.2)/],
    ['Windows Vista', /(Windows NT 6.0)/],
    ['Windows 7', /(Windows NT 6.1)/],
    ['Windows 8', /(Windows NT 6.2)/],
    ['Windows 8.1', /(Windows NT 6.3)/],
    ['Windows 10', /(Windows NT 10.0)/],
    ['Windows ME', /Windows ME/],
    ['Open BSD', /OpenBSD/],
    ['Sun OS', /SunOS/],
    ['Chrome OS', /CrOS/],
    ['Linux', /(Linux)|(X11)/],
    ['Mac OS', /(Mac_PowerPC)|(Macintosh)/],
    ['QNX', /QNX/],
    ['BeOS', /BeOS/],
    ['OS/2', /OS\\/2/],
];
function detectBrowser(userAgent) {
    if (!!userAgent) {
        return parseUserAgent(userAgent);
    }
    if (typeof navigator !== 'undefined') {
        return parseUserAgent(navigator.userAgent);
    }
    return null;
}

function matchUserAgent(ua) {
    // opted for using reduce here rather than Array#first with a regex.test call
    // this is primarily because using the reduce we only perform the regex
    // execution once rather than once for the test and for the exec again below
    // probably something that needs to be benchmarked though
    return (ua !== '' &&
        userAgentRules.reduce(function (matched, _a) {
            var browser = _a[0], regex = _a[1];
            if (matched) {
                return matched;
            }
            var uaMatch = regex.exec(ua);
            return !!uaMatch && [browser, uaMatch];
        }, false));
}
function browserName(ua) {
    var data = matchUserAgent(ua);
    return data ? data[0] : null;
}
function parseUserAgent(ua) {
    var matchedRule = matchUserAgent(ua);
    if (!matchedRule) {
        return null;
    }
    var name = matchedRule[0], match = matchedRule[1];
    if (name === 'searchbot') {
        return new BotInfo();
    }
    var versionParts = match[1] && match[1].split(/[._]/).slice(0, 3);
    if (versionParts) {
        if (versionParts.length < REQUIRED_VERSION_PARTS) {
            versionParts = __spreadArrays(versionParts, createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length));
        }
    }
    else {
        versionParts = [];
    }
    var version = versionParts.join('.');
    var os = detectOS(ua);
    return new BrowserInfo(name, version, os);
}
function detectOS(ua) {
    for (var ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
        var _a = operatingSystemRules[ii], os = _a[0], regex = _a[1];
        var match = regex.exec(ua);
        if (match) {
            return os;
        }
    }
    return null;
}

function createVersionParts(count) {
    var output = [];
    for (var ii = 0; ii < count; ii++) {
        output.push('0');
    }
    return output;
}
var browser = detectBrowser(navigator.userAgent);
var browsers = ${JSON.stringify(browsers)}
var match = null
for(var i=0; i< browsers.length; i++) {
    if(browsers[i].name === browser.name.toLowerCase()) match = browsers[i]
}

function versionGreaterThan(a,b) {
    if(!!Number(b)&&!!Number(a)) return a>b
    if(!!Number(a)) { // single digit
        return a > Number(b.split('.')[0])
    } else {
        var as = a.split('.')
        var bs = b.split('.')
        return (Number(as[0]) > Number(bs[0]))
        if( Number(as[0]) === Number(bs[0]) ) {
            if(Number(as[1]) === Number(bs[1])) {
                return (Number(as[2]) >= Number(bs[2]))
            }
            return Number(as[1]) > Number(bs[1])
        }
    }
}
if(
    !match ||
    (
        versionGreaterThan(match.version,browser.version) && 
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

`
