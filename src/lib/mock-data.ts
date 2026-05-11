/**
 * @fileOverview High-fidelity mock data for the ReplyRush AI production demo.
 */

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
    value: '$249.00',
    messages: [
      { role: 'customer', content: 'Hey, I love the new high-performance collection! The textures look premium.', type: 'text', timestamp: new Date(Date.now() - 3600000).toISOString() },
      { role: 'ai', content: 'Thank you Marcus! We designed it specifically for high-intensity training environments. Are you looking for the Stealth Hoodies or the Compression series?', type: 'automated', timestamp: new Date(Date.now() - 3500000).toISOString() },
      { role: 'customer', content: 'The Stealth Hoodie. Does it come in XL black? I need it for a shoot next week.', type: 'text', timestamp: new Date(Date.now() - 1000000).toISOString() },
      { role: 'ai', content: 'Yes, we have 4 units left in XL Black! Since you are a recurring customer, I can apply a "Fast-Track" 10% loyalty credit if you order in the next 15 minutes. Should I generate your secure checkout link?', type: 'automated', timestamp: new Date(Date.now() - 500000).toISOString() },
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
    value: '$499.00',
    messages: [
      { role: 'customer', content: 'Hi! What is the final price for the limited designer set with international shipping to Milan?', type: 'text', timestamp: new Date(Date.now() - 7200000).toISOString() },
      { role: 'ai', content: 'The Designer Set is currently $499. International shipping to Milan is typically $45 via DHL Express (3-5 days). We have 2 sets left in the European warehouse. Would you like me to calculate the total with tax?', type: 'automated', timestamp: new Date(Date.now() - 7100000).toISOString() },
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
    value: '$0.00',
    messages: [
      { role: 'customer', content: 'I ordered 3 days ago and havent seen tracking. Order #8492. This is urgent.', type: 'text', timestamp: new Date(Date.now() - 14400000).toISOString() },
      { role: 'ai', content: 'I apologize for the delay, Jordan. Checking our dispatch logs... It seems the carrier is experiencing delays in your region. I am escalating this to our logistics lead for a manual override. You will receive an SMS update shortly.', type: 'automated', timestamp: new Date(Date.now() - 14300000).toISOString() },
    ]
  }
];

export const MOCK_STATS = {
  leadsRecovered: '4,102',
  aiReplies: '18,942',
  revenueRecovered: '$142,850',
  avgSpeed: '0.24s',
  conversionRate: '24.8%',
  satisfaction: '4.99/5'
};

export const MOCK_LIVE_FEED = [
  { id: 'f1', title: 'Revenue Recovered', description: 'AI closed a $499 order with Elena Rossi. Scarcity trigger: "Last 2 Units".', timestamp: 'Just now', type: 'sale' },
  { id: 'f2', title: 'High Intent Lead', description: '@marcus_fit reached checkout phase. Intent: 98% Readiness.', timestamp: '3m ago', type: 'lead' },
  { id: 'f3', title: 'Global Sync', description: 'Inventory levels updated across 42 active negotiations.', timestamp: '8m ago', type: 'info' },
  { id: 'f4', title: 'Escalation Logged', description: 'Handed off #8492 to Human Support. Reason: Logistics delay.', timestamp: '14m ago', type: 'redirect' }
];

export const MOCK_WORKFLOWS = [
  { id: 'w1', name: 'Neural Price Strategy', trigger: 'Customer mentions "price" or "expensive"', action: 'Dynamic Loyalty Discount (10%)', status: 'Active', runs: 1450 },
  { id: 'w2', name: 'Instant Stock Intelligence', trigger: 'Inquiry: "is this in stock?"', action: 'Live ERP Query + High-Res Image', status: 'Active', runs: 3120 },
  { id: 'w3', name: 'Dormant Lead Nudge', trigger: 'Inactivity > 18 hours', action: 'Personalized "Check-in" sequence', status: 'Active', runs: 680 }
];
