//https://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
/**
 * Get all of an element's parent elements up the DOM tree
 * @param  {Node}   elem     The element
 * @param  {String} selector Selector to match against [optional]
 * @return {Array}           The parent elements
 */
var getParents = function (elem, selector) {
    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }
    // Setup parents array
    var parents = [];
    // Get matching parent elements
    for (; elem && elem !== document; elem = elem.parentNode) {
        // Add matching parents to array
        if (selector) {
            if (elem.matches(selector)) {
                parents.push(elem);
            }
        } else {
            parents.push(elem);
        }
    }
    return parents;
};


//scraper
const Scrap = setInterval(() => {
    const load = document.querySelectorAll('a.uiMorePagerPrimary');
    if (load.length > 0) {
        window.scrollTo(0, document.body.scrollHeight);
        load.forEach(e => {
            e.click()
        });
    } else {
        console.clear();
        const profiles = document.querySelectorAll('div.lists .fsl a[data-hovercard*="/ajax/"]');
        let payload = []
        profiles.forEach(e => {
            let profile_id = e.dataset.hovercard.replace(/.+id=([0-9]+)&.+/, '$1');
            let name = e.text;
            let thumbnail = getParents(e.parentNode)[5].children[0].childNodes[0].src;
            member = {
                profile_id,
                name,
                thumbnail
            }
                payload.push(member);
        });
        let data = {
            "Name": "Group Members",
            "members": payload
        }
        console.log(data)
        clearTimeout(Scrap);
    }
}, 3000);