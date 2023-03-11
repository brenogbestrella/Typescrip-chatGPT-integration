import cheerio from "cheerio";
import axios from "axios";
require('dotenv').config;

async function getTextFromWebPage(urlObj: {url: string}): Promise<string> {
    try {

        const response = await axios.get(urlObj.url);
        const html = response.data;
        const $ = cheerio.load(html);

        let maxNumberWords = 0;
        let mainArticle = '';

        if ($('article').length > 0) {
            const text = $('article').text();
            mainArticle = text.trim()
        } else {
            $('body').find('*').each(function() {
                const text = $(this).text();
                const numberWords = text.trim().split(/\s+/).length;
                if (numberWords > maxNumberWords) {
                    maxNumberWords = numberWords;
                    mainArticle = text
                }
            })
        }

    
        const summarizedText = await getSummarizedText(mainArticle);
        return summarizedText
        
    } catch (error) {
        console.error(error.response.data)
        throw new Error ("Error requesting web page.")
    }
}

async function getSummarizedText(text: string): Promise<string> {
        try {

            const apiKey = process.env.OPENAI_API_KEY;
            const prompt = `Summarize the following text:\n\n${text}\n\nSummary:`;

            const requestBody= {
                model: "gpt-3.5-turbo",
                messages: [{"role": "user", "content": prompt}],
                temperature: 0.2,
                n: 1,
                stream: false,
            }

            const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`
                },
            });

            const summaryResult = response.data;

            return summaryResult.choices[0].message.content.trim() as string;

        } catch (error) {
            console.error(error.response.data);
            throw new Error("Error requesting summary.")
        }

    ;
        
}

module.exports = {getTextFromWebPage, getSummarizedText}