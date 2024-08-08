// Some helpers to guess the name of the course
const getWords = (str) => {
    const wordsToRemove = ['zero to mastery', 'complete']
    const regexWords = new RegExp(`\\b(?:${wordsToRemove.join('|')})\\b`, 'gi')
    const regexPunctuation = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g

    // Remove specified words and punctuation
    const cleanedStr = str
        .replaceAll(regexWords, '')
        .replaceAll(regexPunctuation, '')
        .toLowerCase()

    return cleanedStr.match(/\w+/g) || []
}
const calculateSimilarity = (name1, name2) => {
    const words1 = new Set(getWords(name1))
    const words2 = new Set(getWords(name2))
    const intersection = new Set([...words1].filter((x) => words2.has(x)))
    return intersection.size / Math.max(words1.size, words2.size)
}
export const findMostSimilarName = (name, courseDescriptions) => {
    const mostLIkely = courseDescriptions
        .map((course) => ({
            ...course,
            similarity: calculateSimilarity(name, course.name),
        }))
        .sort((a, b) => b.similarity - a.similarity)[0]
    return mostLIkely.similarity > 0.51 ? mostLIkely : null
}
