'use server';
/**
 * @fileOverview This flow allows businesses to train the AI with specific business information
 * by providing text input and uploading documents as data URIs.
 *
 * - trainAIKnowledgeBase - A function to initiate the AI knowledge base training.
 * - AIKnowledgeBaseTrainingInput - The input type for the trainAIKnowledgeBase function.
 * - AIKnowledgeBaseTrainingOutput - The return type for the trainAIKnowledgeBase function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIKnowledgeBaseTrainingInputSchema = z.object({
  textInput: z.string().optional().describe('General text information for the AI knowledge base.'),
  documentDataUris: z
    .array(
      z
        .string()
        .describe(
          "A document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
        )
    )
    .optional(),
});
export type AIKnowledgeBaseTrainingInput = z.infer<typeof AIKnowledgeBaseTrainingInputSchema>;

const AIKnowledgeBaseTrainingOutputSchema = z.object({
  status: z.enum(['success', 'failure']).describe('Status of the knowledge base training.'),
  message: z.string().describe('Detailed message about the training outcome.'),
});
export type AIKnowledgeBaseTrainingOutput = z.infer<typeof AIKnowledgeBaseTrainingOutputSchema>;

const aiKnowledgeBaseTrainingPrompt = ai.definePrompt({
  name: 'aiKnowledgeBaseTrainingPrompt',
  input: {schema: AIKnowledgeBaseTrainingInputSchema},
  output: {schema: AIKnowledgeBaseTrainingOutputSchema},
  prompt: `You are an AI assistant designed to maintain a comprehensive knowledge base for a business.
Your task is to ingest and store the provided information about the business, its products, policies, and FAQs.
After processing, confirm that you have successfully integrated this knowledge into your system and are ready to answer future queries based on it.

--- Knowledge Base Content ---

{{#if textInput}}
Text Input:
{{{textInput}}}
{{/if}}

{{#if documentDataUris}}
Documents:
{{#each documentDataUris}}
  {{media url=this}}
{{/each}}
{{/if}}

----------------------------

Based on the above content, please confirm your understanding and readiness. Structure your response as a JSON object with 'status' and 'message' fields.
The 'status' must be exactly 'success' if you processed the information, or 'failure' otherwise.
The 'message' should provide a brief confirmation or detail any issues encountered.`,
});

const aiKnowledgeBaseTrainingFlow = ai.defineFlow(
  {
    name: 'aiKnowledgeBaseTrainingFlow',
    inputSchema: AIKnowledgeBaseTrainingInputSchema,
    outputSchema: AIKnowledgeBaseTrainingOutputSchema,
  },
  async (input) => {
    const {output} = await aiKnowledgeBaseTrainingPrompt({
      textInput: input.textInput,
      documentDataUris: input.documentDataUris,
    });

    // CRITICAL FIX: Explicitly type the result to prevent type widening to 'string'.
    // This ensures the return value strictly matches the "success" | "failure" union required by the schema.
    const result: AIKnowledgeBaseTrainingOutput = {
      status: output?.status === 'success' ? 'success' : 'failure',
      message: output?.message || (output?.status === 'success' ? 'Training completed' : 'AI training failed or returned invalid status.'),
    };

    return result;
  }
);

export async function trainAIKnowledgeBase(input: AIKnowledgeBaseTrainingInput): Promise<AIKnowledgeBaseTrainingOutput> {
  return aiKnowledgeBaseTrainingFlow(input);
}
