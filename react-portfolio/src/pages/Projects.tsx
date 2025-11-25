import { useEffect, useState } from 'react'

interface Project {
    title: string
    image: string
    tags: string
    description: string
    page: string
    github: string
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        fetch('/projects/projects.tsv')
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                return res.text()
            })
            .then(text => {
                if (cancelled) return
                const lines = text.trim().split(/\r?\n/)
                // detect header row (optional)
                const firstCols = lines[0]?.split('\t') ?? []
                const hasHeader = firstCols.length >= 6 && /Title/i.test(firstCols[0])
                const dataLines = (hasHeader ? lines.slice(1) : lines).filter(l => l.trim() !== '')

                const parsed = dataLines.map(line => {
                    const cols = line.split('\t')
                    return {
                        title: cols[0] ?? '',
                        image: cols[1] ?? '',
                        tags: cols[2] ?? '',
                        description: cols[3] ?? '',
                        page: cols[4] ?? '',
                        github: cols[5] ?? ''
                    } as Project
                })

                setProjects(parsed)
                setLoading(false)
            })
            .catch(err => {
                if (cancelled) return
                console.error('Error fetching/parsing projects.tsv', err)
                setError('There was a problem loading the projects.')
                setLoading(false)
            })

        return () => { cancelled = true }
    }, [])

    if (loading) return (
        <div>
            <h1>Projects</h1>
            <p>Loading projects…</p>
        </div>
    )

    if (error) return (
        <div>
            <h1>Projects</h1>
            <p>{error}</p>
        </div>
    )

    return (
        <div>
            <h1>Projects</h1>
            <div className="cards">
                {projects.map((p, i) => (
                    <article className="card" key={i}>
                        {p.image && <img src={p.image.startsWith('/') ? p.image : `/projects/images/${p.image}`} alt={p.title} />}
                        <h2>{p.title}</h2>
                        <p>{p.description}</p>
                        <div className="card-links">
                            {p.page && <a href={p.page}>Live</a>}
                            {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer">Source</a>}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}
