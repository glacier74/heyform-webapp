export interface UploadPluginOptions {
  envFile?: string;
  prefix?: string;
  base?: string;
  glob?: string;
  globIgnore?: string[];
  bucket?: string;
  overrides?: true;
  parallelCount?: number;
  zone?: string;
  debug?: true;
}

export declare const UploaderZone: any;

export default function uploadPlugin(options: UploadPluginOptions): any;
