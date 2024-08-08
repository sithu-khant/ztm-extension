// This is the schema for the course list items we persist
export type CourseListItem = {
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
export type CourseDescriptionItem = {
    level: string
    name: string
    description: string
    detailsLink: string
    length: string
    lessons: number
    instructor: string
}
