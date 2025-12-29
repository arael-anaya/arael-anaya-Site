// js/seo.js
function upsertMeta(attrName, attrValue, content) {
    let el = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
    }

    function upsertLink(rel, href) {
    let el = document.head.querySelector(`link[rel="${rel}"]`);
    if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
    }
    el.setAttribute("href", href);
    }

    function upsertJsonLd(id, json) {
    let el = document.getElementById(id);
    if (!el) {
        el = document.createElement("script");
        el.type = "application/ld+json";
        el.id = id;
        document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(json);
    }

    function absoluteUrl(pathname) {
    // Works on localhost and on GitHub Pages, because it uses the real current origin.
    const url = new URL(window.location.href);
    url.hash = "";
    url.search = "";
    url.pathname = pathname || window.location.pathname;
    return url.toString();
    }

    export function applySEO(pageKey) {
    const pages = {
        home: {
        title: "Robotics Research Portfolio | Arael Anaya",
        description:
            "Robotics graduate student at Colorado School of Mines specializing in multi-agent systems, resilient consensus algorithms, ROS 2, and aerial swarm robotics."
        },
        research: {
        title: "Research | Arael Anaya",
        description:
            "Research in swarm robotics, resilient consensus algorithms (W-MSR), state estimation, and ROS 2 experimentation with Crazyflie platforms and motion capture."
        },
        projects: {
        title: "Projects | Arael Anaya",
        description:
            "Engineering and robotics projects spanning controls, autonomy, CAD/FEA, embedded systems, and experimental validation across hardware and simulation."
        },
        about: {
        title: "About | Arael Anaya",
        description:
            "About Arael Anaya, a robotics graduate student at Colorado School of Mines working on multi-agent control, aerial robotics, and real-world autonomy in ROS 2."
        },
        contact: {
        title: "Contact | Arael Anaya",
        description:
            "Contact Arael Anaya for robotics research, collaboration, and opportunities in multi-agent systems, controls, and aerial swarm experimentation."
        },
        favorites: {
        title: "Favorites | Arael Anaya",
        description: "A curated list of favorite books, music, movies, and creators.",
        robots: "noindex, nofollow"
        }
    };

    const cfg = pages[pageKey] || pages.home;

    // Title and description
    document.title = cfg.title;
    upsertMeta("name", "description", cfg.description);

    // Robots
    upsertMeta("name", "robots", cfg.robots || "index, follow");

    // Canonical
    upsertLink("canonical", absoluteUrl());

    // OpenGraph
    upsertMeta("property", "og:title", cfg.title);
    upsertMeta("property", "og:description", cfg.description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", absoluteUrl());

    // Twitter
    upsertMeta("name", "twitter:card", "summary");
    upsertMeta("name", "twitter:title", cfg.title);
    upsertMeta("name", "twitter:description", cfg.description);

    // Structured data: Person
    upsertJsonLd("ld-person", {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Arael Anaya",
        url: absoluteUrl("/index.html"),
        sameAs: ["https://www.linkedin.com/in/arael-anaya"],
        jobTitle: "Robotics Graduate Student",
        affiliation: {
        "@type": "CollegeOrUniversity",
        name: "Colorado School of Mines"
        }
    });
}
