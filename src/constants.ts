import type { AnatomyPartConfig, AnatomyState } from './types';

export const MODEL_ID = '20366a17f8b14adbb7b645c57cbf45d9';

export const DEFAULT_OPACITY = 30;

export const STATES: AnatomyState[] = ['normal', 'transparent', 'hidden'];

export const ANATOMY_PARTS: AnatomyPartConfig[] = [
  {
    key: 'colon',
    label: 'Colon',
    materialPatterns: ['COLON'],
    nodePatterns: ['COLON'],
  },
  {
    key: 'mesentery',
    label: 'Mesentery',
    materialPatterns: ['MESENTERY'],
    nodePatterns: ['MESENTERY'],
  },
  {
    key: 'fascia',
    label: 'Peritoneum',
    materialPatterns: ['PARIETAL_PERITONEAL_FASCIA'],
    nodePatterns: ['PARIETAL_PERITONEAL_FASCIA'],
  },
  {
    key: 'arteries',
    label: 'Arteries',
    materialPatterns: ['ARTERIES1_2', 'ARTERIES1_3', 'ART_SMALL_INTERNALS'],
    nodePatterns: ['ARTERIES1_2', 'ARTERIES1_3', 'ART_SMALL_INTERNALS'],
  },
  {
    key: 'veins',
    label: 'Portal Veins',
    materialPatterns: ['PORTAL_VEINS1_4', 'PORTAL_VEINS1_5_INNER'],
    nodePatterns: ['PORTAL_VEINS1_4', 'PORTAL_VEINS1_5_INNER'],
  },
  {
    key: 'stomach',
    label: 'Stomach',
    materialPatterns: ['STOMACH'],
    nodePatterns: ['STOMACH'],
  },
  {
    key: 'pancreas',
    label: 'Pancreas',
    materialPatterns: ['PANCREAS'],
    nodePatterns: ['PANCREAS'],
  },
];
