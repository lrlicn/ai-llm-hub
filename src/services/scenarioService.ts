import type { Scenario } from '@/types/scenario';
import scenariosData from '@/data/scenarios.json';

const scenarios: Scenario[] = scenariosData as Scenario[];

export function getAllScenarios(): Scenario[] {
  return scenarios;
}

export function getScenarioById(id: string): Scenario | undefined {
  return scenarios.find(s => s.id === id);
}
