/**
 * @fileOverview Standardized business-grade mock data for ReplyRush.
 * Focused on operational clarity and realistic sales scenarios.
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
    value: '$1,240.00',
    messages: [
      { role: 'customer', content: 'Hey, I love the new high-performance collection! The textures look premium.', type: 'text', timestamp: new Date(Date.now() - 3600000).toISOString() },
      { role: 'ai', content: 'Thank you Marcus! We designed it specifically for high-intensity training. Are you looking for the Stealth Hoodies or the Compression series?', type: 'automated', timestamp: new Date(Date.now() - 3500000).toISOString() },
      { role: 'customer', content: 'I need 10 Stealth Hoodies in XL for my coaching team. Do you have stock available for immediate dispatch?', type: 'text', timestamp: new Date(Date.now() - 1000000).toISOString() },
      { role: 'ai', content: 'We have 14 units of the Stealth Hoodie in XL Black. For a bulk order of 10, I can apply a 15% discount. That brings your total to $1,020 plus shipping. Should I generate your checkout link?', type: 'automated', timestamp: new Date(Date.now() - 500000).toISOString() },
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
      { role: 'customer', content: 'Hi! What is the final price for the designer set with shipping to Milan?', type: 'text', timestamp: new Date(Date.now() - 7200000).toISOString() },
      { role: 'ai', content: 'The Designer Set is $499. Shipping to Milan is $45 via DHL Express (3-5 days). Would you like me to calculate the total with tax?', type: 'automated', timestamp: new Date(Date.now() - 7100000).toISOString() },
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
    intent: 'Support Request',
    value: '$0.00',
    messages: [
      { role: 'customer', content: 'I ordered 3 days ago and havent seen tracking. Order #8492.', type: 'text', timestamp: new Date(Date.now() - 14400000).toISOString() },
      { role: 'ai', content: 'I apologize for the delay, Jordan. I am escalating this to our logistics team for a manual review. You will receive an update shortly.', type: 'automated', timestamp: new Date(Date.now() - 14300000).toISOString() },
    ]
  }
];

export const MOCK_STATS = {
  leadsRecovered: '12,402',
  aiReplies: '142,942',
  revenueRecovered: '$842,850',
  avgSpeed: '0.08s',
  conversionRate: '31.4%',
  satisfaction: '4.9/5'
};

export const MOCK_LIVE_FEED = [
  { id: 'f1', title: 'Payment Confirmed', description: 'AI closed a $1,020 bulk order with Marcus Sterling.', timestamp: 'Just now', type: 'sale' },
  { id: 'f2', title: 'New Lead', description: '@elenar_designs inquired about international shipping.', timestamp: '4m ago', type: 'lead' },
  { id: 'f3', title: 'Cart Recovered', description: 'Sarah Jenkins completed checkout via follow-up automation.', timestamp: '12m ago', type: 'sale' },
  { id: 'f4', title: 'Ticket Escalated', description: 'Manual review required for order #8492.', timestamp: '22m ago', type: 'info' }
];

export const MOCK_WORKFLOWS = [
  { id: 'w1', name: 'Pricing Automation', trigger: 'Customer asks about price or bulk discounts', action: 'Apply loyalty discount tier', status: 'Active', runs: 8450 },
  { id: 'w2', name: 'Inventory Automation', trigger: 'Product availability inquiry', action: 'Check stock levels and respond', status: 'Active', runs: 12120 },
  { id: 'w3', name: 'Follow-up Automation', trigger: 'No response after 24 hours', action: 'Send courtesy check-in', status: 'Active', runs: 4680 },
  { id: 'w4', name: 'Support Escalation', trigger: 'Frustrated sentiment detected', action: 'Notify team and send apology', status: 'Active', runs: 1240 }
];
