function updateLines() {
  const parent = document.getElementById("lineCounterContainer")
  parent.innerHTML = ""
  let x = 1
  document.getElementById("codeArea").value.split("\n").forEach(function(a) {
    const e = document.createElement("div")
    e.innerHTML = x
    x += 1
    parent.append(e)
  })
}

function highlight() {
  document.getElementById("highlightArea").innerHTML = document.getElementById("codeArea").value.replaceAll("<", "&lt;").replaceAll(" ", "&nbsp;")
  updateLines()
  hljs.highlightAll()
}

const doubleKeys = ["'", '"', "{", "(", "["]
const oppositeDoubleKeys = ["'", '"', "}", ")",  "]"]
function setupHighlighting() {
  const codeArea = document.getElementById("codeArea")
  const highlightArea = document.getElementById("highlightArea")
  const lineCounterContainer = document.getElementById("lineCounterContainer")

  codeArea.addEventListener('keydown', function(e) {
    if (e.key == 'Tab') {
      e.preventDefault()
      var start = this.selectionStart
      var end = this.selectionEnd

      // use 4 spaces for indenting
      this.value = this.value.substring(0, start)+
        "    "+this.value.substring(end)

      this.selectionStart =
        this.selectionEnd = start+4

      highlight()
    } else if (doubleKeys.includes(e.key)) {
      e.preventDefault()
      var start = this.selectionStart
      var end = this.selectionEnd

      this.value = this.value.substring(0, start)+e.key+oppositeDoubleKeys[doubleKeys.indexOf(e.key)]+this.value.substring(end)

      this.selectionStart = start+1
      this.selectionEnd = start+1

      highlight()
    }
  })

  codeArea.addEventListener("scroll", function(e) {
    highlightArea.scrollTop = codeArea.scrollTop
    highlightArea.scrollLeft = codeArea.scrollLeft
    lineCounterContainer.scrollTop = codeArea.scrollTop
  })
}