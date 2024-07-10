import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts'

// This is the schema for the course list items we persist
type CourseListItem = {
    id: string
    name: string
    description: string
    instructor: string
    thumbnail: string
    link: string | null
    courseLink: string | null
    length: string | null
    lessons: number | null
    level: string | null
}

// This is the type for additional details we get from the details page
// The courses list has more courses on it, but less details
type CourseDescriptionItem = {
    id: string
    level: string
    name: string
    description: string
    detailsLink: string
    courseLink: string
    length: string
    lessons: number
    instructor: string
}

// This page has more updated information, but doesn't include every available "course".
// This list isn't paginated so we can grab all the courses at once.
const getCourseDescriptions = async (): Promise<CourseDescriptionItem[]> => {
    console.log('Fetching course details...')
    const response = await fetch('https://zerotomastery.io/courses/')
    const document = new DOMParser().parseFromString(
        await response.text(),
        'text/html'
    )
    const foundCourses = [
        ...document.querySelectorAll('[class*="CourseCardsSection"] > div'),
    ]
    if (!foundCourses.length) {
        throw new Error('No courses found on the page.')
    }

    return foundCourses.map((node) => {
        // The level is the first dom element and has an inline color
        const level = node.querySelector('div[color]').textContent.trim()
        const name = node
            .querySelector('a[class*=CardTitle]')
            .textContent.trim()
        const description = node
            .querySelector('p[class*=Excerpt]')
            .textContent.trim()
        const courseLink = node
            .querySelector(
                'a[href^="https://academy.zerotomastery.io/courses"]'
            )
            .getAttribute('href')
        const id = String(courseLink.match(/courses\/(\d+)\/lectures/)?.[1])
        const detailsLink =
            'https://zerotomastery.io' +
            node.querySelector('a[href^="/courses"]').getAttribute('href')
        // Split the span to get the time and lessons
        const meta = node
            .querySelector('span[class*=TimeDetails]')
            .textContent.split('•')
        if (meta.length !== 2) {
            console.error({ name, meta })
            throw new Error('Unexpected meta length')
        }
        const length = meta[0].trim()
        const lessons = parseInt(meta[1].trim().split(' ')[0], 10)
        const instructor = node
            .querySelector('span[class*="AuthorName"]')
            .textContent.trim()

        return {
            id,
            name,
            description,
            detailsLink,
            courseLink,
            level,
            length,
            lessons,
            instructor,
        }
    })
}

const courseDescriptions = await getCourseDescriptions()

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

    const foundCourses = [
        ...document.querySelectorAll('[data-course-id].course-listing'),
    ]
    if (!foundCourses.length) {
        // Every page should have courses, otherwise need to check the page structure
        throw new Error('No courses found on the page.')
    }

    const courses = foundCourses.map((node) => {
        const id = String(node.getAttribute('data-course-id'))
        const name = String(
            node.querySelector('.course-listing-title').textContent.trim()
        )
        // Get the details by matching id or name
        const details =
            courseDescriptions.find((c) => c.id === id) ??
            courseDescriptions.find((c) => c.name === name)

        const thumbnail = String(
            node.querySelector('.course-box-image').getAttribute('src')
        )
        const description =
            details?.description ??
            String(
                node
                    .querySelector('.course-listing-subtitle')
                    .textContent.trim()
            )
        const instructor =
            details?.instructor ??
            String(node.querySelector('.course-author-name').textContent.trim())
        const link = details?.detailsLink ?? null
        const courseLink = details?.courseLink ?? null

        // Set missing details to null
        const { length, lessons, level } = details ?? {
            length: null,
            lessons: null,
            level: null,
        }
        return {
            id,
            name,
            description,
            instructor,
            thumbnail,
            link,
            courseLink,
            length,
            lessons,
            level,
        }
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

const coursesList = (
    await fetchAndParse('https://academy.zerotomastery.io/courses')
)
    // Remove duplicates
    ?.filter((c, i, a) => a.findIndex((t) => t.id === c.id) === i)

Deno.writeTextFileSync(
    'course-details.json',
    JSON.stringify(coursesList, null, 2)
)
