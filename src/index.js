let paramName = "p";

let paths = [
    { path: "", id: "route_home" },
    { path: "spaceship", id: "route_spaceship" },
    { path: "contact", id: "route_contact" },
    { path: "projects", id: "route_projects" },
    { path: "links", id: "route_links" },
    { path: "theory", id: "route_theory" },
    { path: "donate", id: "route_donate" },
];

function ChangeRoute(routeName)
{
    let route = paths.find(n => n.path === routeName);

    if (route !== null)
    {            
        if ('URLSearchParams' in window) {
            const searchParams = new URLSearchParams(window.location.search)
            searchParams.set(paramName, routeName);
            history.pushState(null, '',  window.location.pathname + '?' + searchParams.toString());
        }

        // TODO: Iterating through route twice, do fix
        ReadRoute();
        
        return;
    }

    console.error(`Could not find route ${routeName}`);
}

function ReadRoute()
{
    const params = new URLSearchParams(window.location.search)
    const routeName = params.has(paramName) ? params.get(paramName) : "";

    paths.forEach(p => {        
            const el = document.getElementById(p.id);
            // Activate current and de-activate all others
            if (el !== null)
                el.style.display = p.path === routeName ? "block" : "none";
    });
    
}

document.addEventListener('DOMContentLoaded', ReadRoute, false);