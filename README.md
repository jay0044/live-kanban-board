# 📋 Live Collaborative Kanban Board

## 🚀 Project Overview

This is a Live Collaborative Kanban Board built using React and Redux Toolkit.
The application allows users to manage tasks across multiple columns with real-time simulation, drag-and-drop functionality, and optimized performance for large datasets.

---

## 🛠 Tech Stack

* React (Frontend UI)
* Redux Toolkit (State Management)
* JavaScript (ES6+)
* localStorage (Persistence)
* HTML5 Drag & Drop API

---

## 🧠 Core Features

### 1. Drag & Drop

* Implemented using native HTML5 Drag API (no external libraries)
* Supports moving cards across columns
* Handles empty column drops and edge cases

---

### 2. State Management

* Global state managed using Redux Toolkit
* Normalized data structure (columns + cards)
* Undo/Redo implemented using past/present/future pattern
* State persisted in localStorage

---

### 3. Performance Optimization

* Used React.memo to prevent unnecessary re-renders
* Avoided prop drilling using centralized store
* Implemented custom virtualization (render limited visible cards)
* Tested with 100+ cards

---

### 4. Real-time Simulation

* Simulated another user using setInterval (every 10 seconds)
* Random card movement across columns
* Conflict detection when user is dragging
* Conflict UI shown with auto-hide

---

### 5. Search & Filter

* Debounced search (300ms)
* Multi-label filtering (Bug, Urgent)
* URL synchronization (?labels=bug,urgent)
* Highlight matching text in cards

---

### 6. Optimistic UI + Error Handling

* UI updates instantly before confirmation
* "Error Mode" simulates API failure
* Automatic rollback using undo logic

---

### 7. Accessibility

* Keyboard navigation support
* ARIA roles (list, listitem)
* Focusable cards

---

### 8. Theme Support

* Light/Dark mode using CSS variables
* Persisted in localStorage
* No flash on reload

---

### 9. Card Detail Modal

* Click card to open editable modal
* Inline editing using contentEditable

---

## 📦 Folder Structure

src/
│── components/
│   ├── Board.jsx
│   ├── Column.jsx
│   ├── Card.jsx
│   └── SearchBar.jsx
│
│── store/
│   ├── boardSlice.js
│   └── store.js
│
│── utils/
│   └── localStorage.js
│
│── App.js

---

## ⚡ Installation

```bash
npm install
npm start
```

---

## 🧪 How to Test

* Drag cards between columns
* Press Ctrl + Z → Undo
* Press Ctrl + Y → Redo
* Enable "Error Mode" → simulate failure
* Use search & filter
* Switch theme
* Observe real-time movement every 10s

---

## 🎯 Key Highlights

* No external drag-drop libraries used
* Fully controlled state architecture
* Optimized for performance
* Clean and scalable code structure

---

## 👨‍💻 Author

Jay Parmar

# 📋 Live Kanban Board

👉 [Live Demo](https://kanban-board-jay.netlify.app)
👉 [GitHub Repository](https://github.com/jay0044/live-kanban-board)
