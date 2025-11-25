function Sidebar() {
    const pfp: string = "/images/profile.png";
    const pfpAlt: string = "Profile Picture";
    const name: string = "Viktoria Gaiser";

    const description: string = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non tortor nec diam venenatis
    ullamcorper. uisque dapibus turpis enim, ut semper enim faucibus eget. Curabitur venenatis
    fringilla felis, et gravida quam lacinia sit amet. Sed consectetur diam eu interdum congue. 
    Vivamus cursus efficitur metus, eget eleifend augue gravida ut. Donec sit amet imperdiet metus. 
    Sed posuere nulla volutpat nulla faucibus, in luctus quam finibus.
    `;

    return (
        <>
            <div id="sidebar">
                <img id="pfp" src={pfp} alt={pfpAlt}></img>
                <div id="about">
                    <h1 style={{ textAlign: "center" }}>{name}</h1>
                    <p>{description}</p>
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