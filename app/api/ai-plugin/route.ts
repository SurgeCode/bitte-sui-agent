import { ACCOUNT_ID, PLUGIN_URL } from '../../config';
import { NextResponse } from 'next/server';

export async function GET() {
  const pluginData = {
    openapi: '3.0.0',
    info: {
      title: 'Bitte Sui Agent',
      description: 'API for the Bitte Sui Agent',
      version: '1.0.0',
    },
    servers: [
      {
        url: PLUGIN_URL,
      },
    ],
    'x-mb': {
      'account-id': "surgecode.near",
      assistant: {
        name: 'Bitte Sui Agent',
        description:
          'An assistant that helps users interact with the Sui blockchain by checking balances, swapping tokens, and staking SUI.',
        instructions:
          "I can help you interact with the Sui blockchain in three ways: checking balances, swapping tokens on Aftermath, and liquid staking on Spring. To check balances, I'll use get-sui-balances. For swaps, I'll first get the transaction data using aftermath-sui-swap, then submit it using generate-sui-tx. Similarly for staking/unstaking, I'll get the transaction data from sui-liquid-staking and submit it with generate-sui-tx. I'll always show you the transaction details before submitting, do not render token icons when showing balance.",
        tools: [
          { type: 'get-sui-balances' },
          { type: 'generate-sui-tx' },
          { type: 'aftermath-sui-swap' },
          { type: 'sui-lst' },
        ],
      },
    },
    paths: {
      '/api/tools/coinflip': {
        get: {
          summary: 'Coin flip',
          description: 'Flip a coin and return the result (heads or tails)',
          operationId: 'coinFlip',
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      result: {
                        type: 'string',
                        description:
                          'The result of the coin flip (heads or tails)',
                        enum: ['heads', 'tails'],
                      },
                    },
                  },
                },
              },
            },
            '500': {
              description: 'Error response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string',
                        description: 'Error message',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return NextResponse.json(pluginData);
}
