/**
 * MCP Client — Connecte l'agent corporate au hotel-agent MCP Server.
 *
 * Spawn le hotel-agent comme sous-processus stdio,
 * liste ses outils, et les expose comme outils Claude API.
 */

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import type Anthropic from "@anthropic-ai/sdk";

const __dirname = dirname(fileURLToPath(import.meta.url));
const HOTEL_AGENT_PATH = resolve(__dirname, "../../hotel-agent/dist/index.js");

export class HotelMcpClient {
  private client: Client;
  private transport: StdioClientTransport | null = null;

  constructor() {
    this.client = new Client({
      name: "corporate-agent",
      version: "0.1.0",
    });
  }

  async connect(): Promise<void> {
    this.transport = new StdioClientTransport({
      command: "node",
      args: [HOTEL_AGENT_PATH],
    });

    await this.client.connect(this.transport);
  }

  async disconnect(): Promise<void> {
    await this.client.close();
  }

  /**
   * Liste les outils MCP du hotel-agent et les convertit
   * au format Anthropic tool_use.
   */
  async listToolsAsAnthropicFormat(): Promise<Anthropic.Tool[]> {
    const { tools } = await this.client.listTools();

    return tools.map((tool) => ({
      name: tool.name,
      description: tool.description ?? "",
      input_schema: tool.inputSchema as Anthropic.Tool["input_schema"],
    }));
  }

  /**
   * Appelle un outil MCP et retourne le résultat sous forme de string.
   */
  async callTool(
    name: string,
    args: Record<string, unknown>,
  ): Promise<{ result: string; isError: boolean }> {
    const response = await this.client.callTool({ name, arguments: args });

    const content = response.content as Array<{ type: string; text?: string }>;
    const textParts = content
      .filter((c): c is { type: "text"; text: string } => c.type === "text")
      .map((c) => c.text);

    return {
      result: textParts.join("\n"),
      isError: response.isError === true,
    };
  }
}
