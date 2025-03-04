const generateButton = document.getElementById('generate-button');
const promptArea = document.getElementById('prompt-area');
const notification = document.getElementById('notification');
const negativePromptInput = document.getElementById('negative-prompt');
const generatedTitle = document.getElementById('generated-title'); // Nova textarea para o título

// Emojis relacionados ao tema de anime
const emojis = ["🌸", "⚔️", "🎌", "🎨", "🌟", "👾", "🍥", "🎮", "📺", "🎎", "🎴", "🍣"];

// Hashtags variadas
const hashtags = [
    "#Midjourney","#aiart","#animeart", "#anime", "#animefanart", "#animeChill", "#animeLofi", "#animeworld", 
    "#animeedit", "#animefan", "#animeartwork", "#animecommunity", "#animestyle", "#animevibes",
    "#animeaesthetic", "#animefanart", "#animeartist", "#animeillustration", "#animefanartwork"
];

// Padrões de títulos dinâmicos
const titlePatterns = [
    "✨ {emoji} {adjective} {noun} in {environment} {emoji} ✨ {hashtags}",
    "🌟 {emoji} {verb} with {adjective} {noun} in {environment} {emoji} 🌟 {hashtags}",
    "🌸 {emoji} A {adjective} {noun} {verb} in {environment} {emoji} 🌸 {hashtags}",
    "🎌 {emoji} The {adjective} {noun} of {environment} {emoji} 🎌 {hashtags}",
    "🎨 {emoji} {adjective} {noun} {verb} under {environment} {emoji} 🎨 {hashtags}",
    "⚔️ {emoji} {adjective} {noun} {verb} amidst {environment} {emoji} ⚔️ {hashtags}",
    "📺 {emoji} {adjective} {noun} {verb} within {environment} {emoji} 📺 {hashtags}",
    "🎮 {emoji} {adjective} {noun} {verb} surrounded by {environment} {emoji} 🎮 {hashtags}"
];

// Palavras-chave para o prompt
const keywords = {
    environments: [
        "cherry blossom landscape", "Mount Fuji", "rice field", "zen temple", "bamboo forest", "traditional village", "peaceful beach",
        "fishing village", "Shinto shrine", "ancient ruins", "pine forest", "serene lake", "sakura flower field", 
        "peaceful hill", "coastal city", "zen garden", "temple with pagoda", "stone path", "mountain valley", "gorge",
        "sunset cliff", "mountain pass", "foggy valley", "tropical island", "waterfall garden", "misty forest", "desert plateau",
        "open plains", "moonlit shore", "hidden temple", "emerald lake", "snowy peak", "distant hills", "ancient castle",
        "foggy river", "hidden cave", "highland meadow", "dry canyon", "ancient forest", "snow-covered village", "foggy mountain range",
        "tropical forest", "desert oasis", "lush valley", "remote island", "ancient ruins by the sea", "rocky coastline", "cultural city",
        "garden of statues", "sacred grove", "glistening shore", "crystal-clear pond", "sunlit mountain pass", "hidden lake",
        "majestic peak", "clifftop view", "mountain springs", "rustic bridge", "serene bay", "distant village", "stormy horizon",
        "moonlit temple", "peaceful town square", "wooden footbridge", "dense jungle", "ancient stone arch", "glowing cave entrance",
        "glistening riverbank", "serene lagoon", "rural farm", "desert valley", "mysterious jungle temple"
    ],
    adjectives: [
        "serene", "colorful", "peaceful", "tranquil", "flowering", "beautiful", "ancestral", "traditional", "mystical", "radiant",
        "shimmering", "vibrant", "warm", "flowery", "calm", "dreamlike", "picturesque", "gentle", "delicate", "harmonious", 
        "spiritual", "rustic", "cultural", "relaxing", "serene", "reflective", "contemplative", "nostalgic", "glowing", "clear",
        "poetic", "magical", "delicate", "eternal", "lush", "soft", "whispering", "mysterious", "gentle", "golden", "vivid",
        "ethereal", "hazy", "brilliant", "misty", "vivid", "shimmering", "quiet", "vibrant", "quiet", "delicate", "dreamy",
        "blissful", "serenading", "flowing", "faded", "crystal-clear", "mournful", "luminous", "soft-edged", "clouded", "mystical",
        "calm", "glowing", "mysterious", "rich", "radiant", "soft-spoken", "distant", "enlightening", "sweet-scented", "winding",
        "twinkling", "rustling", "clear-eyed", "celestial", "calming", "glittering", "bright", "shining", "fragile", "exquisite"
    ],
    nouns: [
        "landscape", "temple", "light", "flower", "sakura", "river", "mountain", "lake", "arch", "person", "city", "ruin", 
        "forest", "fire", "cloud", "dream", "song", "koi", "path", "star", "shadow", "wind", "sea", "house", 
        "garden", "pagoda", "sunset", "sky", "peace", "story", "culture", "smile", "flower", "life", "world",
        "lightning", "shadow", "sunrise", "dawn", "evening", "morning", "mist", "glow", "reverie", "journey", "painting", "dreamscape",
        "echo", "whisper", "vision", "fog", "mood", "flame", "blossom", "glitter", "garden", "rain", "pathway", "breeze", "stream",
        "mist", "mountain peak", "sound", "moon", "clouds", "starshine", "peace", "solitude", "vibration", "scent", "firelight",
        "soul", "reflection", "glance", "light", "serenity", "home", "wings", "village", "movement", "blossoms", "touch", "vision",
        "texture", "dream", "feather", "skyline", "splash", "serenity", "dawn", "gaze", "dreams", "branches", "waves", "jungle",
        "sunbeam"
    ],
    verbs: [
        "float", "shine", "dance", "sing", "breathe", "reflect", "grow", "bloom", "whisper", "glimmer", 
        "pass", "sail", "watch", "spread", "run", "get lost", "walk", "meditate", "smile", "dream",
        "sigh", "murmur", "ignite", "flutter", "disappear", "see", "explore", "breathe", "look", "glide",
        "wander", "twinkle", "rise", "explode", "burst", "ripple", "bend", "flow", "unwind", "soothe", "wander",
        "fly", "crash", "capture", "embrace", "explode", "flicker", "illuminate", "move", "whistle", "search",
        "reflect", "pause", "slip", "stretch", "watch", "nurture", "grow", "release", "unfold", "transcend",
        "shudder", "glow", "flit", "explode", "shiver", "soar", "whisper", "manifest", "form", "expand",
        "watch", "stand", "drift", "climb", "shiver", "stand", "hover", "roll", "scatter"
    ],
    moodStyle: [
        "harmonious", "peaceful", "serene", "relaxing", "cultural", "calm", "gentle", "delicate", "romantic", "poetic", 
        "magical", "contemplative", "mystical", "spiritual", "eternal", "clear", "vibrant", "reflective", "radiant", "dreamlike",
        "blissful", "quiet", "restful", "beautiful", "glistening", "elusive", "tranquil", "hypnotic", "blissful", "euphoric",
        "restorative", "uplifting", "ethereal", "delicate", "soothing", "sublime", "peaceful", "serene", "charming", "light",
        "celestial", "soft", "shiny", "flowing", "quiet", "dreamy", "reverent", "relaxed", "refined", "humble", "poetic",
        "graceful", "delicate", "soulful", "shimmering", "luminous", "glowing", "heavenly", "gracious", "peaceful", "calming",
        "radiant", "spiritual", "lively", "beautiful", "waking", "renewed", "enlightened", "serene", "mellow", "pale"
    ],
    technicalDescriptive: [
        "soft details", "soft lighting", "pastel colors", "ethereal atmosphere", "sakura patterns", "delicate textures", "light aura", 
        "watercolor details", "nostalgic details", "soft contrasts", "fuzzy edges", "gentle glow", "fluid details", 
        "peaceful environment", "soft color palette", "soft light effect", "dreamy look", "fluid textures", "celestial glow", 
        "translucent layer", "nostalgic atmosphere", "crystal soft", "blurred edges", "sun-dappled", "glowing hues", 
        "vivid warmth", "polished look", "watery feel", "glistening", "rich tones",
        "water-soaked", "filmic finish", "glittering hue", "soft glow", "dreamlike light", "blurred edges", "softness", "vibrant effect",
        "glimmering", "sharp detailing", "milky hues", "lush contrast", "whispery effect", "emollient texture", "deep tones",
        "brushed light", "clear-cut textures", "bright overlay", "playful edge", "vibrating hues", "rich detail", "sunny warmth",
        "aerial view", "soft brushstrokes", "shining contour", "cool shadows", "color blends", "glassy texture", "vintage vibe"
    ],
    colors: [
        "light pink", "lavender", "sky blue", "light gray", "mint green", "pearl", "navy blue", "dusty rose", "soft beige", "blush pink",
        "pale yellow", "soft blue", "sunset orange", "dark emerald", "plum purple", "seafoam green", "snow white", "sand beige", 
        "creamy yellow", "coral", "golden", "chocolate brown", "light turquoise", "pale pink", "pastel green", "ocean blue",
        "gentle purple", "warm gold", "burnt orange", "gentle red", "mauve", "soft amber", "deep teal", "icy blue", "silver", 
        "pastel lavender", "earthy tones", "lush green", "powder pink", "forest green", "pinkish hue", "warm amber"
    ]
};

const beginnings = [
    "In the heart of ", "Under the neon lights of ", "In the shadows of ", "Within the walls of ", "In the midst of ",
    "On the path to ", "At the edge of ", "In the depths of ", "Beside ", "In front of "
];

const endings = [
    "where legends are born.", "where adventure awaits.", "where magic flows freely.", "where the future unfolds.",
    "where dreams come alive.", "where the past meets the future.", "where the brave rise.", "where the unknown calls."
];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Função para selecionar hashtags aleatórias
function selectHashtags(count) {
    const selectedHashtags = ["#animeart", "#anime"]; // Hashtags obrigatórias
    while (selectedHashtags.length < count) {
        const randomHashtag = hashtags[Math.floor(Math.random() * hashtags.length)];
        if (!selectedHashtags.includes(randomHashtag)) {
            selectedHashtags.push(randomHashtag);
        }
    }
    return selectedHashtags;
}

// Função para gerar um título dinâmico
function generateTitle() {
    // Escolhe um padrão de título aleatório
    const pattern = titlePatterns[Math.floor(Math.random() * titlePatterns.length)];

    // Seleciona palavras-chave aleatórias
    const adjective = getRandomElement(keywords.adjectives);
    const noun = getRandomElement(keywords.nouns);
    const verb = getRandomElement(keywords.verbs);
    const environment = getRandomElement(keywords.environments);
    const emoji = getRandomElement(emojis);

    // Seleciona 6 hashtags (2 obrigatórias + 4 aleatórias)
    const selectedHashtags = selectHashtags(6);

    // Substitui os espaços reservados no padrão
    const title = pattern
        .replace(/{emoji}/g, emoji) // Substitui todos os {emoji}
        .replace("{adjective}", adjective)
        .replace("{noun}", noun)
        .replace("{verb}", verb)
        .replace("{environment}", environment)
        .replace("{hashtags}", selectedHashtags.join(" "));

    return title;
}

// Função para gerar o prompt e o título
function generatePrompt() {
    let prompt = `/imagine prompt: ${getRandomElement(beginnings)}${getRandomElement(keywords.adjectives)} ${getRandomElement(keywords.nouns)} and ${getRandomElement(keywords.verbs)} in a ${getRandomElement(keywords.environments)}.${getRandomElement(endings)}`;
    
    // Adiciona mais conteúdo para atingir 400 caracteres
    while (prompt.length < 400) {
        prompt += ` ${getRandomElement(keywords.adjectives)} ${getRandomElement(keywords.nouns)} and ${getRandomElement(keywords.verbs)} in a ${getRandomElement(keywords.environments)}.${getRandomElement(endings)}`;
    }

    // Adiciona negative prompt se fornecido
    const negativePrompt = negativePromptInput.value.trim();
    if (negativePrompt) {
        prompt += ` --no ${negativePrompt}`;
    }

    // Adiciona 6 hashtags ao prompt
    const promptHashtags = selectHashtags(6);
    prompt += ` ${promptHashtags.join(" ")}`;

    // Exibe o prompt na área de prompt
    promptArea.textContent = prompt;

    // Gera e exibe o título
    const title = generateTitle();
    generatedTitle.value = title;
}

// Copiar o título ao clicar na área do título
generatedTitle.addEventListener('click', () => {
    if (generatedTitle.value) {
        navigator.clipboard.writeText(generatedTitle.value).then(() => {
            notification.style.display = 'block';
            notification.textContent = "Título copiado para a área de transferência!";
            setTimeout(() => {
                notification.style.display = 'none';
            }, 2000);
        });
    }
});

// Copiar o prompt ao clicar na área do prompt
promptArea.addEventListener('click', () => {
    const promptText = promptArea.textContent;
    if (promptText) {
        navigator.clipboard.writeText(promptText).then(() => {
            notification.style.display = 'block';
            notification.textContent = "Prompt copiado para a área de transferência!";
            setTimeout(() => {
                notification.style.display = 'none';
            }, 2000);
        });
    }
});

generateButton.addEventListener('click', generatePrompt);
