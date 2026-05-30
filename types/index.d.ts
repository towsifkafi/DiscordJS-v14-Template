import {
  Client,
  Collection,
  ChatInputCommandInteraction,
  Message,
  AutocompleteInteraction,
  ModalSubmitInteraction,
  PermissionsString,
  ApplicationCommandType,
  ApplicationCommandOptionData,
  ColorResolvable,
} from 'discord.js';

import type { ILogObj } from 'tslog';
import type { CustomLogger } from '../utils/logger.js';

export interface BotClient extends Client {
  settings: {
    prefix: string;
    color: ColorResolvable;
  };
  logger: CustomLogger<ILogObj>;
  commands: Collection<string, MessageCommand>;
  events: Collection<string, BotEvent>;
  aliases: Collection<string, string>;
  slashCommands: Collection<string, SlashCommand | App>;
  modals: Collection<string, Modal>;
}

export interface SlashCommand {
  name: string;
  description: string;
  type: ApplicationCommandType.ChatInput;
  cooldown?: number;
  options?: ApplicationCommandOptionData[];
  default_permission?: boolean | null;
  default_member_permissions?: PermissionsString[];
  user_perms?: PermissionsString[];
  bot_perms?: PermissionsString[];
  integration_types?: number[];
  contexts?: number[];
  execute: (client: BotClient, interaction: ChatInputCommandInteraction) => Promise<void>;
  autocomplete?: (interaction: AutocompleteInteraction, client?: BotClient) => Promise<void>;
}

export interface MessageCommand {
  name: string;
  description: string;
  cooldown?: number;
  aliases?: string[];
  category?: string;
  user_perms?: PermissionsString[];
  bot_perms?: PermissionsString[];
  execute: (client: BotClient, message: Message, args: string[]) => Promise<void>;
}

export interface BotEvent {
  name: string;
  once?: boolean;
  execute: (client: BotClient, ...args: any[]) => Promise<void>;
}

export interface Modal {
  custom_id: string;
  execute: (client: BotClient, interaction: ModalSubmitInteraction) => Promise<void>;
}

export interface App {
  name: string;
  type: ApplicationCommandType.User | ApplicationCommandType.Message;
  default_permission?: boolean | null;
  default_member_permissions?: PermissionsString[];
  execute: (client: BotClient, interaction: any) => Promise<void>;
}

export interface Handler {
  name: string;
  execute: (client: BotClient) => Promise<void>;
}

export interface Config {
  prefix: string;
  color: string;
}

declare global {
  interface String {
    brightYellow: string;
    brightGreen: string;
    brightBlue: string;
  }
}


