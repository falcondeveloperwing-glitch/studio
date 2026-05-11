export const MOCK_CHATS = [
  {
    id: '1',
    customerName: 'Marcus Sterling',
    customerUsername: 'marcus_fit',
    lastMessage: 'Perfect, send the payment link!',
    status: 'AI Handled',
    unread: true,
    updatedAt: new Date().toISOString(),
    avatarSeed: 'marcus',
    sentiment: 'Positive',
    intent: 'High Purchase Intent',
    messages: [
      { role: 'customer', content: 'Hey, I love the new high-performance collection!', type: 'text', timestamp: new Date(Date.now() - 3600000).toISOString() },
      { role: 'ai', content: 'Thank you Marcus! We designed it specifically for high-intensity training. Are you looking for the hoodies or the compression gear?', type: 'automated', timestamp: new Date(Date.now() - 3500000).toISOString() },
      { role: 'customer', content: 'The Stealth Hoodie. Does it come in XL black? I need it for a shoot next week.', type: 'text', timestamp: new Date(Date.now() - 1000000).toISOString() },
      { role: 'ai', content: 'Yes, we have 4 units left in XL Black! Since you are a recurring customer, I can apply a "Fast-Track" 10% discount if you order in the next 30 minutes. Should I send the link?', type: 'automated', timestamp: new Date(Date.now() - 500000).toISOString() },
      { role: 'customer', content: 'Perfect, send the payment link!', type: 'text', timestamp: new Date().toISOString() },
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
    sentiment: 'Neutral',
    intent: 'Information Seeking',
    messages: [
      { role: 'customer', content: 'Hi! What is the price for the limited designer set?', type: 'text', timestamp: new Date(Date.now() - 7200000).toISOString() },
      { role: 'ai', content: 'The Designer Set is currently $249. It includes the premium canvas bag and the signed lookbook. We have it in stock in all sizes!', type: 'automated', timestamp: new Date(Date.now() - 7100000).toISOString() },
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
    sentiment: 'Frustrated',
    intent: 'Support Escalation',
    messages: [
      { role: 'customer', content: 'I ordered 3 days ago and havent seen tracking. Order #8492.', type: 'text', timestamp: new Date(Date.now() - 14400000).toISOString() },
      { role: 'ai', content: 'I apologize for the delay, Jordan. Checking our dispatch logs... It seems the carrier is experiencing delays in your region. I am escalating this to our logistics team for a manual update.', type: 'automated', timestamp: new Date(Date.now() - 14300000).toISOString() },
    ]
  }
];

export const MOCK_STATS = {
  leadsRecovered: '3,109',
  aiReplies: '16,420',
  revenueRecovered: '$112,400',
  avgSpeed: '0.38s',
  conversionRate: '21.4%',
  satisfaction: '4.98/5'
};

export const MOCK_LIVE_FEED = [
  { id: 'f1', title: 'Sale Recovered', description: 'AI closed a $249 order with Elena Rossi using "Scarcity" trigger.', timestamp: '1m ago', type: 'sale' },
  { id: 'f2', title: 'Lead Qualified', description: 'High-intent lead from @alex_walker auto-tagged as "Elite".', timestamp: '4m ago', type: 'lead' },
  { id: 'f3', title: 'Inventory Sync', description: 'Updated Stealth Hoodie stock across 14 active threads.', timestamp: '10m ago', type: 'info' },
  { id: 'f4', title: 'Escalation', description: 'Manual handover requested for shipping dispute with @jv_tech.', timestamp: '15m ago', type: 'redirect' }
];

export const MOCK_WORKFLOWS = [
  { id: 'w1', name: 'Neural Price Recovery', trigger: 'Customer mentions "price" or "too expensive"', action: 'Offer Dynamic Discount (5-10%)', status: 'Active', runs: 1142 },
  { id: 'w2', name: 'Instant Stock Alert', trigger: 'Customer asks "is this in stock?"', action: 'Query Shopify Inventory + Images', status: 'Active', runs: 2840 },
  { id: 'w3', name: 'Abandoned Recovery', trigger: 'Customer stops replying for 12h', action: 'Send "Still interested?" soft nudge', status: 'Active', runs: 456 }
];