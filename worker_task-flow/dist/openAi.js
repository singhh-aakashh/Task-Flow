"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fetchModels = () => __awaiter(void 0, void 0, void 0, function* () {
    const OPENAI_API_KEY = "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";
    try {
        const response = yield fetch("https://api.openai.com/v1/chat/completions", {
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
        const data = yield response.json();
        console.log("Models:", data);
    }
    catch (error) {
        console.error("Failed to fetch models:", error.message);
    }
});
fetchModels();
