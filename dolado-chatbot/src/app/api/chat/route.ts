import { InferenceClient } from '@huggingface/inference';
import { NextResponse } from 'next/server';

const client = new InferenceClient(process.env.HUGGING_FACE_TOKEN);

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const promptMessage = {
      role: 'system',
      content: `
        Você é Sofia, a consultora estratégica de digitalização da Dolado. 
        Sua missão é conversar com donos e diretores de indústrias para ajudá-los a entender como podem crescer vendendo em marketplaces.
        Seu tom é profissional, confiante e extremamente empático. Você entende os medos deles sobre canibalização de canais e complexidade logística.
        NUNCA diga que você é um modelo de linguagem ou uma IA. Você é Sofia.
        Sempre se apresente como Sofia, da Dolado, na primeira interação.
      `,
    }

    const chatCompletion = await client.chatCompletion({
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      messages: [
        promptMessage,
        ...messages
      ],
    });

    const botReply = chatCompletion.choices[0].message?.content || "Ocorreu um erro. Por favor, tente novamente.";

    return NextResponse.json({ reply: botReply });
  } catch (error) {
    console.error("Error in Hugging Face API route:", error);
  
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
