/**
 * @fileOverview High-fidelity production-grade mock data for ReplyRush AI.
 * Focuses on high-revenue business scenarios and realistic intent.
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
      { role: 'ai', content: 'Thank you Marcus! We designed it specifically for high-intensity training environments. Are you looking for the Stealth Hoodies or the Compression series?', type: 'automated', timestamp: new Date(Date.now() - 3500000).toISOString() },
      { role: 'customer', content: 'I need 10 Stealth Hoodies in XL for my coaching team. Do you have bulk stock available for immediate dispatch?', type: 'text', timestamp: new Date(Date.now() - 1000000).toISOString() },
      { role: 'ai', content: 'We currently have 14 units of the Stealth Hoodie in XL Black. For a bulk order of 10, I can apply our "Operations Tier" 15% discount. That brings your total to $1,020 plus $220 for DHL Express overnight. Should I generate your secure checkout link?', type: 'automated', timestamp: new Date(Date.now() - 500000).toISOString() },
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
      { role: 'ai', content: 'The Designer Set is currently $499. International shipping to Milan is typically $45 via DHL Express (3-5 days). We have 2 sets left in our European warehouse. Would you like me to calculate the total with tax?', type: 'automated', timestamp: new Date(Date.now() - 7100000).toISOString() },
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
      { role: 'customer', content: 'I ordered 3 days ago and havent seen tracking. Order #8492. This is urgent as I have a launch tomorrow.', type: 'text', timestamp: new Date(Date.now() - 14400000).toISOString() },
      { role: 'ai', content: 'I apologize for the delay, Jordan. Checking our dispatch logs... It seems the carrier is experiencing delays in the Tri-State area. I am escalating this to our logistics lead for a manual override and courier upgrade. You will receive an SMS update within 15 minutes.', type: 'automated', timestamp: new Date(Date.now() - 14300000).toISOString() },
    ]
  },
  {
    id: '4',
    customerName: 'Sarah Jenkins',
    customerUsername: 's_jenkins_style',
    lastMessage: 'Is the 20% discount still active?',
    status: 'AI Handled',
    unread: false,
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    avatarSeed: 'sarah',
    sentiment: 'Positive',
    intent: 'Promotional Recovery',
    value: '$185.00',
    messages: [
      { role: 'customer', content: 'I saw a 20% code on your story yesterday but it seems expired. Is there any way to still use it?', type: 'text', timestamp: new Date(Date.now() - 86400000).toISOString() },
      { role: 'ai', content: 'Hi Sarah! That flash sale ended at midnight, but I see you have been a customer since 2023. I can reactivate a personalized loyalty code for the next 2 hours. Would you like me to apply it to your cart?', type: 'automated', timestamp: new Date(Date.now() - 86300000).toISOString() },
    ]
  }
];

export const MOCK_STATS = {
  leadsRecovered: '12,402',
  aiReplies: '142,942',
  revenueRecovered: '$842,850',
  avgSpeed: '0.08s',
  conversionRate: '31.4%',
  satisfaction: '4.98/5'
};

export const MOCK_LIVE_FEED = [
  { id: 'f1', title: 'Revenue Recovered', description: 'AI closed a $1,020 bulk order with Marcus Sterling. Logic: Operations-Tier Discount Applied.', timestamp: 'Just now', type: 'sale' },
  { id: 'f2', title: 'High Intent Lead', description: '@elenar_designs inquired about Milan shipping. Automated quote delivered. Probability: 84%.', timestamp: '4m ago', type: 'lead' },
  { id: 'f3', title: 'Cart Recovery', description: 'Sarah Jenkins reactivated via personalized loyalty sequence. $185 value pending.', timestamp: '12m ago', type: 'sale' },
  { id: 'f4', title: 'Escalation Logged', description: 'Manual hand-off for order #8492. Reason: Urgent Logistics Override required.', timestamp: '22m ago', type: 'redirect' },
  { id: 'f5', title: 'Inventory Sync', description: 'Global SKU inventory updated across 86 active thread negotiations.', timestamp: '45m ago', type: 'info' }
];

export const MOCK_WORKFLOWS = [
  { id: 'w1', name: 'Neural Pricing Logic', trigger: 'Customer mentions "price", "bulk", or "discount"', action: 'Tiered Loyalty Discount (10-20%)', status: 'Active', runs: 8450 },
  { id: 'w2', name: 'Inventory Intelligence', trigger: 'Inquiry: "in stock", "available", or SKU codes', action: 'Live ERP Check + Scarcity Nudge', status: 'Active', runs: 12120 },
  { id: 'w3', name: 'Dormant Lead Recovery', trigger: 'Inactivity > 24 hours post-quote', action: 'Sentiment-driven "Check-in" sequence', status: 'Active', runs: 4680 },
  { id: 'w4', name: 'Logistics Escalation', trigger: 'Sentiment: Frustrated + Keyword: "tracking", "delay"', action: 'Priority Slack Alert + AI Apology', status: 'Active', runs: 1240 }
];
