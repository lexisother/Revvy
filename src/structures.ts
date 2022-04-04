export interface EmoteRegistryDumpEntry {
  ref: string | null;
  id: string;
  name: string | null;
  requires_colons: boolean;
  animated: boolean;
  url: string;
  guild_id: string;
  guild_name: string;
}

export interface EmoteRegistryDump {
  version: number;
  list: EmoteRegistryDumpEntry[];
}
