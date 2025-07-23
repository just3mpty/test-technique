export type ProjectType = {
    title: string,
    description: string,
    years: string | number,
    lastWord?: string,
    url: string,
    police_connection: {
        nodes: {
            title: string,
            policeName: string
        }[]
    },
    colors_connection: {
        nodes: {
            title: string,
            hex: string
        }[]
    },
    tags: [
        {
            tag: string
        }
    ]
}