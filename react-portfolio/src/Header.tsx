function Header() {
    const header: string = "/images/arrietty.jpg";
    const headerAlt: string = "Header Background";

    return (
        <>
            <header>
                <img id="header-img" src={header} alt={headerAlt} />
            </header>
        </>
    )
}

export default Header