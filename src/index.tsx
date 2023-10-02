import {createRoot} from "react-dom/client";
import {ReactElement, StrictMode, SyntheticEvent, useEffect, useState} from "react";
import {$, $$, Cookies} from "./functions";

import SyntaxHighlighter from "react-syntax-highlighter";
import {default as GithubStyle} from "react-syntax-highlighter/dist/esm/styles/hljs/github";
import {default as GithubDarkStyle} from "react-syntax-highlighter/dist/esm/styles/hljs/gml";

import "./index.css";

type StateTuple<T> = [T, ((value: (((prevState: T) => T) | T)) => void)];

function swapDarkMode(darkMode: boolean): void {
    document.body.style.backgroundColor = darkMode ? "#ffffff" : "#282828";

    for (const elem of $$("h1:not([class^=\"hoverHyperLink\"]), h2, h3, h4, h5, h6, p"))
        (elem as HTMLElement).style.color = darkMode ? "#000000" : "#ffffff";

    for (const marker of $$("ul li"))
        (marker as HTMLElement).classList[darkMode ? "remove" : "add"]("liWhiteBullets");

    $$("footer").item(0).classList[darkMode ? "remove" : "add"]("darkQuoteBackground");

    $$("blockquote").item(0).classList[darkMode ? "remove" : "add"]("darkQuoteBackground", "darkText");
}

function App(): ReactElement {

    const [darkMode, setDarkMode]: StateTuple<boolean> = useState<boolean>(Cookies.get("dark-mode") === "true");

    useEffect((): () => void => {
        const possibleTitles: string[] = [
            "JavaScript Foundations: A Prerequisite for Asking Questions",
            "Master JavaScript Basics: Ask Better Questions",
            "Before You Ask: Learn JavaScript Fundamentals",
            "JavaScript Proficiency: Enhance Your Inquiries",
            "Unlocking JavaScript: The Key to Informed Questions",
            "Building a Strong Foundation: Learn JavaScript First",
            "JavaScript Essentials: Ask with Confidence",
            "Level Up Your Questions: Learn JavaScript",
            "JavaScript Primer: Ask Smarter, Get Better Answers",
            "Empower Your Queries: Learn JavaScript"
        ];

        let index: number = 0;
        const interval: NodeJS.Timer = setInterval((): void => {
            document.title = possibleTitles[++index > possibleTitles.length - 1 ? (index = 0) : index];
        }, 3000);

        function sdmV(): void {
            Cookies.createOrRewrite("dark-mode", `${!(Cookies.get("dark-mode") === "true")}`, { expires: 10, secure: true, sameSite: "Strict" });
            setDarkMode(Cookies.get("dark-mode") === "true");
            sdm();
        }

        function sdm(): void {
            swapDarkMode(darkMode);
        }

        const swapDarkModeButton: HTMLButtonElement = $("darkModeButton");
        swapDarkModeButton.addEventListener("click", sdmV);

        sdm();

        return () => {
            clearInterval(interval);
            swapDarkModeButton.removeEventListener("click", sdmV);
        };
    }, [darkMode]);

    async function copyElementHyperLink(event: SyntheticEvent): Promise<void> {
        const copiedUrl: string = `${window.location.protocol}//${window.location.host}/#${event.currentTarget.id}`;
        await navigator.clipboard.writeText(copiedUrl);
        window.location.href = copiedUrl;
    }

    return (<>
        <header>
            <h1>What is this?</h1>
            <p>
                If someone sent you to this page, you may have had a stupid question, or asked something you could easily find in <a href="https://www.google.com">google</a>. Or you maybe just didn't even understand your own code and they couldn't help you with it.
            </p>
            <br/>
            <p>The point being you don't know enough JavaScript to ask a formal question, so please... <b>Learn JavaScript.</b></p>
        </header>
        <section>
            <h1 id="howdoilearn" onClick={copyElementHyperLink} className="hoverHyperLink">How do I learn JavaScript?</h1>
            <p>
                Internet is full of guides, documentation... A lot of things for you to learn, most languages, libraries or programs that have a big
                user base also have documentation (and are pretty well documented), the first version of JavaScript was made in a week, but you can still
                find documentation for most of the stuff out there.
            </p>
        </section>
        <section>
            <p>Here are some learning sources you can use</p>
            <ul>
                <li>
                    <h4>Videos</h4>
                    <a href="https://www.youtube.com/watch?v=W6NZfCO5SIk">Beginners tutorial from Programming with Mosh.</a><br/>
                    <a href="https://www.youtube.com/watch?v=8dWL3wF_OMw">JavaScript full course by Bro Code.</a><br/>
                    <a href="https://www.youtube.com/watch?v=PkZNo7MFNFg">Free code camp beginners tutorial.</a><br/>
                </li>
                <li>
                   <h4>Official guides</h4>
                    <a href="https://developer.mozilla.org/en-US/">Mozilla developer documentation</a><br/>
                    <a href="https://www.w3schools.com/js/default.asp">W3 schools</a><br/>
                    <a href="https://javascript.info/">JavaScript.info</a>
                </li>
            </ul>
            <p>Here are sources to test your knowledge</p>
            <ul>
                <li><a href="https://www.hackerrank.com/">HackerRank</a></li>
                <li><a href="https://codeforces.com/">Codeforces</a></li>
                <li><a href="https://www.topcoder.com/">TopCoder</a></li>
                <li><a href="https://www.codewars.com/">Codewars</a></li>
                <li><a href="https://exercism.io/">Exercism</a></li>
                <li><a href="https://projecteuler.net/">Project Euler</a></li>
                <li><a href="https://www.spoj.com/">Spoj</a></li>
                <li><a href="https://www.codechef.com/">CodeChef</a></li>
                <li><a href="https://atcoder.jp/">AtCoder</a></li>
                <li><a href="https://leetcode.com/">LeetCode</a></li>
            </ul>
        </section>
        <section>
            <p>
                Real life projects are also a good way to improve your skills,
                to get started with that, there is a github repository called <a href="https://github.com/Asabeneh/30-Days-Of-JavaScript">30 days of javascript</a> made by Asabeneh.
            </p>
            <br/>
            <p>The best programmers are also the best google searchers, you can get started with this <a href="https://support.google.com/websearch/answer/134479?hl=en">small guide</a> made by google.</p>
        </section>
        <section>
            <h1 id="doyoureallywanttoask" onClick={copyElementHyperLink} className="hoverHyperLink">You really want to ask for help? ok.</h1>
            <h2>What not to do?</h2>
            <h3>Don't ask or say the following things</h3>
            <ul>
                <li><p>I have this error, but I don't know what it means.</p></li>
                <li><p>I can send zip and send you my code in DM (or not even in dm).</p></li>
                <li><p>What's that? (and then send a obvious copied code that you don't understand).</p></li>
                <li><p>How to solve this? (and again send obvious copied code that you don't understand).</p></li>
            </ul>
            <h3>Don't do the following things</h3>
            <ul>
                <li><p>Don't ask the same in multiple channels, search for the help channel and ask once there.</p></li>
                <li><p>Don't ping staff or other members for help, wait for someone to answer, it's not their problem, it's yours.</p></li>
                <li><p>Don't send zips and pretend other's to open them (covered next in this guide).</p></li>
            </ul>
        </section>
        <section>
            <h2>What to do!</h2>
            <h3>Good practices to send your code to someone else</h3>
            <ul>
                <li>
                    <p>If your code isn't hosted in a git repository:</p>
                    <ul>
                        <li><p>You can use a paste site like <a href="https://pastebin.com/">pastebin</a>, <a href="https://controlc.com/">ControlC</a> or <a href="https://rentry.co/">ReEntry</a>.</p></li>
                        <li><p>You can also paste small portions of the code in discord <b>ALWAYS USING CODEBLOCKS</b>, refer to the <a href="https://www.technipages.com/discord-code-blocks/">following guide</a> for the codeblocks.</p></li>
                        <li><p>If you need your code to be tested by someone use sites like <a href="https://codepen.io/">code pen</a> or <a href="https://jsfiddle.net/">js fiddle</a>.</p></li>
                    </ul>
                </li>
                <li>
                    <p>Otherwise you can send a link to your remote git repository (with the exact code that gives the problem linked), you can use <a href="https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-a-permanent-link-to-a-code-snippet">this guide</a>.</p>
                </li>
            </ul>
            <h3>Avoid stupid questions</h3>
            <ul>
                <li><p>Search on your topic before asking, your question may have already been answered in some <a href="https://stackoverflow.com/">Stack Overflow</a> thread.</p></li>
                <li><p>If your problem is pretty general you can find it in the <a href="https://developer.mozilla.org/en-US/">official JavaScript documentation</a>.</p></li>
                <li><p>You can also maybe ask ChatGPT and try to reason yourself the problem with it, this topic is already discussed <a href="https://www.searchenginejournal.com/when-to-use-chatgpt-and-when-to-use-google/484883/">here</a>.</p></li>
                <li><p>If you are using a library maybe refer to the docs or a guide they may have first before asking.</p></li>
                <li><p>If you are going to copy and paste code, always send the source of such.</p></li>
            </ul>
        </section>
        <section>
            <h3>Learn about your error</h3>
            <p>Learn to retrieve data from your error and read the stack trace, know how to separate it</p>
        </section>
        <section>
            <p>Here is an example error:</p>
            <SyntaxHighlighter language="JavaScript" style={!darkMode ? GithubDarkStyle : GithubStyle}>
                {"An error occurred:\n" +
                    "TypeError: Cannot read property 'Symbol(Symbol.iterator)' of undefined\n" +
                    "    at performDivision (/path/to/your/code.js:2:12)\n" +
                    "    at Object.<anonymous> (/path/to/your/code.js:7:18)\n" +
                    "    at Module._compile (internal/modules/cjs/loader.js:1085:14)\n" +
                    "    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)\n" +
                    "    at Module.load (internal/modules/cjs/loader.js:950:32)\n" +
                    "    at Function.Module._load (internal/modules/cjs/loader.js:790:12)\n" +
                    "    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:76:12)\n" +
                    "    at internal/main/run_main_module.js:17:47"}
            </SyntaxHighlighter>
        </section>
        <section>
            <p>It basically tells us what the problem is at the first line in this case <i>"Cannot read property 'Symbol(Symbol.iterator)' of undefined"</i>. This first line is what we should search on google</p>
        </section>
        <section>
            <p>What is the stack trace?</p>
            <ul>
                <li><p>The stack trace is basically every step your code had to go trough to call the function that threw the error.</p></li>
                <li><p>The stack trace basically works from top being the closer to the function that threw to the bottom which is most likely runtime code.</p></li>
            </ul>
        </section>
        <section>
            <p>How to find where the error happened? (step by step)</p>
            <ul>
                <li><p>As mentioned earlier the top line is the closer to our code, so we must check in this case <i>"performDivision (/path/to/your/code.js:2:12)"</i> which is in the file /path/to/your/code.js in the line 2 character 12.</p></li>
                <li><p>If the error was thrown from a underlying function or handler we can use <a href="https://code.visualstudio.com/docs/editor/editingevolved">code navigation</a> or go to the next stack trace line.</p></li>
            </ul>
            <p>For more info on the Error object in JavaScript refer to <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error">this page</a> in MDN.</p>
        </section>
        <section>
            <p>When you know all of that, you can just ask a good question like:</p>
            <br/>
            <blockquote>
                "I have this error, I don't understand what it means by <i>"Symbol(Symbol.iterator)"</i>.<br/>
                I searched the following on google: <i>"Javascript Symbol.iterator"</i> but it didn't give me any result I could understand.<br/>
                The stack trace says it's on this line but here is the whole function anyways, and here are the definitions for the custom functions ran inside.<br/>
                &lt;insert definitions here&gt;"
            </blockquote>
        </section>
        <footer>
            <div>
                <p>Similar problems:</p>
                <ul>
                    <li><a href="https://xyproblem.info/">The XY problem</a></li>
                    <li><a href="https://nohello.net/">No hello</a></li>
                    <li><a href="https://stackoverflow.com/help/how-to-ask">How do i ask a good question?</a></li>
                    <li><a href="https://nometa.xyz/">No meta</a></li>
                </ul>
            </div>
            <div>
                <p>Star this in <a href="https://github.com/stifskere/LearnJsBeforeAsking">GitHub</a></p>
            </div>
        </footer>
        <button id="darkModeButton" className={darkMode ? "lightButtonIcon" : "darkButtonIcon"} style={{backgroundColor: darkMode ? "#313131" : "#868686"}} />
    </>);

}

createRoot($("root")).render(<StrictMode><App /></StrictMode>);
