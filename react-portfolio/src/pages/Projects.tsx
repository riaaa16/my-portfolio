import { useEffect, useState } from 'react'
import './card.css'

interface Project {
    title: string
    image: string
    tags: string
    description: string
    page: string
    github: string
}

export default function Projects() {
    const [data, setData] = useState<string[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        async function load() {
            try {
                setLoading(true);
                const res = await fetch('/projects/projects.tsv', { signal })
                if (!res.ok) throw new Error(`Failed to load projects: ${res.status}`)
                const text = await res.text()
                const rows = text.split(/\r?\n/) // Split by newlines
                    .slice(1) // Remove header row
                    .map(l => l.trim()) // Trim whitespace
                    .filter(Boolean) // Filter out empty lines
                setData(rows)
            } catch (err: any) {
                if (err.name !== 'AbortError') setError(String(err.message || err))
            }
        }

        load()
        return () => controller.abort()
    }, []);

    // Process TSV data into projects
    useEffect(() => {
        if (!data || data.length === 0) return;

        const parsed: Project[] = data.map((row) => {
            const [title, image, tags, description, page, github] = row.split("\t").map(cell => cell.trim());
            return { title, image, tags, description, page, github };
        });
        setProjects(parsed);
        setLoading(false);
    }, [data]); // Refresh when data changes

    // UI states
    if (loading) return <p>Loading projects…</p>
    if (error) return <p>Error loading projects: {error}</p>
    if (projects.length === 0) return <p>No projects found.</p>

    return (
        <>
            {projects.map((project, index) => (
                <div className="card" key={index}>
                    <div className="card-header">
                        <h2>{project.title}</h2>
                        <div className="card-links">
                            <a href={project.page}>
                                <i className="bi bi-box-arrow-up-right"></i>
                            </a>
                            <a href={project.github}>
                                <i className="bi bi-github" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                    {project.image ? (
                        <img
                            src={"/projects/images/" + project.image + ".png"}
                            alt={project.title}
                            loading="lazy"
                        />
                    ) : null}
                    <div className="tags">
                        {project.tags.split(",").map((tag: string, tagIndex) => (
                            <span key={tagIndex}>{tag.trim()}</span>
                        ))}
                    </div>
                    <p>{project.description}</p>
                </div>
            ))}
        </>
    )
}
