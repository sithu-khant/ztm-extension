import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts'
import type { CourseDescriptionItem } from './types.ts'

// This page has more updated information, but doesn't include every available "course".
// This list isn't paginated so we can grab all the courses at once.
export const getCourseDescriptions = async (): Promise<
    CourseDescriptionItem[]
> => {
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
