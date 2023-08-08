async function loadProjects() {
    const fileContainer = document.getElementsByClassName("file-wrapper")[0]
    const a = await fetch("/api/projects")
    const b = await a.json()

    b.data.forEach(function(e) {
        const project = document.createElement("a")
        project.className = "project"
        project.innerHTML = e.name
        project.href = `/projects/${e.name}`
        fileContainer.append(project)
    })
}