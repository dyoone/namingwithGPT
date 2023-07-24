import { getassistantMessages,getuserMessages,formData } from "./nextStage.js";
export async function fetchData(condition) {
    try {
        const response = await fetch('http://localhost:3000/fortuneTell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    userMessages: getuserMessages(), 
                    assistantMessages: getassistantMessages(),
                    formData: formData,
                    condition: condition,
                })
        });

        if (!response.ok) {
            throw new Error('Request failed with status ' + response.status);
        }

        const data = await response.json();
        return data.assistant;
    } catch (error) {
        return '';
    }
}