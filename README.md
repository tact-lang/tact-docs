
<img src="public/banner.jpeg">


# Welcome to Tact Documentation 🌈

Hello there! This is the community-driven repository for Tact Language Documentation.

Latest documentation is always available at: [docs.tact-lang.org](https://docs.tact-lang.org)

Our goal here is to create a welcoming and rich resource that benefits all Tact developers, from beginners to experts.

## Join the Tact Community 🌟

Tact is not just a technology; it's a growing community of developers like you! Whether you are just starting out or have tons of experience, your contributions are valuable.

Here's how you can contribute:

- Organize or clarify information 📝
- Make Pull Requests to improve the code or docs 🚀
- Share tutorials, guides, and articles 📚

Join our community chats to stay updated and collaborate:
* [Tact Telegram Community](https://t.me/tactlang)

## How Can You Contribute?

Contributing is not just encouraged; it's easy!

### Suggestions and new ideas

If you've solved a challenging problem or found a better way to explain a complex topic, share it:

— Got an idea? [Open an Issue](https://github.com/tact-lang/tact-docs/issues/new/choose).  
— Ready to contribute? [Set up your Development Environment](#set-up-your-development-environment).

## Translations

At the moment, only Chinese translations are accepted.

To add a new page, copy the existing one in English and add a `.zh` postfix after its name. For example, if the page is called `types.mdx`, copy it into the `types.zh.mdx` . Then, add the relevant info into the `_meta.zh.js` file (navigation on the left), which should be in the same folder as the modified page.

Note, that you should **not** modify the folder structure or copy-paste folders.

## Set Up Your Development Environment

Before you submit your amazing contributions, ensure they work seamlessly.

### Quick Cloud Setup 🌩️

Use Gitpod for a hassle-free cloud-based IDE experience:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/tact-lang/tact-docs)

### Local Setup 🏠

1. Clone this GitHub repository.
2. Make sure to have the latest version of [NodeJS LTS](https://nodejs.org/en/download/) installed.
3. Open your terminal in the project directory.
4. Install dependencies without modifying the `yarn.lock`:

    ```
    yarn deps
    ```

5. Start your local development server:

    ```
    yarn dev
    ```

This will open a new browser window displaying your local version of the documentation. Most updates are automatically reflected.

## License 📄

[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
