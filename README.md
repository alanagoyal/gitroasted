# GitHub Profile Roaster

This is a [Next.js](https://nextjs.org) project that allows users to input their GitHub profile URL and receive a humorous "roast" of their profile. The project is bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- **GitHub Profile Roasting**: Enter your GitHub profile URL and get a funny roast based on your profile.
- **Dynamic Loading Messages**: Enjoy a series of humorous loading messages while your roast is being prepared.
- **Copy to Clipboard**: Easily copy your roast to the clipboard with a single click.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/github-profile-roaster.git
   cd github-profile-roaster
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add your API keys:

   ```plaintext
   OPENAI_API_KEY="your-openai-api-key"
   BROWSERBASE_API_KEY="your-browserbase-api-key"
   ANTHROPIC_API_KEY="your-anthropic-api-key"
   ```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application in action.

## API Endpoint

The project includes an API endpoint at `app/api/roast/route.ts` that processes the GitHub URL and returns a roast. It uses the `Stagehand` library from `@browserbasehq` to interact with the GitHub page and generate the roast.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
