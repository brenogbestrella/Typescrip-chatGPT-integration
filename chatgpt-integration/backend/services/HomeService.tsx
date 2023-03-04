import fetch from "node-fetch";
import axios from "axios"
import cheerio from "cheerio";
import dotenv from 'dotenv';

const app = express();

async function getTextFromWebPage(url: string): Promise<string> {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const text = $('body').text();
    return text
}

async function getSummarizedText(text: string): Promise<string> {
    return app.get('/api/sumario', async (req, res) => {
        try {

            const apiKey = process.env.OPENAI_API_KEY;
            const prompt = `Summarize the following text:\n\n${text}\n\nSummary:`;

            const requestBody= {
                prompt: prompt,
                text: text,
                max_chars: 120,
                ratio: 0.1,
                output_format: 'json'
            }

            const response = await app.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ${apiKey}'
                },
                body: JSON.stringify(requestBody)
            });

            const summaryResult = await response.json();

            return summaryResult.data[0].summary.trim() as string;

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error requesting summary.' });
        }

    });
        
}

module.exports = {getTextFromWebPage, getSummarizedText}