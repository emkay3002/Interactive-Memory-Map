const express = require('express');
const router = express.Router();
const https = require('https');

router.post('/ask', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key is missing.' });
  }

  const requestBody = JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 100,
  });

  const options = {
    hostname: 'api.openai.com',
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'Content-Length': Buffer.byteLength(requestBody),
    },
  };

  const apiRequest = https.request(options, (apiResponse) => {
    let data = '';

    // Collect data chunks
    apiResponse.on('data', (chunk) => {
      data += chunk;
    });

    // Handle end of response
    apiResponse.on('end', () => {
      try {
        const jsonResponse = JSON.parse(data);

        if (apiResponse.statusCode === 200) {
          res.json(jsonResponse.choices[0].message);
        } else {
          console.error('Error response from OpenAI API:', jsonResponse);
          res.status(apiResponse.statusCode).json(jsonResponse.error || { error: 'An error occurred.' });
        }
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        res.status(500).json({ error: 'Error parsing response from OpenAI API.' });
      }
    });
  });

  // Handle request error
  apiRequest.on('error', (error) => {
    console.error('Request error:', error);
    res.status(500).json({ error: 'An error occurred while connecting to the API.' });
  });

  // Send the request body
  apiRequest.write(requestBody);
  apiRequest.end();
});

module.exports = router;
