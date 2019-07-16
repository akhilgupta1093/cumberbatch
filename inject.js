// Wait for document ready before executing main function
var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        main();
    }
}, 10);

function main() {
    // Replace page title
    document.title = generateReplacement(document.title);

    // Replace all initial text on page
    replaceNodeText(document.body);

    // Create a mutation observer to monitor the DOM for changes
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            Array.prototype.slice.call(mutation.addedNodes).forEach(replaceNodeText);
        });
    });

    // Configure and start the observer
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });
}

function replaceNodeText(node) {

    // Do nothing for nodes contained in a Google Docs editor (sorry I.E. no support for you)
    if(node.closest && node.closest('.kix-appview')) return;

    // Create a tree walker to traverse all text nodes
    var walker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                // Reject contentEditable nodes
                return (node.parentElement && node.parentElement.isContentEditable) ?
                    NodeFilter.FILTER_SKIP :
                    NodeFilter.FILTER_ACCEPT;
            }
        },
        false
    );

    // Replace all text nodes
    var textNode;
    while(textNode = walker.nextNode()) {
        textNode.nodeValue = generateReplacement(textNode.nodeValue);
    }
}

function generateReplacement(text) {
    const regex = /((Benedict( (Timothy Carlton|Timothy|Carlton))? Cumberbatch)|Cumberbatch)/gi;

    const adjectives = [
        "Buckingham",
        "Beetlejuice",
        "Barnacle",
        "Blubberbutt",
        "Bumbleshack",
        "Burberry",
        "Boobytrap",
        "Burgerking",
        "Blubberbutt",
        "Boilerdang",
        "Rumblesack",
        "Barnabus",
        "Buckminster",
        "Johnnycash",
        "Botany",
        "Benadryl",
        "Honkytonk",
        "Bentobox",
        "Bulbasaur",
        "Brandybuck",
        "Barnacle",
        "Beezlebub",
        "Bourgeoisie",
        "Snorkeldink",
	      "Wellington",
	      "Fiddlestick",
	      "Burgerking",
	      "Bubblebath",
	      "Wimbledon",
	      "Broccoli",
	      "Bouillabaisse",
	      "Butterfree",
	      "Cogglesnatch",
    ];

    const nouns = [
        "Candycrush",
        "Kryptonite",
        "Cameltoe",
        "Cumbersniff",
        "Cuttlefish",
        "Canadian Goose",
        "Humperdinck",
        "Concubine",
        "Oxfordshire",
        "Collywog",
        "Candlestick",
        "Coggleswort",
        "Clombyclomp",
        "Bonaparte",
        "Curdledmilk",
        "Cumbercooch",
        "Cockletit",
        "Nottinghill",
        "Charmander",
        "Crackerdong",
        "Crucifix",
        "Ampersand",
	      "Cunningsnatch",
	      "Curdlemilk",
	      "Camouflage",
	      "Crackerjack",
	      "Vegemite",
	      "Tennismatch",
	      "Cabbagepatch",
	      "Bonaparte",
    ];

    return text.replace(regex, getName());

    function getName() {
        return getRandomElement(adjectives) + " " + getRandomElement(nouns);
    }

    function getRandomElement(array) {
        return array[Math.floor(Math.random()*array.length)];
    }
}
