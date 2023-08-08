async function getFileContent(type, projectName, projectFile) {
    const a = await fetch(`/api/projects/${projectName}/${projectFile}/content?type=${type}`)
    const b = await a.json()
    document.getElementById("codeArea").value = b.content
}

async function compileFromFunction(projectName) {
    const a = await fetch(`/api/projects/${projectName}/compile`)
    const b = await a.json()
    return b
}

async function toggleProgram() {
    const projectName = window.location.href.split("/")[4]
    const toggleButton = document.getElementById("toggleButton")
    const terminalStatus = document.getElementById("terminalStatus")
    const terminalOutput = document.getElementById("terminalOutput")
    terminalStatus.className = "terminal-status"
    if (toggleButton.innerHTML == "Run") {
        const a = await fetch(`/api/projects/${projectName}/run`)
        const b = await a.json()
        terminalStatus.innerHTML = "Runner"
        terminalOutput.innerHTML = ""
        toggleButton.innerHTML = "Stop"
        toggleButton.className = "failure-save"
    } else {
        const a = await fetch(`/api/projects/${projectName}/stop`)
        const b = await a.json()
        toggleButton.innerHTML = "Run"
        toggleButton.className = ""
    }
}

function compileProgram() {
    document.getElementById("compileButton").className = "in-progress"
    document.getElementById("saveButton").className = "in-progress"
    const projectName = window.location.href.split("/")[4]
    const projectFile = window.location.href.split("/")[5]
    const saveButton = document.getElementById("saveButton")

    fetch(`/api/projects/${projectName}/${projectFile}/save?type=${type}`, {
        method: "POST",
        body: JSON.stringify({"content": document.getElementById("codeArea").value})
    })
        .then(response => response.json())
        .then(response => {
            saveButton.classList.remove("in-progress")
            if (response.success) {
                saveButton.classList.add("success-save")
            } else {
                saveButton.classList.add("failure-save")
            }
        })
        .then(response => {
            compileFromFunction(projectName)
                .then(x => {
                    document.getElementById("compileButton").classList.remove("in-progress")
                    const terminalStatus = document.getElementById("terminalStatus")
                    const terminalOutput = document.getElementById("terminalOutput")
                    if (x.result.stderr != "") {
                        terminalStatus.innerHTML = "Compilation Failed"
                        terminalStatus.className = "terminal-status failure-save"
                        terminalOutput.innerHTML = x.result.stderr.replaceAll("\n", "<br>")
                    } else {
                        terminalStatus.innerHTML = "Compilation Succeeded"
                        terminalStatus.className = "terminal-status success-save"
                        terminalOutput.innerHTML = "Compilation Succeeded"
                    }
                })
        })
}

function saveProgram() {
    document.getElementById("saveButton").className = "in-progress"
    const projectName = window.location.href.split("/")[4]
    const projectFile = window.location.href.split("/")[5]

    fetch(`/api/projects/${projectName}/${projectFile}/save?type=${type}`, {
        method: "POST",
        body: JSON.stringify({"content": document.getElementById("codeArea").value})
    })
        .then(response => response.json())
        .then(response => {
            document.getElementById("saveButton").classList.remove("in-progress")
            if (response.success) {
                document.getElementById("saveButton").classList.add("success-save")
            } else {
                document.getElementById("saveButton").classList.add("failure-save")
            }
        })
}

var type = "src"
window.onload = async function() {
    const projectName = window.location.href.split("/")[4]
    const projectFile = window.location.href.split("/")[5]

    loadProjectFiles()
        .then(x => {
            for (e of document.getElementsByClassName("file-wrapper")[1].children) {
                if (e.innerHTML == projectFile.replaceAll("%20", " ")) {
                    e.classList.add("selectedProject")
                }
            }
            for (e of document.getElementsByClassName("file-wrapper")[2].children) {
                if (e.innerHTML == projectFile.replaceAll("%20", " ")) {
                    e.classList.add("selectedProject")
                }
            }

            let includeFileNames = []
            try {x.include_files.forEach(function(e) {includeFileNames.push(e.name)})}
            catch (Exception) {}

            if (includeFileNames.includes(projectFile)) {type = "include"}
            getFileContent(type, projectName, projectFile)
        })
}