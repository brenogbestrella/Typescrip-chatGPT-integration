import cheerio, { AnyNode } from "cheerio";
import axios from "axios";
require('dotenv').config;

async function getTextFromWebPage(urlObj: {url: string}): Promise<string> {
    try {

        const response = await axios.get(urlObj.url);
        const html = response.data;
        const $ = cheerio.load(html);
        const text = $('article').text();
    
        const summarizedText = await getSummarizedText(text);
        return summarizedText
        
    } catch (error) {
        throw new Error ("Error requesting web page.")
    }
}

async function getSummarizedText(text: string): Promise<string> {
        try {

            const apiKey = process.env.OPENAI_API_KEY;
            const prompt = `Summarize the following text:\n\n${text}\n\nSummary:`;

            const requestBody= {
                prompt: prompt,
                model: "text-davinci-003",
                max_tokens: 2000,
                temperature: 0.2,
                n: 1,
                stream: false,
                logprobs: null,
                stop: "\n"
            }

            const response = await axios.post('https://api.openai.com/v1/completions', requestBody, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`
                },
            });

            const summaryResult = response.data;

            return summaryResult.choices[0].text.trim() as string;

        } catch (error) {
            console.error(error.response.data);
            throw new Error("Error requesting summary.")
        }

    ;
        
}

module.exports = {getTextFromWebPage, getSummarizedText}