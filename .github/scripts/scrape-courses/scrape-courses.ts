import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts'
import { findMostSimilarName } from './helpers.ts'
import type { CourseListItem } from './types.ts'
import { getCourseDescriptions } from './getCourseDescriptions.ts'

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
        const url = new URL(
            'https://academy.zerotomastery.io' +
                node.getAttribute('data-course-url')
        )
        const name = String(
            node.querySelector('.course-listing-title').textContent.trim()
        )
        // Get the details by matching the name
        const details =
            courseDescriptions.find((c) => c.name === name) ??
            findMostSimilarName(name, courseDescriptions)

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
        const link = details?.detailsLink ?? url ?? null
        const courseLink = 'https://academy.zerotomastery.io/courses/' + id

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
