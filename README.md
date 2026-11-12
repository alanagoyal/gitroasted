# gitroasted

> **status:** the hosted website is no longer live as of november 12, 2026. the source code remains available for reference and self-hosting.

this project uses [stagehand](https://github.com/browserbase/stagehand) by [browserbase](https://browserbase.com) to automate the browser to roast a given github profile.

## getting started

### installation

1. clone the repository:

   ```bash
   git clone https://github.com/alanagoyal/gitroasted.git
   cd gitroasted
   ```

2. install the dependencies:

   ```bash
   npm install
   ```

3. set up environment variables:

   create a `.env` file in the root directory and add your api keys:

   ```plaintext
   OPENAI_API_KEY="your-openai-api-key"
   ANTHROPIC_API_KEY="your-anthropic-api-key"
   BROWSERBASE_API_KEY="your-browserbase-api-key"
   BROWSERBASE_PROJECT_ID="your-browserbase-project-id"
   ```

### run

start the development server:

```bash
npm run dev
```

open [http://localhost:3000](http://localhost:3000) with your browser to see the application in action.

## deploy 

deploy using [vercel](https://vercel.com)

## contributing

contributions are welcome! please open an issue or submit a pull request for any improvements or bug fixes.

## license

this project is licensed under the mit license.
