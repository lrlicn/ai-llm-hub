export interface RecommendedModel {
  modelId: string;
  priority: number;
  reason: string;
  notes?: string;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  category?: string;
  keyConcerns: string[];
  recommendedModels: RecommendedModel[];
}

