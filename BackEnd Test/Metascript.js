const questionForm = document.getElementById('question-form');
const questionInput = document.getElementById('question-input');
const submitButton = document.getElementById('submit-question');
const answerContainer = document.getElementById('answer-container');

const metaAiApiKey = 'YOUR_META_AI_API_KEY';
const metaAiApiUrl = 'https://api.meta.ai/questions';

questionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const question = questionInput.value.trim();
    if (!question) return;

    try {
        const response = await fetch(metaAiApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${metaAiApiKey}`,
            },
            body: JSON.stringify({ question }),
        });

        const data = await response.json();
        const answer = data.answer;

        answerContainer.innerHTML = `
            <h2>Answer:</h2>
            <p>${answer}</p>
        `;
    } catch (error) {
        console.error(error);
        answerContainer.innerHTML = `
            <h2>Error:</h2>
            <p>Failed to retrieve answer.</p>
        `;
    }
});
