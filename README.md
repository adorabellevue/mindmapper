# Mind Map Generator

A minimal, interactive web app that turns natural language prompts into visual, interactive mind maps using Gemini AI.  
Built with Next.js and React Flow.

## Features

- **Natural Language Input** – Type anything you'd like to visualize  
- **AI-Powered Diagram Generation** – Your ideas are automatically organized into a clean visual hierarchy  
- **Interactive and Customizable Mind Maps** – Drag to reposition nodes and pan around your ideas
- **Export Options** – Download your mind map as a PNG or SVG  
- **History Sidebar** – View and reopen your past diagrams

## Getting Started

1. Clone the repo:
```pwsh
git clone https://github.com/adorabellevue/techlab.git
cd techlab
```
2. Install dependencies:
```pwsh
npm install
```
3. Create a .env.local file and add your Gemini API key:
```pwsh
"GEMINI_API_KEY=your-api-key-here" | Out-File -Encoding ascii .env.local
```
4. Run the development server:
```pwsh
npm run dev
```
5. Open http://localhost:3000 in your browser to see the result.

<img width="934" alt="Image" src="https://github.com/user-attachments/assets/1d81a1e3-78a9-4211-b935-79772b29261c" />
