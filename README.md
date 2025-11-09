# PartTimePro — Portfolio Site

This is a small static portfolio site showcasing part-time roles and projects. It uses Tailwind via CDN and simple static HTML pages.

Quick start (Windows / PowerShell):

```powershell
# from repo root
python -m http.server 8000
# open http://localhost:8000/pages/index.html
```

What I added recently:
- Dark mode toggle (persisted in localStorage)
- Design cleanup and new pages: About, Projects, Testimonials
- Shared stylesheet: `assets/css/styles.css`
- SEO/meta, favicon, manifest, sitemap, robots

Optional steps you should run locally:
- Transcode the main video to a web-optimized WebM/MP4 using ffmpeg (example below).
- Replace the Formspree endpoint in `pages/contact.html` form action with your actual endpoint.

FFmpeg example to create 720p mp4 & webm (run locally):
```powershell
ffmpeg -i "Partimepro.online.mp4" -c:v libx264 -preset slow -crf 24 -c:a aac -b:a 128k -vf "scale=1280:-2" media/Partimepro_720.mp4
ffmpeg -i "Partimepro.online.mp4" -c:v libvpx-vp9 -b:v 0 -crf 32 -c:a libopus -vf "scale=1280:-2" media/Partimepro_720.webm
```

CI / Deploy (template)
- A GitHub Actions workflow is provided at `.github/workflows/deploy.yml` that can be adapted to deploy to GitHub Pages.

Run the link-checker locally (optional):
```powershell
python tools/link_checker.py pages/index.html
```
