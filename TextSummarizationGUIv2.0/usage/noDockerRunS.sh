#!/bin/bash

# Change directory to the client folder
cd ../client

# Run npm run start in a new terminal window
echo "Running npm run start in client folder..."
gnome-terminal -- bash -c "npm run start"

# Wait for a moment to allow the client to start

# Change directory to the server folder
cd ../server

# Install Python dependencies from requirements.txt if not installed
echo "Installing Python dependencies from requirements.txt..."
pip install --no-cache-dir -r requirements.txt

# Run additional commands for NLTK
echo "Running additional commands for NLTK..."
python -c "import nltk; nltk.download('punkt')"

# Change directory back to the Main folder
cd ..

# Change directory to the usage folder
cd usage

# Run app.py using Python in a new terminal window
echo "Running app.py in usage folder..."
gnome-terminal -- bash -c "python ../server/app.py"

echo "To shut down the services, simply close down the terminal windows."