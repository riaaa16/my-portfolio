import { useEffect, useState } from 'react'
import './card.css'

interface NotionImage {
  url: string
  expiry_time?: string | null
}

interface NotionPage {
  id: string
  title: string
  description?: string
  tags: string[]
  image?: NotionImage | null
  page?: string
  github?: string
}

export default function NotionProjects() {
  const [pages, setPages] = useState<NotionPage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // map pageId -> current image src (allows updating when refreshed)
  const [imageSrcs, setImageSrcs] = useState<Record<string, string | null>>({})
  // track whether we've attempted a refresh for a page (avoid repeated refresh attempts)
  const [attemptedRefreshes, setAttemptedRefreshes] = useState<Record<string, boolean>>({})

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        const res = await fetch('/api/notion/pages')
        if (!res.ok) throw new Error(`Failed to load Notion pages: ${res.status}`)
        const data = await res.json()
        // accept either { pages: [...] } or an array
        const list: NotionPage[] = Array.isArray(data) ? data : data.pages || []
        if (!mounted) return
        setPages(list)
        // initialize image src map
        const map: Record<string, string | null> = {}
        list.forEach(p => { map[p.id] = p.image?.url ?? null })
        setImageSrcs(map)
        setLoading(false)
      } catch (err: any) {
        if (err.name !== 'AbortError') setError(String(err.message || err))
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  async function refreshImage(pageId: string) {
    try {
      const res = await fetch(`/api/notion/refresh-image?pageId=${encodeURIComponent(pageId)}`)
      if (!res.ok) throw new Error(`Refresh failed: ${res.status}`)
      const json = await res.json()
      // json.url may be null to indicate no Notion-hosted file
      if (json && json.url) {
        // got a fresh signed URL
        setImageSrcs(prev => ({ ...prev, [pageId]: json.url }))
        // allow future refreshes if needed
        setAttemptedRefreshes(prev => ({ ...prev, [pageId]: false }))
        return true
      }
      // no Notion-hosted file; set explicit null so UI can show placeholder
      setImageSrcs(prev => ({ ...prev, [pageId]: null }))
      // mark as attempted so we don't retry
      setAttemptedRefreshes(prev => ({ ...prev, [pageId]: true }))
      return false
    } catch (e) {
      // on network/server error, clear attempt flag so user can retry later
      setAttemptedRefreshes(prev => ({ ...prev, [pageId]: false }))
      return false
    }
  }

  function handleImgError(pageId: string) {
    // Only attempt a single refresh per page to avoid loops
    if (attemptedRefreshes[pageId]) return
    // mark attempted true optimistically (will be cleared on success or network error)
    setAttemptedRefreshes(prev => ({ ...prev, [pageId]: true }))
    refreshImage(pageId)
  }

  if (loading) return <p>Loading projects…</p>
  if (error) return <p>Error loading projects: {error}</p>
  if (!pages || pages.length === 0) return <p>No projects found.</p>

  return (
    <>
      {pages.map((project, index) => (
        <div className="card" key={project.id || index}>
          <div className="card-header">
            <h2>{project.title}</h2>
            <div className="card-links">
              {project.page ? (
                <a href={project.page}>
                  <i className="bi bi-box-arrow-up-right"></i>
                </a>
              ) : null}
              {project.github ? (
                <a href={project.github}>
                  <i className="bi bi-github" aria-hidden="true"></i>
                </a>
              ) : null}
            </div>
          </div>

          {imageSrcs[project.id] ? (
            <img
              src={imageSrcs[project.id] as string}
              alt={project.title}
              loading="lazy"
              onError={() => handleImgError(project.id)}
            />
          ) : null}

          <div className="tags">
            {(project.tags || []).map((tag, tagIndex) => (
              <span key={tagIndex}>{tag}</span>
            ))}
          </div>
          <p>{project.description}</p>
        </div>
      ))}
    </>
  )
}
