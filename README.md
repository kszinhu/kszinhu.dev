<a name="readme-top"></a>

[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![CC License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Portfolio</h3>

  <p align="center">
    This is my portfolio website and contains my dotfiles and other configuration files
    <br />
    <a href="https://github.com/kszinhu/portfolio"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://kszinhu.dev.br">View deployed site</a>
    ·
    <a href="https://github.com/kszinhu/portfolio/issues">Report Bug</a>
    ·
    <a href="https://github.com/kszinhu/portfolio/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Screen Shot][portfolio-screenshot]](https://kszinhu.dev.br)

This repository serves as a central hub for showcasing my skills, experience, and projects. Here you will find my resume, configuration files (dotfiles), and a display of my projects.

<p align="right">[<a href="#readme-top">back to top</a>]</p>

### Built With

- [![React][React.js]][React-url]
- [![Next][Next.js]][Next-url]
- [![Mantine][Mantine]][Mantine-url]
- [![TypeScript][TypeScript]][TypeScript-url]
- [![i18next][i18next]][i18next-url]

<p align="right">[<a href="#readme-top">back to top</a>]</p>

<!-- GETTING STARTED -->

## Getting Started

1. Clone the repo

> HTTPS

```sh
git clone https://github.com/kszinhu/portfolio.git
```

> SSH

```sh
git clone git@github.com:kszinhu/portfolio.git
```

### Prerequisites

- Node 18 or higher
  1. Install NodeJS from [NodeJS Official Page](https://nodejs.org/en/download/)
  2. Open Terminal
  3. Check Current NodeJS Version
  ```sh
  node -v
  ```

### Installation

1. Install Dependencies

```sh
npm ci
```

2. Run the app

```sh
npm run dev
```

### Docker

This project can be run using Docker. To do so, follow the steps below:

1. Enter Port number in `.env` file

```sh
PORT=3000 # Change to desired port
```

2. Build the image

```sh
docker compose -f docker-compose.local.yml build
```

3. Run the container

```sh
docker compose -f docker-compose.local.yml up
```

<p align="right">[<a href="#readme-top">back to top</a>]</p>

<!-- ROADMAP -->

## Roadmap

> This project is still in development. The following features are planned to be implemented:

### Documentation

- [ ] Add Changelog

### Features

- [x] Create CI/CD pipeline
- [ ] Multi-language support
  - [x] English
  - [x] Portuguese
  - [ ] Spanish
- [ ] Add custom 404 page
- [ ] Add configurations files
  - [ ] VSCode settings and extensions

See the [open issues](https://github.com/kszinhu/portfolio/issues) for a full list of proposed features (and known issues).

<p align="right">[<a href="#readme-top">back to top</a>]</p>

<!-- LICENSE -->

## License

Distributed under the Creative Commons Zero v1.0 Universal License. See `LICENSE` for more information.

<p align="right">[<a href="#readme-top">back to top</a>]</p>

<!-- CONTACT -->

## Contact

Cassiano Rodrigues - [@kszinhu](https://twitter.com/kszinhu) - kszinhu@modscleo4.dev.br

<p align="right">[<a href="#readme-top">back to top</a>]</p>

<!-- MARKDOWN LINKS & IMAGES -->

[stars-shield]: https://img.shields.io/github/stars/kszinhu/portfolio.svg?style=for-the-badge
[stars-url]: https://github.com/kszinhu/portfolio/stargazers
[issues-shield]: https://img.shields.io/github/issues/kszinhu/portfolio.svg?style=for-the-badge
[issues-url]: https://github.com/kszinhu/portfolio/issues
[license-shield]: https://img.shields.io/github/license/kszinhu/portfolio.svg?style=for-the-badge
[license-url]: https://github.com/kszinhu/portfolio/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/kszinhu
[portfolio-screenshot]: .github/images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Mantine]: https://img.shields.io/badge/mantine-303030?style=for-the-badge&logo=mantinedotdev&logoColor=white
[Mantine-url]: https://mantine.dev/
[TypeScript]: https://img.shields.io/badge/typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[i18next]: https://img.shields.io/badge/i18next-0D1117?style=for-the-badge&logo=i18next&logoColor=white
[i18next-url]: https://www.i18next.com/
