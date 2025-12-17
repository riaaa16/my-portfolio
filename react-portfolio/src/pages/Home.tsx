import './home.css';

export default function Home() {
    const credits = `
    Header: https://www.ghibli.jp/works/
    Light Effect: https://gifs.alphacoders.com/gifs/view/14260
    Profile Picture: https://meiker.io/play/11374/online.html
    Jokebear: https://store.line.me/stickershop/product/3147970/en
    Icons: https://icons.getbootstrap.com/
    `.trim();

    const creditItems = credits
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
            const [label, url] = line.split(/:(.*)/s);
            return { label: label.trim(), url: url.trim() };
        })

    return (
        <>
            <div className="container">
                <p>
                    This website draws inspiration from social media layouts and Notion's minimalist design.
                    Portfolios reflect who we are as individuals.
                    I want to create websites that are creative and engaging for users.
                </p>
                <p>
                    It is mildly ironic considering the design of my portfolio, but there is a quote from a <a href="https://www.youtube.com/watch?v=9KdP2idt6LE">JetBrains showcase</a> I enjoy:
                </p>
                <blockquote cite="https://www.youtube.com/watch?v=9KdP2idt6LE">
                    It does kind of remind me of something that a designer once said to me when they were talking about their job and they said, "I arrange rectangles." And they followed it up with, "Sometimes, if I want to get fancy, I round the corners."
                    <br></br><br></br>
                    But I am wondering if maybe we've gone too far and all of our UIs now are kind of boring.
                </blockquote>
                <p>
                    As AI creates and develops applications, I wonder if all of our websites will eventually become 'kind of boring' as well. Let humans design, with the help of AI.
                </p>
                <hr></hr>
                <h2>Credits</h2>
                <p>If you are interested in where my images comes from:</p>
                <ul>
                    {creditItems.map((credit) => (
                        <li key={credit.url}>
                            {credit.label}: <a href={credit.url}>{credit.url}</a>
                        </li>
                    ))}
                </ul >
            </div>
        </>
    );
}
