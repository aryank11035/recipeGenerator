
const quotes = [
    "Good food, good mood.",
    "Eat. Sleep. Repeat.",
    "Less talk, more eat.",
    "Life’s too short for bad food.",
    "Taste the magic.",
    "Flavors speak louder than words.",
    "Happiness is homemade.",
    "Fork it, let’s eat.",
    "Love at first bite.",
    "Food is fuel.",
    "Season it right.",
    "Fresh is best.",
    "Cook. Eat. Smile.",
    "Yum happens."
]

export function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)]
}
