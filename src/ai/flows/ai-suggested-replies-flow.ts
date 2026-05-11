'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating AI-suggested replies.
 *
 * - aiSuggestedReplies - A function that generates AI-suggested replies based on conversation context and a knowledge base.
 * - AISuggestedRepliesInput - The input type for the aiSuggestedReplies function.
 * - AISuggestedRepliesOutput - The return type for the aiSuggestedReplies function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AISuggestedRepliesInputSchema = z.object({
  conversationHistory: z.array(
    z.object({
      role: z.enum(['customer', 'business']).describe("The role of the speaker, either 'customer' or 'business'."),
      content: z.string().describe('The content of the message.'),
    })
  ).describe('A chronological list of messages in the conversation.'),
  knowledgeBase: z.string().describe('The business knowledge base containing FAQs, product info, and policies.').optional(),
});
export type AISuggestedRepliesInput = z.infer<typeof AISuggestedRepliesInputSchema>;

const AISuggestedRepliesOutputSchema = z.object({
  suggestedReplies: z.array(z.string()).describe('An array of AI-generated reply suggestions.'),
});
export type AISuggestedRepliesOutput = z.infer<typeof AISuggestedRepliesOutputSchema>;

export async function aiSuggestedReplies(input: AISuggestedRepliesInput): Promise<AISuggestedRepliesOutput> {
  return aiSuggestedRepliesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSuggestedRepliesPrompt',
  input: { schema: AISuggestedRepliesInputSchema },
  output: { schema: AISuggestedRepliesOutputSchema },
  prompt: `You are an AI sales assistant for an Instagram business. Your goal is to provide concise and helpful reply suggestions to customers.

Here is the business's knowledge base:
{{#if knowledgeBase}}{{{knowledgeBase}}}{{else}}No specific knowledge base provided.{{/if}}

Here is the current conversation history:
{{#each conversationHistory}}
{{#if (eq this.role "customer")}}Customer: {{{this.content}}}
{{else}}Business: {{{this.content}}}
{{/if}}
{{/each}}

Based on the knowledge base and the conversation history, generate 3-5 concise and relevant reply suggestions that the business can use to respond to the customer. Ensure the replies are helpful, on-brand, and aim to move the conversation towards a sale or provide necessary information.`, 
});

const aiSuggestedRepliesFlow = ai.defineFlow(
  {
    name: 'aiSuggestedRepliesFlow',
    inputSchema: AISuggestedRepliesInputSchema,
    outputSchema: AISuggestedRepliesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
