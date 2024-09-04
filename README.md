# ConLab: Dream Constitution

## Tech Stack

- React on [NextJS](https://nextjs.org)
- TypeScript
- [TailwindCSS](https://tailwindcss.com) with [JIT mode](https://tailwindcss.com/docs/just-in-time-mode)

## Deployment Environments

- Production: https://conlab.wevis.info/

## Getting Start

The project is so outdated and can't run with latest version of npm and node. The easiest way is to use [Playwright's docker image](https://playwright.dev/docs/docker):

```bash
docker run -it --rm --ipc=host -v ./:/app -p 3000:3000 mcr.microsoft.com/playwright:v1.14.1 bash
```

Then you can run npm scripts inside the container:

```bash
yarn        # install dependencies
yarn dev    # run dev server,
yarn build  # build static site to /out
```

Please set `NEXT_PUBLIC_ENV=production` for production build.

Noted that the following environment variables are required (can be defined in `.env`):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## Development Guideline

### Way of working

- **Tasks are free to picked from [Github Issues](https://github.com/electinth/dream-constitution/issues)**. Assigne when picked and close when finished.
- **Trunk based development**: work on single `main` branch
- **Continuous integration (CI)**: small commit and push often (no overnight)
  - also pull often, please `pull --rebase` before push
- **Continuous Deployment (CD)**: every push will be built to staging
- **Pre push linter/formatter**: When commit code, linter/formatter will be run to make code style consistance

### Recommend tools

- VSCode with following extensions:
  - [Tailwind Intellisence](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) with format on save enabled

### React Component

- Prefer [typescript functional component](https://fettblog.eu/typescript-react/components/#functional-components)

```tsx
// hello.tsx
import { FunctionComponent } from 'react';

type HelloProps = {
  name: string;
};

const Hello: FunctionComponent<HelloProps> = ({ name }) => (
  <div>Hi, there! {name}</div>
);

export default Hello;
```

- File name should be all lower case with dash .tsx ex: `some-component.tsx`
- React components are located in 2 directory
  - `/pages` contain each web page ex. `pages/about.tsx` will create a page at url `/about` [more about routing](https://nextjs.org/docs/routing/introduction)
  - `/components` contain reusable components that can be imported and used
    - If the component is tied to specific page, recommend to create corresponded folder ex. `components/about/only-for-about.tsx`

### Styling

Preferred tailwind utility classes over other styling methods

### Color

Color theme is defined with the same name as in Figma

```tsx
<p className="text-blue-400">some text</p>
```

### Typography

Typography is defined and can be used as a class `text-<name-in-Figma>`

```tsx
<p className="text-huge">huge</p>
<p className="text-large-1">large-1</p>
<p className="text-large-2">large-2</p>
<p className="text-headline-1">headline-1</p>
<p className="text-headline-2">headline-2</p>
<p>body-1 (default)</p>
<p className="text-body-2">body-2</p>
<p className="text-small-1">small-1</p>
<p className="text-small-2">small-2</p>
```

### Images

For local images place it in `assets/images/` and use require

```tsx
<img src={require('../assets/images/next.png')} alt="Next" />
```

Images will get optimized on build. No need to do it manually.

## License

This project is licensed under [Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/) with WeVis Ltd. and Punch Up Ltd. as licensors.
