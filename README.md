# GitRoasted

This project uses [Stagehand](https://github.com/browserbase/stagehand) by [Browserbase](https://browserbase.com) to automate the browser to roast a given GitHub profile.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alanagoyal/gitroasted.git
   cd gitroasted
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add your API keys:

   ```plaintext
   OPENAI_API_KEY="your-openai-api-key"
   ANTHROPIC_API_KEY="your-anthropic-api-key"
   BROWSERBASE_API_KEY="your-browserbase-api-key"
   BROWSERBASE_PROJECT_ID="your-browserbase-project-id"
   ```

### Run

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application in action.

## Deploy 

Deploy using [Vercel](https://vercel.com)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
