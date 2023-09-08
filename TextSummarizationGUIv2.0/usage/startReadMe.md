There are multiple ways of running the application

1. Download the project 'TextSummarizationGUI'
2. Extract the project from the zip file 
    - How to unzip .zip folders: https://asd.otit.fi/asd/unzip

1. Start up path - docker
    1.1 Download docker: 
    https://www.docker.com/products/docker-desktop/
    1.2 Set up docker as instructed by the docker desktop application. It may require you to enable virtualization from BIOS settings.
    1.3 Start up the docker application (this enables running the containers)
    
    To build the application you can run the build.bat (Windows) or build.sh (Linux) files or you can run the command 'docker-compose up --build' inside the project root directory: 'TextSummarizationGUI/' 
    (This also starts the application)
    
    To start the application you can run the startStop.bat (Windows) or startStop.sh (Linux)

    The application starts inside your web browser at these ports:
    http://localhost:3000 The GUI
    http://localhost:5000 The backend API (used for developement)

    To close the application
    you can run 'docker compose down'
    or delete the containers from the docker desktop app.
    or run the startStop.bat (Windows) or startStop.sh (Linux) scirpt.


2. Start up path - noDocker (requires node.js and Python installed on the computer)

    2.1. Download Node.js (node version 9.5.1 works but any newer version should work)
    https://nodejs.org/en/download

    2.1.1 run 'npm install' inside the client folder.
    'TextSummarizationGUI/client'

    2.2 Download Python 3.6 or newer (python 3.9 is used by the docker cluster)
    https://www.python.org/downloads/

    2.3 Download the NLP data https://www.nltk.org/data.html

    2.4. download the Python libraries: 
    pip install --no-cache-dir -r requirements.txt

    Manual Running:
    1. run 'npm start' inside the client folder.
    'TextSummarizationGUI/client'
    2. Inside the server folder run the app.py file
    'TextSummarizationGUI/server'
    3. with your web browser navigate to the GUI at:
    http://localhost:3000 The GUI
    http://localhost:5000 The backend API (used for developement)

    There is also a automated script that automates a lot of this:
    noDockerRunS.bat (Windows)
    noDockerRunS.sh (Linux)



3. OPTIONAL - The ROUGE analysis requires a GPT4ALL installation 
    3.1 The download link can be found here: https://gpt4all.io/index.html
    3.2 After installing the application and a model for it, enable the API server from the application settings.
    3.4 When starting the ROUGE analysis keep the gpt4All application open - the progress can be followed under the server chat.
    
