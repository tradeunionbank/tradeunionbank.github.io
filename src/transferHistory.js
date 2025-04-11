export const transferHistory = [
  // --- CREDIT TRANSACTIONS (Every 5 days from Jan 1, 2022 – Apr 6, 2025) ---
  // Total: ~240 entries
  ...Array.from({ length: Math.floor((new Date('2025-04-06') - new Date('2022-01-01')) / (1000 * 60 * 60 * 24 * 5)) + 1 }, (_, i) => {
    const date = new Date(2022, 0, 1 + i * 5); // Jan 1, 2022 + i*5 days
    const dealTypes = ['Endorsement', 
      'LVMH', 
      'Management', 
      'UNICEF Funds', 
      'Insurance', 
      'Prada', 
      'Paradise Casino', 
      'Glass TV', 
      'Channel', 
      'XTM', 
      'California Promo', 
      'BH Entertainment',
      'Jaeger LeCoultre',
      'Project B',
      'BHNC',
      'Trust Wallet Inc',
      'Vogue Magazine',
      'Philips Holdings'
    ];
    const deal = dealTypes[i % dealTypes.length];
    const amount = `+$${(Math.random() * (100000 - 10000) + 10000).toFixed(2)}`;
    return {
      id: 182 + i,
      name: deal,
      amount,
      date: date.toISOString().split('T')[0]
    };
  }),

  // --- DEBIT TRANSACTIONS (Everyday Jan 1, 2021 – Jun 30, 2021) ---
  // Total: 181 entries
  ...Array.from({ length: 181 }, (_, i) => {
    const date = new Date(2021, 0, 1 + i); // Jan 1, 2021 + i days
    const vendors = [
      'Customs Tax Office',
      'Customs Duty Payment',
      'Port Charges',
      'Freight Handling',
      'Shipping Inspection',
      'Border Clearance'
    ];
    const vendor = vendors[i % vendors.length];
    const amount = `-$${(Math.random() * (500 - 50) + 50).toFixed(2)}`;
    return {
      id: i + 1,
      name: vendor,
      amount,
      date: date.toISOString().split('T')[0]
    };
  }),

  
];
