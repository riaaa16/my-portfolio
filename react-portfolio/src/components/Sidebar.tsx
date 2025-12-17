function Sidebar() {
    const pfp: string = "/images/profile.png";
    const pfpAlt: string = "Profile Picture";
    const name: string = "Viktoria Gaiser";

    const description: string = `
    Front-end engineer with a passion for creating user-friendly and visually appealing web applications.
    
    My fun fact is that I love making spreadsheets.
    `
    .trim();

    return (
        <>
            <div id="sidebar">
                <img id="pfp" src={pfp} alt={pfpAlt}></img>
                <div id="about">
                    <h1 style={{ textAlign: "center" }}>{name}</h1>
                    <p style={{ whiteSpace: "pre-line"}}>{description}</p>
                    <div className="social-links">
                        <a target="_blank" href="https://www.linkedin.com/in/viktoria-gaiser/" className="icon-link"
                            aria-label="LinkedIn" title="LinkedIn">
                            <i className="bi bi-linkedin" aria-hidden="true"></i>
                            <span className="label">LinkedIn</span>
                        </a>
                        <a target="_blank" href="https://github.com/riaaa16" className="icon-link" aria-label="GitHub"
                            title="GitHub">
                            <i className="bi bi-github" aria-hidden="true"></i>
                            <span className="label">GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar