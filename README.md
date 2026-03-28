# Lexia Learn

**Lexia Learn** is an integrated platform for cognitive assessment tests. It combines a robust Node.js API, a Flask-based eye‑tracking microservice, and a frontend client to provide a complete solution for dyslexia‑related evaluations.

## 🧠 Project Overview

This project helps assess cognitive abilities through:
- **Eye tracking** 
- **Handwriting analysis** 
- **Statistical reasoning tests**
- **User management** with profiles and follow system

The platform is split into three main parts:

| Component | Technology | Repository |
|-----------|------------|------------|
| **Node.js Backend** | Express, MongoDB, JWT | [GP_node_server](https://github.com/sayed4900/GP_node_server) |
| **Flask Eye‑Tracking Server** | Flask, TensorFlow, Keras | [GP_flask_server](https://github.com/sayed4900/GP_flask_server) |
| **Frontend Client** | (Your frontend code) | Located in the `client/` folder |

## 📁 Project Structure

lexia-learn/
├── Backend Code/
│ ├── server_node/ # Node.js backend (submodule)
│ └── flask_server/ # Flask eye‑tracking server (submodule)
├── client/ # Frontend application
└── README.md # This file
