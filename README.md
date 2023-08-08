# Botball-IDE
A custom IDE for running programs on the wombat for Botball

The entire thing runs on Flask and uses KIPR's API to save, compile, and run code. Everything else is done by me. Thanks to Branden McDorman for helping figure out some of the encoding used in the IDE to send files. Althogh it currently lacks alot of features on the real IDE, it has a cleaner look and preforms much faster than the old one. You can currently save, compile, edit, run, code on this custom IDE. You can also view all your existing projects. However, you cannot create new files or projects. Additionally, I removed users completely because I thought the feauture was kind of obsolete. 

This IDE is much faster than running it regularly because it is hosted on your own computer rather than the wombat which is just a modified rasberry pi. It only sends requests to the wombat to modify code and doesn't need to render any html or javascript. Furthermore, it compiles and saves much faster because it only makes one request to the wombat for each action. 

Terminal does not work, it can't display anything you print becuase I have no idea how that works. If anyone could help me figure that out it would be extremely helpful.

Roadmap:
- Creating projects/files
- ~~Syntax highlighting for code editor (in-progress)~~ ✓
- Working terminal
- Code completion
- Cache data from API calls

**Getting Started**
1. The only things you need to install are `flask` and `requests` (flask may already be downloaded)
2. Connect your wifi to the wombat's connection, without connecting it won't work
3. Run `main.py` and click the link where it shows the application is being hosted
4. The IDE should be running at that link.

Uses a locally hosted version of Highlight.js to format the IDE, [highlight.js](https://highlightjs.org/)

![image](https://github.com/wa1ker38552/Botball-IDE/assets/100868154/97f70fd0-e948-47f1-bdda-e0a00d7d4b53)
