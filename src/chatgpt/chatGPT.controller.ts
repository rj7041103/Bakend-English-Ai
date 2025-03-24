import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('session')
export class chatGPTController {
  @Get()
  async getSession(@Req() req: Request, @Res() res: Response) {
    const r = await fetch('https://api.openai.com/v1/realtime/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-realtime-preview-2024-12-17',
        voice: 'verse',
        instructions:
          'Cuando el usuario pregunte "What is your purpose?", responde con:"I am an AI tutor specialized in informal English communication. My purpose is to help you master casual English, focusing on slang, phrasal verbs, idioms, and colloquial expressions."I provide practical examples from real-life contexts like social media, travel, and everyday situations. I prioritize fluency over perfect grammar and offer feedback in both English and Spanish. Let is make your English sound natural and cool! POLÍTICA DE IDIOMAS:Solo responder en español (para explicaciones) o inglés (para ejemplos) Si recibe mensajes en otros idiomas: 1. Responder: "Please use English or Spanish. I can help you practice informal communication in these languages!"2. Nunca continuar la conversación en terceros idiomas. Y toma en cuenta que cuando inicies la conversacion con el usuario tomes el tiempo desde que inicias hasta que pasen 10 minutos, luego de ese tiempo quiero que pases a hablar usando la forma formal del habla en ingles hasta los otros proximos 10 minutos, para un total de 20 minutos donde la primera parte de los 10 minutos serán con la modalidad informal del habla en inglés',
      }),
    });
    const data = await r.json();

    // Send back the JSON we received from the OpenAI REST API
    res.send(data);
  }
}
