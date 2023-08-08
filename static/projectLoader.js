function highlightSelectedProject(projectName, fileWrapper) {
    loadProjects()
        .then(x => {
            for (e of fileWrapper.children) {
                if (e.innerHTML == projectName.replaceAll("%20", " ")) {
                    e.classList.add("selectedProject")
                }
            }
        })
}

async function loadProjectFiles() {
    const projectName = window.location.href.split("/")[4]
    const fileWrapper = document.getElementsByClassName("file-wrapper")[0]
    highlightSelectedProject(projectName, fileWrapper)

    a = await fetch("/api/projects/"+projectName)
    b = await a.json()

    b.source_files.forEach(function(e) {
        const project = document.createElement("a")
        project.className = "project"
        project.innerHTML = e.name
        project.href = `/projects/${projectName}/${e.name}`
        document.getElementById("sourceFileWrapper").append(project)
    })

    try {
        b.include_files.forEach(function(e) {
            const project = document.createElement("a")
            project.className = "project"
            project.innerHTML = e.name
            project.href = `/projects/${projectName}/${e.name}`
            document.getElementById("includeFileWrapper").append(project)
        })
    } catch (Exception) {}
    return b
}