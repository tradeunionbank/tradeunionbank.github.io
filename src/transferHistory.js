export const transferHistory = [
  // --- CREDIT TRANSACTIONS (Every 5 days from today back to Jan 1, 2022) ---
  ...(() => {
    const startDate = new Date(); // today
    const endDate = new Date('2022-01-01');
    const creditEntries = [];
    const dealTypes = [
      'Endorsement', 
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

    let currentDate = new Date(startDate);
    let i = 0;
    while (currentDate >= endDate) {
      const deal = dealTypes[i % dealTypes.length];
      const amount = `+$${(Math.random() * (100000 - 10000) + 10000).toFixed(2)}`;
      creditEntries.push({
        id: 1000 + i,
        name: deal,
        amount,
        date: currentDate.toISOString().split('T')[0],
      });
      currentDate.setDate(currentDate.getDate() - 5); // go back 5 days
      i++;
    }
    return creditEntries;
  })(),

  // --- DEBIT TRANSACTIONS (Every day Jan 1 – Jun 30, 2021) ---
  ...Array.from({ length: 181 }, (_, i) => {
    const date = new Date(2021, 0, 1 + i);
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
