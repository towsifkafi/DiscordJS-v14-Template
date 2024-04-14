function roundsquares(text) {
    var roundsquaresMap = {
        'A': '🅰️', 'B': '🅱️', 'C': '🅲️', 'D': '🅳️', 'E': '🅴️', 'F': '🅵️',
        'G': '🅶️', 'H': '🅷️', 'I': '🅸️', 'J': '🅹️', 'K': '🅺️', 'L': '🅻️',
        'M': '🅼️', 'N': '🅽️', 'O': '🅾️', 'P': '🅿️', 'Q': '🆀️', 'R': '🆁️',
        'S': '🆂️', 'T': '🆃️', 'U': '🆄️', 'V': '🆅️', 'W': '🆆️', 'X': '🆇️',
        'Y': '🆈️', 'Z': '🆉️', '0': '0️⃣', '1': '1️⃣', '2': '2️⃣', '3': '3️⃣',
        '4': '4️⃣', '5': '5️⃣', '6': '6️⃣', '7': '7️⃣', '8': '8️⃣', '9': '9️⃣'
    };

    var roundsquaresText = '';
    for (var i = 0; i < text.length; i++) {
        roundsquaresText += roundsquaresMap[text[i]] || text[i];
    }
    return roundsquaresText;
}

function bubbles(text) {
    var bubblesMap = {
        '0': '⓪', '1': '①', '2': '②', '3': '③', '4': '④', '5': '⑤',
        '6': '⑥', '7': '⑦', '8': '⑧', '9': '⑨', 'A': 'Ⓐ', 'B': 'Ⓑ',
        'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ', 'H': 'Ⓗ',
        'I': 'Ⓘ', 'J': 'Ⓙ', 'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ',
        'O': 'Ⓞ', 'P': 'Ⓟ', 'Q': 'Ⓠ', 'R': 'Ⓡ', 'S': 'Ⓢ', 'T': 'Ⓣ',
        'U': 'Ⓤ', 'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ', 'Y': 'Ⓨ', 'Z': 'Ⓩ',
        'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ',
        'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ',
        'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ',
        's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ',
        'y': 'ⓨ', 'z': 'ⓩ'
    };

    var bubblesText = '';
    for (var i = 0; i < text.length; i++) {
        bubblesText += bubblesMap[text[i]] || text[i];
    }
    return bubblesText;
}

function creepify(text) {
    var creepified = "";
    var diacriticsTop = ['̅', '̲', '̶']; // Add more diacritics as per original implementation
    var diacriticsMiddle = ['̑', '̆', '̕']; // Add more diacritics as per original implementation
    var diacriticsBottom = ['̂', '̍', '̄']; // Add more diacritics as per original implementation

    for (var i = 0; i < text.length; i++) {
        creepified += text[i];
        if (Math.random() < 0.5) {
            creepified += diacriticsTop[Math.floor(Math.random() * diacriticsTop.length)];
        }
        if (Math.random() < 0.5) {
            creepified += diacriticsMiddle[Math.floor(Math.random() * diacriticsMiddle.length)];
        }
        if (Math.random() < 0.5) {
            creepified += diacriticsBottom[Math.floor(Math.random() * diacriticsBottom.length)];
        }
    }
    return creepified;
}

function bent(text) {
    var bentMap = {
        'a': 'ą', 'b': 'ҍ', 'c': 'ç', 'd': 'ժ', 'e': 'ҽ', 'f': 'ƒ',
        'g': 'ց', 'h': 'հ', 'i': 'ì', 'j': 'ʝ', 'k': 'ҟ', 'l': 'Ӏ',
        'm': 'ʍ', 'n': 'ղ', 'o': 'օ', 'p': 'ք', 'q': 'զ', 'r': 'ɾ',
        's': 'ʂ', 't': 'է', 'u': 'մ', 'v': 'ѵ', 'w': 'ա', 'x': '×',
        'y': 'վ', 'z': 'Հ', 'A': 'Ⱥ', 'B': 'β', 'C': '↻', 'D': 'Ꭰ',
        'E': 'Ɛ', 'F': 'Ƒ', 'G': 'Ɠ', 'H': 'Ƕ', 'I': 'į', 'J': 'ل',
        'K': 'Ҡ', 'L': 'Ꝉ', 'M': 'Ɱ', 'N': 'ហ', 'O': 'ට', 'P': 'φ',
        'Q': 'Ҩ', 'R': 'འ', 'S': 'Ϛ', 'T': 'Ͳ', 'U': 'Ա', 'V': 'Ỽ',
        'W': 'చ', 'X': 'ჯ', 'Y': 'Ӌ', 'Z': 'ɀ'
    };

    var bentText = '';
    for (var i = 0; i < text.length; i++) {
        bentText += bentMap[text[i]] || text[i];
    }
    return bentText;
}

module.exports = { 
    roundsquares, bubbles, creepify, bent
 }