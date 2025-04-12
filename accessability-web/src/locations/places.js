export const places = [
    {
      id: '1a2b3c4d-0000-0000-0000-000000000001',
      name: 'ЦНАП Чернігів',
      address: 'вул. Шевченка, 95, Чернігів, Україна',
      coordinates: {
        type: 'Point',
        coordinates: [31.2849, 51.4982],
      },
      type: 'government_building',
      category: 'адмінпослуги',
      description: 'Центр надання адміністративних послуг у Чернігові.',
      contacts: {
        phones: ['+380462123456'],
        emails: ['info@cnap.cn.ua'],
        website: 'https://cnap.cn.ua',
      },
      working_hours: {
        mon_fri: '09:00-18:00',
        sat: '10:00-14:00',
        sun: 'closed',
      },
      created_by: 'user-uuid-1',
      organization_id: null,
      status: 'published',
      overall_accessibility_score: 85,
      created_at: '2024-12-01T10:00:00Z',
      updated_at: '2025-04-12T08:00:00Z',
      last_verified_at: '2025-04-10T12:00:00Z',
      rejection_reason: null,
    },
    {
      id: '1a2b3c4d-0000-0000-0000-000000000002',
      name: 'Поліклініка №3',
      address: 'вул. Київська, 18, Чернігів, Україна',
      coordinates: {
        type: 'Point',
        coordinates: [31.2901, 51.5031],
      },
      type: 'healthcare',
      category: 'поліклініка',
      description: 'Міська поліклініка №3',
      contacts: {
        phones: ['+380462654321'],
        emails: ['clinic3@health.cn.ua'],
        website: null,
      },
      working_hours: {
        mon_fri: '08:00-17:00',
        sat: '09:00-13:00',
        sun: 'closed',
      },
      created_by: 'user-uuid-2',
      organization_id: 'org-uuid-1',
      status: 'pending',
      overall_accessibility_score: 72,
      created_at: '2024-11-15T08:30:00Z',
      updated_at: '2025-04-01T09:00:00Z',
      last_verified_at: null,
      rejection_reason: null,
    }
  ];

  
  