
export const MOCK_CHATS = [
  {
    id: '1',
    customerName: 'Marcus Sterling',
    customerUsername: 'marcus_fit',
    lastMessage: 'Does this come in XL black?',
    status: 'AI Handled',
    unread: true,
    updatedAt: new Date().toISOString(),
    avatarSeed: 'marcus',
    messages: [
      { role: 'customer', content: 'Hey, I love the new collection!', type: 'text', timestamp: new Date(Date.now() - 3600000).toISOString() },
      { role: 'ai', content: 'Thank you Marcus! We are glad you like it. Is there anything specific you are looking for?', type: 'automated', timestamp: new Date(Date.now() - 3500000).toISOString() },
      { role: 'customer', content: 'Does the Stealth Hoodie come in XL black?', type: 'text', timestamp: new Date(Date.now() - 1000000).toISOString() },
    ]
  },
  {
    id: '2',
    customerName: 'Elena Rossi',
    customerUsername: 'elenar_designs',
    lastMessage: 'Price for the designer set?',
    status: 'AI Handled',
    unread: false,
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
    avatarSeed: 'elena',
    messages: [
      { role: 'customer', content: 'Hi! What is the price for the designer set?', type: 'text', timestamp: new Date(Date.now() - 7200000).toISOString() },
      { role: 'ai', content: 'The Designer Set is currently $249. We have it in stock in all sizes!', type: 'automated', timestamp: new Date(Date.now() - 7100000).toISOString() },
    ]
  },
  {
    id: '3',
    customerName: 'Jordan Vance',
    customerUsername: 'jv_tech',
    lastMessage: 'Still waiting on tracking info.',
    status: 'Escalated',
    unread: true,
    updatedAt: new Date(Date.now() - 14400000).toISOString(),
    avatarSeed: 'jordan',
    messages: [
      { role: 'customer', content: 'I ordered 3 days ago and havent seen tracking.', type: 'text', timestamp: new Date(Date.now() - 14400000).toISOString() },
    ]
  }
];

export const MOCK_STATS = {
  leadsRecovered: '2,842',
  aiReplies: '14,209',
  revenueRecovered: '$84,200',
  avgSpeed: '0.4s',
  conversionRate: '18.4%',
  satisfaction: '4.95/5'
};

export const MOCK_LIVE_FEED = [
  { id: 'f1', title: 'Sale Recovered', description: 'AI closed a $249 order with Elena Rossi.', timestamp: '2m ago', type: 'sale' },
  { id: 'f2', title: 'Lead Captured', description: 'New inquiry from @alex_walker qualified by AI.', timestamp: '5m ago', type: 'lead' },
  { id: 'f3', title: 'Auto-Reply Sent', description: 'Stock inquiry handled for @sarah_j.', timestamp: '12m ago', type: 'info' },
  { id: 'f4', title: 'Redirected to WhatsApp', description: 'Customer requested human assistance.', timestamp: '18m ago', type: 'redirect' }
];

export const MOCK_WORKFLOWS = [
  { id: 'w1', name: 'Price Inquiry', trigger: 'Customer asks about cost', action: 'Send Product Catalog', status: 'Active', runs: 842 },
  { id: 'w2', name: 'Stock Check', trigger: 'Customer asks for availability', action: 'Check Shopify Inventory', status: 'Active', runs: 1240 },
  { id: 'w3', name: 'Dormant Follow-up', trigger: 'No reply for 48h', action: 'Send Discount Code', status: 'Paused', runs: 156 }
];
