## Pinata AI Docs Chat

This is an AI chat bot augemented by RAG (retrieval augemented generation). It used a vectorized representation of all Pinata's developer docs. 

Read the tutorial on how it was build here. 

### Running locally

Steps: 

1. Clone the repo: `git clone https://github.com/pinatacloud/ai-docs-chat`
2. Change into the directory: `cd ai-docs-chat`
3. Install dependencies: `npm i`
4. Run: `npm run dev`

You'll need to update the `.env.sample` file with your own values. Check out the tutorial to understand how to get these values. 

The script will work for any repository with Markdown files, you just need to update the path to the folder in the `crawl_data.js` file using the `sourceDir` variable. 

### License

This repository is MIT licensed, except the fonts which are paid fonts that only grant usage for this project. Please use your own fonts. 