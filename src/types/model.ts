export type Origin = 'domestic' | 'foreign';
export type DeploymentType = 'local' | 'cloud' | 'both';
export type ModelType = 'general' | 'code' | 'reasoning' | 'multimodal' | 'domain';

export interface CapabilityScore {
  general: number;
  code: number;
  reasoning: number;
  longContext: number;
  multimodal: number;
  ragFit: number;
}

export interface SdkLink {
  name: string;
  url: string;
}

export interface Model {
  id: string;
  name: string;
  vendor: string;
  origin: Origin;
  openSource: boolean;
  deploymentType: DeploymentType;
  modelType: ModelType;
  releaseYear?: number;
  languages: string[];
  capability: CapabilityScore;
  contextLength?: number;
  inputPrice?: number;
  outputPrice?: number;
  currency?: 'USD' | 'CNY' | string;
  pricingRemark?: string;
  rateLimitInfo?: string;
  officialSite?: string;
  apiDoc?: string;
  console?: string;
  sdkLinks?: SdkLink[];
  scenarios?: string[];
  pros?: string[];
  cons?: string[];
  summary?: string;
}

