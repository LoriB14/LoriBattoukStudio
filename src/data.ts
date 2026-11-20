export type ServiceId = 'website' | 'store' | 'booking' | 'assistant';

export const SERVICES: Record<ServiceId, { name: string }> = {
  website: { name: 'Custom website' },
  store: { name: 'Online store' },
  booking: { name: 'Online booking' },
  assistant: { name: 'AI assistant' },
};

export const SERVICE_ORDER: ServiceId[] = ['website', 'store', 'booking', 'assistant'];

export const IMG = {
  buds: '/img/photo-m183016636-1200.webp',
  barista: '/img/photo-m187311853-1200.webp',
  bakery: '/img/photo-m33603672-1200.webp',
  blankets: '/img/photo-m61777177-960.jpg',
};
