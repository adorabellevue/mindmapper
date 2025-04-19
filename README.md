# ✨ Text-to-MindMap AI ✨

A minimal, interactive web app that turns your natural language prompts into visual **mind maps** using Gemini AI. Built with **Next.js** and **React Flow**.

## ✨ Features

- 💬 **Natural Language Input** – Type anything you'd like to visualize  
- 🧠 **AI-Powered Diagram Generation** – Your ideas are automatically organized into a clean visual hierarchy  
- 🌳 **Interactive and Customizable Mind Maps** – Drag to reposition nodes and pan around your ideas with ease  
- 📤 **Export Options** – Save your mind map as a high-quality PNG or SVG  
- 🕓 **History Sidebar** – View and reopen your past prompts  

## 🚀 Getting Started

```pwsh
# Clone this repo
git clone https://github.com/adorabellevue/techlab.git
cd techlab

# Install dependencies
npm install

# Add your Gemini API key to a .env.local file
"GEMINI_API_KEY=your-api-key-here" | Out-File -Encoding ascii .env.local

# Run the development server
npm run dev