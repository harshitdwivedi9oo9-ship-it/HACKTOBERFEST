const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;
const MODEL_NAME = 'models/gemma-4-26b-a4b-it';

app.use(express.json());
app.use(express.static('public'));

app.post('/api/explain', async (req, res) => {
    try {
        let { issueText } = req.body;
        const apiKey = process.env.GEMMA_API_KEY?.trim();

        if (!apiKey) {
            return res.status(500).json({ error: 'GEMMA_API_KEY is missing in .env file.' });
        }

        // Optional upgrade: If the user pastes a GitHub Issue URL, automatically fetch the issue title & body
        const ghMatch = issueText.trim().match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/issues\/(\d+)/);
        if (ghMatch) {
            const [, owner, repo, issueNumber] = ghMatch;
            const ghRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`, {
                headers: { 'User-Agent': 'IssueBuddy-App' }
            });
            if (ghRes.ok) {
                const ghData = await ghRes.json();
                issueText = `Repository: ${owner}/${repo}\nIssue #${issueNumber}: ${ghData.title}\n\nDescription:\n${ghData.body || 'No description provided.'}`;
            }
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/${MODEL_NAME}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are an expert open-source mentor helping a beginner developer break down a GitHub issue.
Analyze the issue below and respond in clean Markdown with these exact sections:
1. **Difficulty Rating**: (Easy, Medium, or Hard) with a one-sentence reason.
2. **What Needs to Be Fixed**: Plain-English summary of the bug or feature.
3. **Where to Look**: Likely files, components, or state logic to inspect.
4. **Step-by-Step Fix Plan**: Concrete steps a beginner can follow.

GitHub Issue:
${issueText}`
                    }]
                }]
            })
        });

        const data = await response.json();
        const parts = data.candidates?.[0]?.content?.parts || [];

        if (parts.length > 0) {
            // Filter out internal thinking/reasoning parts (where part.thought === true)
            const answerParts = parts.filter(part => !part.thought && part.text);
            const reply = answerParts.length > 0
                ? answerParts.map(p => p.text).join('\n\n')
                : parts[parts.length - 1].text;

            res.json({ result: reply, model: MODEL_NAME });
        } else {
            const realError = data.error?.message || JSON.stringify(data);
            res.status(500).json({ error: `AI API Error: ${realError}` });
        }

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Failed to generate explanation: ' + error.message });
    }
});

app.listen(port, () => {
    console.log(`IssueBuddy server running at http://localhost:${port}`);
});