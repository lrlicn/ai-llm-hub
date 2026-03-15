import type { Model } from '@/types/model';
import modelsData from '@/data/models.json';

const models: Model[] = modelsData as Model[];

export function getAllModels(): Model[] {
  return models;
}

export function getModelById(id: string): Model | undefined {
  return models.find(m => m.id === id);
}

export function getModelsByIds(ids: string[]): Model[] {
  return models.filter(m => ids.includes(m.id));
}

export function searchModels(keyword: string): Model[] {
  const lower = keyword.toLowerCase();
  return models.filter(m =>
    m.name.toLowerCase().includes(lower) ||
    m.vendor.toLowerCase().includes(lower) ||
    m.summary?.toLowerCase().includes(lower)
  );
}
