# De Beer Collies & Chocolate Pups South Africa — Static Website

This is a complete static HTML/CSS/JavaScript website prepared for GitHub Pages.

## Pages included

- `index.html`
- `about.html`
- `puppies.html`
- `our-dogs.html`
- `gallery.html`
- `contact.html`
- `privacy.html`

## Asset folder structure

Images are grouped to make future updates easier:

```text
assets/images/
├── logos-and-fancy/
│   ├── logo-debeer.png
│   ├── logo-chocolate-pups.png
│   ├── hero-contact-left.jpg
│   ├── hero-contact-right.jpg
│   └── contact-visit.jpg
├── big-dogs/
│   ├── hero-home.jpg
│   ├── hero-about.jpg
│   ├── hero-puppies.jpg
│   ├── hero-our-dogs.jpg
│   ├── about-story.jpg
│   ├── about-family.jpg
│   ├── puppies-main.jpg
│   ├── dog-ranger.jpg
│   ├── dog-luna.jpg
│   ├── dog-maverick.jpg
│   ├── dog-willow.jpg
│   ├── footer-dogs.jpg
│   ├── gallery-04.jpg
│   ├── gallery-06.jpg
│   ├── gallery-07.jpg
│   └── gallery-10.jpg
├── border-collies/
│   ├── puppy-01.jpg
│   ├── puppy-02.jpg
│   ├── gallery-01.jpg
│   ├── gallery-03.jpg
│   └── gallery-09.jpg
└── australian-shepherds/
    ├── puppy-03.jpg
    ├── puppy-04.jpg
    ├── gallery-02.jpg
    ├── gallery-05.jpg
    └── gallery-08.jpg
```

## Replacing images later

Replace any placeholder image by keeping the exact same folder, filename and extension.

Example:

```text
assets/images/big-dogs/hero-home.jpg
```

Replace that file with your real hero image and keep it named exactly `hero-home.jpg`. The HTML and CSS will continue working without code changes.

## Recommended image sizes

These do not need to be exact, but they will help the design look close to the screenshots:

| Image type | Recommended size | Notes |
|---|---:|---|
| Hero images | 1400 × 850 px | Wide, landscape dog images |
| Contact side images | 700 × 700 px | Square or portrait-style cut-outs work well |
| Breed/dog cards | 900 × 750 px | Dog centered, soft background |
| Puppy cards | 900 × 750 px | Consistent crop across all puppies |
| Gallery images | 900 × 700 px | Landscape or square works well |
| Logos | 700 × 700 px PNG | Transparent PNG preferred |

## Functional static features

The website includes:

- Mobile menu
- Active navigation highlighting
- Puppy filters by breed and gender
- Puppy sorting by newest or oldest
- Puppy detail modal
- Our Dogs pedigree modal
- Gallery filters for All, Border Collies, Australian Shepherds and Puppies
- Gallery lightbox
- Basic contact form validation
- Web3Forms-ready contact form

## Web3Forms setup

Open `contact.html` and find:

```html
<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY_HERE">
```

Replace `YOUR_WEB3FORMS_ACCESS_KEY_HERE` with the access key from Web3Forms.

## GitHub Pages upload steps

1. Create a new GitHub repository.
2. Upload all files and folders from this project into the repository root.
3. Go to **Settings → Pages**.
4. Set the source to the `main` branch and root folder.
5. Save and wait for GitHub Pages to publish.

## Updating the sitemap

The sitemap currently uses:

```text
https://example.com/
```

When the final domain is ready, open `sitemap.xml` and replace `https://example.com/` with the real website domain.

## Notes

This is a fully static website. It does not use a backend, database, PHP, WordPress, Bootstrap, Tailwind, build tools or frameworks.
