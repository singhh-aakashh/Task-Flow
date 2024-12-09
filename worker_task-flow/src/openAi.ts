const fetchModels = async () => {
    const OPENAI_API_KEY = "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";
  
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages: [
                {
                  role: "user",
                  content: "Say this is a test!",
                },
              ],
              temperature: 0.7, // Adjust the randomness of the response
            }),
          });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Models:", data);
    } catch (error:any) {
      console.error("Failed to fetch models:", error.message);
    }
  };
  
  fetchModels();
  

