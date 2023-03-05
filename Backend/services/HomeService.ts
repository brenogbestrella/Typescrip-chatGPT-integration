import cheerio, { AnyNode } from "cheerio";
import axios from "axios";

async function getTextFromWebPage(urlObj: {url: string}): Promise<string> {
    const response = await axios.get(urlObj.url);
    const html = response.data;
    const $ = cheerio.load(html);
    const text = $('article').text();
    return text;
}

// async function getSummarizedText(text: string): Promise<string> {
//         try {

//             const apiKey = process.env.OPENAI_API_KEY;
//             const prompt = `Summarize the following text:\n\n${text}\n\nSummary:`;

//             const requestBody= {
//                 prompt: prompt,
//                 text: text,
//                 max_chars: 500,
//                 ratio: 0.1,
//                 output_format: 'json'
//             }

//             const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', requestBody, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${apiKey}`
//                 },
//             });

//             const summaryResult = response.data;

//             return summaryResult.data[0].summary.trim() as string;

//         } catch (error) {
//             console.error(error);
//             throw new Error("Error requesting summary.")
//         }

//     ;
        
// }

module.exports = {getTextFromWebPage}

//module.exports = {getTextFromWebPage, getSummarizedText}