import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts'

type CourseListItem = {
    id: string
    name: string
    description: string
    link: string
    thumbnail: string
}

const extractChangedUrls = (document: any): Record<string, string> => {
    const scriptContent = [...document.querySelectorAll('script')].find(
        (script: any) =>
            script.textContent &&
            script.textContent.includes('const changed_urls')
    )

    const match = scriptContent.textContent?.match(
        /const\s+changed_urls\s*=\s*(\{[\s\S]*?\})\s*;/
    )
    if (!match) {
        throw new Error('Changed URLs object could not be extracted.')
    }

    // Sanitize is
    const jsonString = match[1]
        .replace(/(\w+):/g, '"$1":') // Quote property names
        .replace(/'/g, '"') // Replace single quotes with double quotes
        .replace(/,\s*}/g, '}')

    return JSON.parse(jsonString)
}

const fetchAndParse = async (
    url: string,
    allCourses: CourseListItem[] = []
): Promise<CourseListItem[] | void> => {
    console.log(`Fetching ${url}`)
    const response = await fetch(url)
    const document = new DOMParser().parseFromString(
        await response.text(),
        'text/html'
    )

    // Some of the url slugs have changed and appear in the document
    const changedUrls = extractChangedUrls(document)

    const foundCourses = [
        ...document.querySelectorAll('[data-course-id].course-listing'),
    ]
    if (!foundCourses.length) {
        // Every page should have courses, otherwise need to check the page structure
        throw new Error('No courses found on the page.')
    }

    const courses = foundCourses.map((node) => {
        const id = node.getAttribute('data-course-id')
        const href = node.getAttribute('data-course-url')
        // Some of the URLs have changed, so we need to check if the URL is in the changed URLs object
        // Also want to slice off the p at the front of the URL if found
        const link = `https://zerotomastery.io/${
            changedUrls[href] ?? href.replace('/p/', 'courses/')
        }`

        const thumbnail = node
            .querySelector('.course-box-image')
            .getAttribute('src')
        const name = node
            .querySelector('.course-listing-title')
            .textContent.trim()
        const description = node
            .querySelector('.course-listing-subtitle')
            .textContent.trim()
        return { id, name, description, link, thumbnail }
    })

    // Find the next page URL if it exists
    const nextPage =
        document.querySelector('a[rel="next"]')?.getAttribute('href') || null

    // Recurse or return the final list
    return nextPage
        ? await fetchAndParse(
              new URL(nextPage, url).href,
              allCourses.concat(courses)
          )
        : allCourses.concat(courses)
}

// Fetch the list and remove duplicates
const coursesList = (
    await fetchAndParse('https://academy.zerotomastery.io/courses')
)
    // Remove duplicates
    ?.filter((c, i, a) => a.findIndex((t) => t.id === c.id) === i)

Deno.writeTextFileSync(
    'course-details.json',
    JSON.stringify(coursesList, null, 2)
)
