# Anjor Misser – Portfolio

A responsive personal portfolio showcasing my projects, skills, education and contact details. Built for the Saiket internship.

**Live site:** https://anjor-portfolio.onrender.com 

## Features

- Light and dark theme: follows your OS setting and remembers your choice
- Mobile navigation menu with active-section highlighting
- Scroll-reveal animations (turned off for users who prefer reduced motion)
- Contact form with friendly validation that opens your email app to send
- Downloadable CV
- Accessible by design: semantic HTML, ARIA labels, keyboard support (Esc closes the menu)

## Sections

Home · About · Skills · Projects · Education · Contact

## Projects showcased

| Project | Stack |
|---|---|
| [LocalLens](https://github.com/Pumpkin280205/LocalLens) | Kotlin, Android Studio, news API |
| [BookScout](https://github.com/Pumpkin280205/BookScout-App) | Kotlin, Android Studio, books API |
| [HustleHub+](https://github.com/Pumpkin280205/HustleHub-Plus) | MongoDB, Express, React, Node.js |
| [Staff Attendance and Break Management System](https://github.com/Pumpkin280205/WIL-AFCON-Development) | C#, ASP.NET Core MVC, EF Core, MongoDB Atlas |

## Built with

HTML, CSS (custom properties, grid, flexbox) and vanilla JavaScript. No frameworks or build step. Fonts: Inter and Poppins via Google Fonts.

## Project structure

```
Portfolio/
├── index.html
├── css/style.css
├── js/script.js
├── images/profile.jpg
├── assets/CV.pdf
└── README.md
render.yaml        # Render static site config
```

## Deployment

Hosted as a static site on [Render](https://render.com). `render.yaml` publishes the `Portfolio` folder and adds an `X-Content-Type-Options: nosniff` header. Pushing to `main` redeploys the site.

## Contact

- Email: anjor.misser@gmail.com
- GitHub: [Pumpkin280205](https://github.com/Pumpkin280205)
- LinkedIn: [Anjor Misser](https://www.linkedin.com/in/anjor-misser-1284bb363)
