import OpenAI from 'openai';
import fetch from 'node-fetch';
import { writeFileSync } from 'fs';

const openai = new OpenAI({
 apiKey: 'YOUR-API-KEY',
});

async function createImage() {
    const result = await openai.images.generate({
        model: "dall-e-3",
        prompt: 'a chapel 16 wide by 50 long With a single hyperbolic paraboloid (like a pringle) roof',
        n: 1,
        size: "1024x1024",
    });
    
    const url = result.data[0].url;
    console.log(url);

    // Save image URL to disk
    const imgResult = await fetch(url);
    const blob = await imgResult.blob();    const buffer = Buffer.from( await blob.arrayBuffer() )
    writeFileSync(`./img/${Date.now()}.png`, buffer);
}

createImage();


