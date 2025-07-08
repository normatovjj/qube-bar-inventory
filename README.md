# Bar Inventory Management Tool

A lightweight, mobile-first web application designed to dramatically speed up the end-of-shift inventory process for bar and restaurant staff. Saves ~30 hours of labour per month (20-30 minutes per shift). 

---

## 💡 The Problem

In many bars and restaurants, the end-of-shift inventory process is a tedious, manual task. Staff must write down counts for dozens of items on a piece of paper, a process that is slow, prone to errors, and frustrating. I experienced this inefficiency firsthand and saw that it wasted **20-30 minutes of valuable time every single shift.**

## ✅ The Solution

This application digitises and streamlines the entire workflow. It provides a simple, fast, and intuitive interface that allows staff to rapidly log inventory counts directly on their mobile phones. The core focus is on speed and ease of use in a fast-paced environment. The result is a significant reduction in time spent on administrative tasks and a major boost in team morale.

## ✨ Key Features

*   **Intuitive Category Navigation:** Quickly switch between product categories (Drinks, Syrups, Tea, etc.) with a single tap.
*   **Mobile-First Design:** Built for on-the-go use on any mobile device.
*   **Automatic Data Saving:** All entries are automatically saved to the browser's local storage, preventing any loss of work.
*   **Simple Reset Functionality:** Clear a category's entries with a single confirmation click to start fresh for the next shift.
*   **Embedded Notes:** Add comments or notes for the next shift (e.g., "Order more tonic water").

## 🛠️ Tech Stack & Architectural Decisions

This project was intentionally built with **Vanilla JavaScript, HTML, and CSS** to ensure:
*   **🚀 Blazing Fast Performance:** The app loads instantly, even on weak network connections.
*   **🗑️ Minimal Footprint:** The entire application is less than 20KB, compared to a ~500MB React equivalent (including `node_modules`).
*   **🚫 Zero Dependencies:** This increases stability and removes the need for maintenance or framework updates.

| Technology | Description |
|------------|-------------|
| HTML5      | Semantic structure for content. |
| CSS3       | Custom styling and responsive design. |
| JavaScript (ES6+) | Core application logic and DOM manipulation. |
| localStorage | Browser-based storage for data persistence. |

## 🚀 How to Use

No installation is needed.
1.  Open `index.html` in any modern web browser.
2.  Use the application to track your inventory. All data is saved automatically in your browser.

## 📈 Future Roadmap (Potential Improvements)

*   Basic data visualization to track consumption trends over time.
*   Cloud synchronization for multi-user/multi-device access.
