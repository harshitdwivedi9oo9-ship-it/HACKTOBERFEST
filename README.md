# IssueBuddy

Helps first-time open-source contributors understand a GitHub issue. Paste an issue and get a plain-English explanation, where in the code to look, a step-by-step fix plan, and a suggested commit message.

Built for the Hacktoberfest Hack Day (Best Open-Source AI Project).

## Model
- [exact Gemma model name you used], an open-weight model by Google.
- License/terms: [paste the link from the Gemma docs page]

## How to run
1. `git clone https://github.com/harshitdwivedi9oo9-ship-it/HACKTOBERFEST.git`
2. `cd HACKTOBERFEST`
3. `npm install`
4. Create a `.env` file containing `GEMMA_API_KEY=your_key_here`
5. `node server.js`
6. Open http://localhost:3000

## Dependencies
- express
- dotenv

## License
MIT

demo video: https://drive.google.com/file/d/1ynBRSqbwN75UkFnZu2gIy2tfhYzR_sFv/view?usp=drivesdk