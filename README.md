# Gate Pass System — TPL

A modern React + Tailwind CSS gate pass management UI for Tamilnadu Petroproducts Limited.

## Project Structure

```
src/
├── main.jsx                  # Entry point
├── App.jsx                   # Root component, routing logic
├── index.css                 # Global styles + CSS variables
├── components/
│   ├── Navbar.jsx            # Sticky top navigation with dropdown
│   └── FormComponents.jsx    # Reusable form primitives
└── pages/
    ├── LoginPage.jsx         # Login screen (hardcoded: admin/admin123)
    ├── HomePage.jsx          # Dashboard with stats + quick access cards
    ├── PreApprovalPass.jsx   # Pre-Approval Pass form (Image 1)
    └── VisitorPass.jsx       # Visitor Pass form with materials table (Image 2)
```

## Setup & Run

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Login

- **Username:** admin
- **Password:** admin123

## Adding Dropdown Values

All dropdowns have placeholder `<option>` items. Search for the comments
`{/* Add your ... here */}` in these files and replace/add options:

| File                  | Dropdowns to fill                          |
|-----------------------|--------------------------------------------|
| PreApprovalPass.jsx   | Department Code, Visitors Type             |
| VisitorPass.jsx       | Department, Pre-Approval Pass No, Visitor Type, Safety Slogan |

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- Google Fonts: DM Sans + Playfair Display
- Zero external UI libraries
