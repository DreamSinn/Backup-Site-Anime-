const generateButton = document.getElementById('generate-button'); 
const copyButton = document.getElementById('copy-button');
const promptArea = document.getElementById('prompt-area');
const notification = document.getElementById('notification');

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
    "In the distance, ", "Beneath the trees, ", "On the horizon, ", "A glimpse of a town in the distance, ", 
    "Far off in the distance, ", "Over the hills, ", "Across the valley, ", "At the peak of the mountain, ",
    "In the center of a bustling city, ", "Above the river, ", "At the foot of the waterfall, ", 
    "Along the coast, ", "Under the soft pink sky, ", "In the heart of the jungle, ", "Amidst the old stone ruins, ",
    "Behind the bamboo grove, ", "Through the mist, ", "At the edge of the sea, ", "Through the dense fog, ",
    "Upon a rocky outcrop, ", "Near the ancient ruins, ", "On the quiet shores, ", "Within the sacred temple, ",
    "Among the cherry blossoms, ", "Inside the hollow tree, ", "Atop a secluded hill, ", "On the quiet streets, ",
    "In the shadow of the mountains, ", "Beside the riverbank, ", "In the moonlit forest, ", "At the foot of the cliffs, ",
    "Beneath the darkening sky, ", "Along the dusty road, ", "Within the peaceful valley, ", "In the warmth of the sun, ",
    "On the horizon line, ", "Amidst the towering mountains, ", "In the cool evening air, ", "Through the winding path, ",
    "At the edge of the garden, ", "Through the endless field, ", "In the heart of the temple, "
];

const endings = [
    "surrounded by mist and ancient trees.", "where the past and future meet.", "full of serene light and natural beauty.", 
    "where the land whispers its secrets.", "with a quiet breeze brushing through.", "that radiates timeless peace.", 
    "offering a glimpse of a forgotten world.", "where dreams take flight.", "on the edge of a dream.", 
    "under the soft glow of the stars.", "shrouded in the glow of sunset.", "with the distant sound of waves crashing.", 
    "floating in an ethereal haze.", "bathed in warm golden light.", "where the earth feels alive.", 
    "shrouded in soft golden mist.", "at the threshold of time.", "where the moonlight dances on the water.", 
    "imbued with a sense of nostalgia.", "casting long shadows over the land.", "with the soft touch of the past lingering.", 
    "where the air is thick with history.", "where every corner tells a story.", "under a sky that tells its own story.", 
    "where nothing moves but the stars.", "whispering the ancient tales of the earth.", "with every stone telling a story."
];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generatePrompt() {
    let prompt = `/imagine prompt: ${getRandomElement(beginnings)}${getRandomElement(keywords.adjectives)} ${getRandomElement(keywords.nouns)} and ${getRandomElement(keywords.verbs)} over a ${getRandomElement(keywords.environments)}.${getRandomElement(endings)}`;
    
    // Check length, ensure it meets the 400 character requirement
    while (prompt.length < 400) {
        prompt += ` ${getRandomElement(keywords.adjectives)} ${getRandomElement(keywords.nouns)} and ${getRandomElement(keywords.verbs)} over a ${getRandomElement(keywords.environments)}.${getRandomElement(endings)}`;
    }

    promptArea.textContent = prompt;
}

generateButton.addEventListener('click', generatePrompt);

copyButton.addEventListener('click', () => {
    const promptText = promptArea.textContent;
    navigator.clipboard.writeText(promptText).then(() => {
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);
    });
});
