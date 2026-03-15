import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const aiRouter = router({
  generateResponse: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input }) => {
      // Server-side AI integration for Next.js
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: input.prompt }],
        model: "gpt-4",
      });
      return {
        text: completion.choices[0].message.content,
      };
    }),
});