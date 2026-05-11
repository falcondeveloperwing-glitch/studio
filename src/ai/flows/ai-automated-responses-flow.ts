'use server';
/**
 * @fileOverview A Genkit flow for generating automated AI replies based on a knowledge base.
 *
 * - aiAutomatedResponses - A function that generates an AI reply.
 * - AiAutomatedResponsesInput - The input type for the aiAutomatedResponses function.
 * - AiAutomatedResponsesOutput - The return type for the aiAutomatedResponses function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const AiAutomatedResponsesInputSchema = z.object({
  customerInquiry: z.string().describe('The customer\'s inquiry message.'),
  knowledgeBaseContent: z.string().describe('The content from the AI knowledge base to use for generating the reply.'),
});
export type AiAutomatedResponsesInput = z.infer<typeof AiAutomatedResponsesInputSchema>;

// Output Schema
const AiAutomatedResponsesOutputSchema = z.object({
  reply: z.string().describe('The AI-generated reply to the customer inquiry.'),
});
export type AiAutomatedResponsesOutput = z.infer<typeof AiAutomatedResponsesOutputSchema>;

// Wrapper function
export async function aiAutomatedResponses(input: AiAutomatedResponsesInput): Promise<AiAutomatedResponsesOutput> {
  return aiAutomatedResponsesFlow(input);
}

// Genkit Prompt definition
const automatedResponsesPrompt = ai.definePrompt({
  name: 'automatedResponsesPrompt',
  input: { schema: AiAutomatedResponsesInputSchema },
  output: { schema: AiAutomatedResponsesOutputSchema },
  prompt: `You are an AI sales assistant for an Instagram business. Your goal is to provide concise, helpful, and sales-oriented responses to customer inquiries based on the provided knowledge base.\n\nUse the following knowledge base content to formulate your reply:\nKnowledge Base:\n{{{knowledgeBaseContent}}}\n\nCustomer Inquiry:\n{{{customerInquiry}}}\n\nBased on the knowledge base and the customer's inquiry, generate a professional and helpful reply. If the knowledge base does not contain enough information to answer the question, politely state that you cannot answer at this time and suggest they contact support.`,
});

// Genkit Flow definition
const aiAutomatedResponsesFlow = ai.defineFlow(
  {
    name: 'aiAutomatedResponsesFlow',
    inputSchema: AiAutomatedResponsesInputSchema,
    outputSchema: AiAutomatedResponsesOutputSchema,
  },
  async (input) => {
    const { output } = await automatedResponsesPrompt(input);
    return output!;
  }
);
