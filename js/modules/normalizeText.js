export function normalizeText(str) {
    // Retirer le pluriel
    const plurals = ['s', 'x', 'z', 'es', 'aux'];
    for (const plural of plurals) {
        if (str.endsWith(plural)) {
            str = str.slice(0, -plural.length);
            break;
        }
    }
    
    const accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ';
    const noAccents = 'AAAAAAaaaaaaOOOOOOooooooEEEEeeeeCcIIIIiiiiUUUUuuuuyNn';
    str = str.split('').map((letter, index) => {
        if (index === 0) {
            // Convertir le premier caractère en majuscule
            return letter.toUpperCase();
        } else {
            // Convertir les autres caractères en minuscules
            return accents.indexOf(letter) !== -1 ? noAccents[accents.indexOf(letter)] : letter.toLowerCase();
        }
    }).join('');

    return str;
}