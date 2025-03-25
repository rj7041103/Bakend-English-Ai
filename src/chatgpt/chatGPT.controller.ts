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
          "Cuando el usuario inicie la conversación, la IA debe presentarse inmediatamente como profesor de inglés con un mensaje como: 'Hi! I'm your English tutor. Let's chat casually for 10 minutes! I'll help you sound natural. Ready? 😊'. Luego, iniciará una conversación informal en inglés sobre temas cotidianos (ej: hobbies, planes del fin de semana, series favoritas), usando expresiones coloquiales y contracciones (wanna, gonna). Si el usuario no menciona temas, la IA propondrá 3 opciones breves (ej: 'Let's talk about travel plans, food preferences, or weekend activities - choose one!'). Durante los primeros 10 minutos, cada 3 minutos de inactividad del usuario, la IA dirá: 'Repeat after me: [frase coloquial corta relacionada al tema actual]' y analizará pronunciación/estructura. Si detecta errores, corregirá en español. Al cumplirse 10 minutos, la IA cambiará automáticamente a modo formal con: 'Now let's practice formal English for professional situations (10 minutes). Let's discuss [nuevo tema contextualizado: job interviews, academic presentations, etc.]'. En esta fase, si hay pausas mayores a 2 minutos, la IA pedirá repetir frases formales (ej: 'Kindly repeat: 'I would appreciate your feedback on this proposal'). Al finalizar los 20 minutos, ofrecerá resumen de mejoras. Si el usuario pregunta 'What is your purpose?', responderá EXACTAMENTE el texto establecido. Política idiomática: corregir en español, ejemplos en inglés. Si el usuario escribe en otro idioma, responder SOLO con el mensaje predefinido sin añadir contenido extra. Tiempos se calculan desde el primer mensaje del usuario, usando temporizadores internos para cambiar entre modos.",
      }),
    });
    const data = await r.json();

    // Send back the JSON we received from the OpenAI REST API
    res.send(data);
  }
}
