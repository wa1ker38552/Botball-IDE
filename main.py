import requests
import base64
import flask
import json

app = flask.Flask(__name__)

@app.route('/')
def app_index():
    return flask.render_template('index.html')

@app.route('/projects/<project_name>')
def app_project(project_name):
    return flask.render_template('project.html')

@app.route('/projects/<project_name>/<file_name>')
def app_project_file(project_name, file_name):
    return flask.render_template('project_file.html')

@app.route('/api/projects')
def api_projects():
    request = requests.get('http://192.168.125.1:8888/api/projects/Default%20User')
    return {'data': request.json()['projects']}

@app.route('/api/projects/<project_name>')
def api_project_files(project_name):
    request = requests.get(f'http://192.168.125.1:8888/api/projects/Default%20User/{project_name}')
    return request.json()

@app.route('/api/projects/<project_name>/<file_name>/content')
def api_project_file_content(project_name, file_name):
    request = requests.get(f'http://192.168.125.1:8888/api/fs/home/kipr/Documents/KISS/Default%20User/{project_name}/{flask.request.args.get("type")}/{file_name}').json()
    request['content'] = base64.b64decode(request['content'].encode('ascii')).decode('ascii')
    return request

@app.route('/api/projects/<project_name>/<file_name>/save', methods=['POST'])
def api_project_file_save(project_name, file_name):
    utf = json.loads(flask.request.data.decode('utf-8'))['content']
    b64 = base64.b64encode(utf.encode('ascii')).decode('ascii')
    request = requests.put(f'http://192.168.125.1:8888/api/fs/home/kipr/Documents/KISS/Default%20User/{project_name}/{flask.request.args.get("type")}/{file_name}',
                           json={'content': b64, 'encoding': 'ascii'})
    if request.status_code == 204:
        return {'success': True}
    else:
        return {'success': False}

@app.route('/api/projects/<project_name>/compile')
def api_project_compile(project_name):
    request = requests.post('http://192.168.125.1:8888/api/compile',
                            json={'name': project_name, 'user': 'Default User'})
    return request.json()

@app.route('/api/projects/<project_name>/run')
def api_project_run(project_name):
    request = requests.post('http://192.168.125.1:8888/api/run',
                            json={'name': project_name, 'user': 'Default User'})
    return request.json()

@app.route('/api/projects/<project_name>/stop')
def api_project_stop(project_name):
    request = requests.delete('http://192.168.125.1:8888/api/run/current')
    return request.json()

app.run()
