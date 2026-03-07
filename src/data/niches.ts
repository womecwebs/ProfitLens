export interface NicheData {
  slug: string;
  title: string;
  description: string;
  benchmarks: {
    label: string;
    value: string;
    status: 'Good' | 'Average' | 'Poor';
  }[];
  guide: {
    howTo: string;
    whyImportant: string;
    proBenefit: string;
  };
}

export const nicheData: Record<string, NicheData> = {
  dropshipping: {
    slug: 'dropshipping',
    title: 'Dropshipping Profit Calculator: Scale Your Store with Accuracy',
    description: 'Calculate net margins for your dropshipping store. Account for high ad spend, AliExpress/CJ COGS, and processing fees. Optimize your ROAS to stay profitable in competitive markets.',
    benchmarks: [
      { label: 'Avg. Net Margin', value: '15-25%', status: 'Average' },
      { label: 'Target ROAS', value: '3.5x', status: 'Good' },
      { label: 'Ad Spend %', value: '30-40%', status: 'Poor' },
    ],
    guide: {
      howTo: 'Enter your total AliExpress/CJ Dropshipping COGS, including shipping. Add your Facebook/TikTok ad spend and Shopify processing fees (2.9% + 30c). The tool instantly calculates your break-even ROAS.',
      whyImportant: 'Dropshipping has thin margins. A 5% increase in shipping or a slight drop in ROAS can turn a profitable day into a loss. Real-time tracking is mandatory for scaling.',
      proBenefit: 'Pro users get automated AliExpress price tracking and TikTok ad spend integration to see real-time margins without manual data entry.'
    }
  },
  apparel: {
    slug: 'apparel',
    title: 'Clothing & Apparel Margin Tracker: Manage Returns & COGS',
    description: 'Track profitability for your fashion brand. Factor in high return rates, seasonal inventory costs, and influencer marketing spend. Ensure your gross margins support sustainable growth.',
    benchmarks: [
      { label: 'Avg. Net Margin', value: '20-35%', status: 'Good' },
      { label: 'Return Rate', value: '25%', status: 'Poor' },
      { label: 'Target ROAS', value: '4.0x', status: 'Good' },
    ],
    guide: {
      howTo: 'Input your manufacturing costs and estimated return rate (industry average is 20-30%). Factor in packaging and influencer gifting costs under "Fees".',
      whyImportant: 'Returns are the profit killer in apparel. If you don\'t account for the 25% of revenue that gets refunded, your "profitable" store might actually be losing money.',
      proBenefit: 'Unlock the Return Rate Impact Simulator to see how reducing returns by 5% can double your net profit.'
    }
  },
  saas: {
    slug: 'saas',
    title: 'SaaS Profitability Calculator: LTV/CAC & Subscription Margins',
    description: 'Analyze your software-as-a-service margins. Focus on recurring revenue, server costs, and customer acquisition costs. Optimize your churn rate and expansion revenue for long-term health.',
    benchmarks: [
      { label: 'Gross Margin', value: '80%+', status: 'Good' },
      { label: 'LTV/CAC Ratio', value: '3:1', status: 'Average' },
      { label: 'Monthly Churn', value: '<5%', status: 'Good' },
    ],
    guide: {
      howTo: 'Enter your MRR as Revenue. Include AWS/Azure costs in COGS. Add your sales team commissions and marketing spend to calculate your CAC payback period.',
      whyImportant: 'SaaS is about the long game. Understanding your gross margin vs. CAC is the difference between a sustainable business and a cash-burning startup.',
      proBenefit: 'Get automated LTV projections and churn-adjusted margin analysis.'
    }
  },
  'home-goods': {
    slug: 'home-goods',
    title: 'Home Goods & Decor Profit Tracker: Shipping & Fragility Costs',
    description: 'Calculate margins for home decor and furniture. Account for oversized shipping fees, breakage rates, and storage costs. High AOV allows for more aggressive ad spend.',
    benchmarks: [
      { label: 'Avg. Net Margin', value: '25-40%', status: 'Good' },
      { label: 'Shipping Cost %', value: '15-20%', status: 'Poor' },
      { label: 'Target ROAS', value: '3.0x', status: 'Average' },
    ],
    guide: {
      howTo: 'Factor in oversized shipping surcharges and a 2-3% breakage allowance in your COGS. Home goods often have high AOV, so focus on your contribution margin per order.',
      whyImportant: 'One broken vase or one oversized shipping error can wipe out the profit of five other orders. Precision in shipping estimation is vital.',
      proBenefit: 'Access the Dimensional Weight Calculator to optimize shipping costs for bulky items.'
    }
  },
  electronics: {
    slug: 'electronics',
    title: 'Electronics & Gadgets Margin Calculator: High Volume, Low Margin',
    description: 'Manage thin margins in the electronics niche. Track warranty reserves, rapid depreciation, and competitive pricing. Focus on cross-selling accessories to boost net profit.',
    benchmarks: [
      { label: 'Avg. Net Margin', value: '5-15%', status: 'Poor' },
      { label: 'Target ROAS', value: '5.0x', status: 'Good' },
      { label: 'Return Rate', value: '10%', status: 'Average' },
    ],
    guide: {
      howTo: 'Input your high COGS and thin margins. Ensure you include a 1-2% reserve for warranty claims and technical support time in your "Fees".',
      whyImportant: 'In electronics, you win on volume and lose on returns. A 10% return rate on a 12% margin product is a disaster. You must track every penny.',
      proBenefit: 'Use the Accessory Cross-Sell Optimizer to see how small add-ons can triple your net margin.'
    }
  },
  beauty: {
    slug: 'beauty',
    title: 'Beauty & Skincare Profit Tracker: High LTV & Repeat Purchases',
    description: 'Optimize beauty brand margins. Factor in packaging costs, sampling programs, and high customer lifetime value. Repeat purchase rates are key to scaling this niche.',
    benchmarks: [
      { label: 'Avg. Net Margin', value: '30-50%', status: 'Good' },
      { label: 'Repeat Rate', value: '40%', status: 'Good' },
      { label: 'Target ROAS', value: '3.5x', status: 'Average' },
    ],
    guide: {
      howTo: 'Include the cost of samples and premium unboxing experiences in your COGS. Track your repeat customer rate to justify higher initial CAC.',
      whyImportant: 'Beauty is a "land and expand" niche. Your first sale might be break-even, but your profit comes from the 2nd, 3rd, and 4th orders.',
      proBenefit: 'Get Cohort Analysis tools to track the profitability of customers over 12 months.'
    }
  },
  fitness: {
    slug: 'fitness',
    title: 'Fitness & Supplements Margin Calculator: Compliance & Trust',
    description: 'Track supplement and fitness equipment margins. Account for certification costs, subscription models, and heavy shipping for weights. High trust leads to high margins.',
    benchmarks: [
      { label: 'Avg. Net Margin', value: '20-40%', status: 'Good' },
      { label: 'Target ROAS', value: '3.0x', status: 'Average' },
      { label: 'Subscription %', value: '25%', status: 'Good' },
    ],
    guide: {
      howTo: 'For supplements, include lab testing and compliance fees. For equipment, ensure "Shipping" accounts for heavy-weight surcharges.',
      whyImportant: 'Fitness is highly competitive. Understanding your subscription "stickiness" is key to knowing how much you can afford to spend on ads.',
      proBenefit: 'Unlock Subscription Revenue Forecasting to see your guaranteed profit for the next 6 months.'
    }
  },
  jewelry: {
    slug: 'jewelry',
    title: 'Jewelry & Accessories Profit Tracker: High Margin, Low Shipping',
    description: 'Calculate net profit for jewelry brands. Benefit from low shipping costs and high perceived value. Focus on branding and photography to maintain premium margins.',
    benchmarks: [
      { label: 'Avg. Net Margin', value: '40-60%', status: 'Good' },
      { label: 'Shipping Cost %', value: '<2%', status: 'Good' },
      { label: 'Target ROAS', value: '4.5x', status: 'Good' },
    ],
    guide: {
      howTo: 'Your shipping costs should be minimal, but your "Ad Spend" and "Fees" (for high-end photography/branding) will be higher. Focus on your Gross Margin.',
      whyImportant: 'Jewelry is a high-margin game. If your margins are below 40%, you aren\'t charging enough for the perceived value you\'re creating.',
      proBenefit: 'Access the Luxury Pricing Tier Simulator to find the "sweet spot" for your brand.'
    }
  },
  pet: {
    slug: 'pet',
    title: 'Pet Supplies Margin Calculator: Loyal Customers & Niche Needs',
    description: 'Track profitability for pet stores. Factor in recurring food orders, specialized health products, and community engagement costs. High retention drives long-term profit.',
    benchmarks: [
      { label: 'Avg. Net Margin', value: '15-30%', status: 'Average' },
      { label: 'Target ROAS', value: '3.2x', status: 'Average' },
      { label: 'Repeat Rate', value: '35%', status: 'Good' },
    ],
    guide: {
      howTo: 'Include the cost of heavy shipping for pet food. Track your "Subscribe & Save" discounts as a reduction in Revenue.',
      whyImportant: 'Pet owners are the most loyal customers. Your profit is built on the recurring nature of the niche, not just the first sale.',
      proBenefit: 'Get automated "Subscribe & Save" impact analysis to optimize your discount tiers.'
    }
  },
  toys: {
    slug: 'toys',
    title: 'Toys & Hobbies Profit Tracker: Seasonality & Safety Compliance',
    description: 'Manage toy store margins. Account for Q4 seasonality, safety testing fees, and inventory risk. High volume during holidays requires careful cash flow management.',
    benchmarks: [
      { label: 'Avg. Net Margin', value: '10-25%', status: 'Average' },
      { label: 'Q4 Revenue %', value: '60%', status: 'Poor' },
      { label: 'Target ROAS', value: '4.0x', status: 'Good' },
    ],
    guide: {
      howTo: 'Factor in safety certification costs in "Fees". Be aggressive with ad spend in Q4, but ensure you have enough margin to cover holiday shipping surcharges.',
      whyImportant: 'Toys is a seasonal business. You make 80% of your profit in 20% of the year. If your margins are off in November, your whole year is ruined.',
      proBenefit: 'Unlock the Holiday Inventory Risk Manager to avoid overstocking after the peak.'
    }
  },
  automotive: {
    slug: 'automotive',
    title: 'Auto Parts & Accessories Margin Calculator: Specialized Knowledge',
    description: 'Track auto niche margins. Factor in heavy shipping for parts, high technical support costs, and fitment accuracy. Specialized niches command higher margins.',
    benchmarks: [
      { label: 'Avg. Net Margin', value: '20-35%', status: 'Good' },
      { label: 'Target ROAS', value: '3.5x', status: 'Average' },
      { label: 'Return Rate', value: '8%', status: 'Average' },
    ],
    guide: {
      howTo: 'Include the cost of expert support staff in your "Fees". Shipping for heavy parts like brakes or suspension must be precisely calculated.',
      whyImportant: 'Fitment errors lead to expensive returns. High margins are necessary to cover the technical complexity of the niche.',
      proBenefit: 'Get the Fitment Error Cost Tracker to see how much "wrong part" returns are costing you.'
    }
  },
  art: {
    slug: 'art',
    title: 'Art & Collectibles Profit Tracker: Perceived Value & Rarity',
    description: 'Calculate margins for art and collectibles. Focus on scarcity, authentication costs, and specialized packaging. High margins are driven by emotional connection.',
    benchmarks: [
      { label: 'Avg. Net Margin', value: '50%+', status: 'Good' },
      { label: 'Target ROAS', value: '2.5x', status: 'Poor' },
      { label: 'Inventory Turnover', value: 'Low', status: 'Poor' },
    ],
    guide: {
      howTo: 'Include high-end packaging and insurance in your "Shipping". COGS might be low for prints but high for originals. Focus on your brand premium.',
      whyImportant: 'Art is subjective. Your margin is a reflection of your brand authority. If you compete on price, you lose the luxury appeal.',
      proBenefit: 'Access the Scarcity Pricing Model to optimize margins for limited edition releases.'
    }
  },
  food: {
    slug: 'food',
    title: 'Food & Beverage Margin Calculator: Perishability & Regulation',
    description: 'Manage F&B margins. Account for shelf life, cold chain shipping, and FDA compliance. High volume and repeat orders are essential for sustainability.',
    benchmarks: [
      { label: 'Avg. Net Margin', value: '10-20%', status: 'Poor' },
      { label: 'Target ROAS', value: '3.0x', status: 'Average' },
      { label: 'Repeat Rate', value: '50%+', status: 'Good' },
    ],
    guide: {
      howTo: 'Include spoilage rates (usually 5-10%) in your COGS. Cold-chain shipping costs must be added to "Shipping" for perishables.',
      whyImportant: 'Food has the tightest margins and highest regulatory risk. You must win on repeat orders and high customer density.',
      proBenefit: 'Get the Spoilage Impact Tracker to see how shelf-life improvements affect your bottom line.'
    }
  },
  outdoor: {
    slug: 'outdoor',
    title: 'Outdoor & Camping Profit Tracker: Durability & High AOV',
    description: 'Track margins for outdoor gear. Factor in high product durability, seasonal demand, and technical specs. High AOV items allow for higher CAC.',
    benchmarks: [
      { label: 'Avg. Net Margin', value: '25-45%', status: 'Good' },
      { label: 'Target ROAS', value: '3.5x', status: 'Average' },
      { label: 'AOV', value: '$150+', status: 'Good' },
    ],
    guide: {
      howTo: 'Factor in high manufacturing costs for technical gear. Use the high AOV to justify more expensive, high-intent search ads.',
      whyImportant: 'Outdoor gear is a trust-based purchase. Customers will pay more for quality, but your COGS will be higher to match those expectations.',
      proBenefit: 'Unlock the AOV Expansion Tool to see how bundling gear can increase your net profit per click.'
    }
  },
  stationery: {
    slug: 'stationery',
    title: 'Stationery & Office Profit Calculator: Low AOV, High Repeat',
    description: 'Manage stationery margins. Focus on bundling, subscription boxes, and low shipping weights. High repeat purchase rates offset low AOVs.',
    benchmarks: [
      { label: 'Avg. Net Margin', value: '20-35%', status: 'Good' },
      { label: 'Target ROAS', value: '4.0x', status: 'Good' },
      { label: 'Repeat Rate', value: '30%', status: 'Average' },
    ],
    guide: {
      howTo: 'Focus on bundling small items to increase AOV. Your shipping costs are low, so use that to offer "Free Shipping" as a conversion tool.',
      whyImportant: 'In stationery, the profit is in the "add-on". A single pen is a loss, but a desk set is a win.',
      proBenefit: 'Get the Bundle Profitability Analyzer to find your most profitable product combinations.'
    }
  },
  garden: {
    slug: 'garden',
    title: 'Garden & Patio Margin Tracker: Seasonal Peaks & Weight',
    description: 'Calculate margins for gardening supplies. Account for heavy soil/pot shipping, spring seasonality, and local delivery options. Q2 is your profit engine.',
    benchmarks: [
      { label: 'Avg. Net Margin', value: '20-40%', status: 'Good' },
      { label: 'Target ROAS', value: '3.2x', status: 'Average' },
      { label: 'Seasonality Index', value: 'High', status: 'Poor' },
    ],
    guide: {
      howTo: 'Include heavy-weight shipping surcharges. Plan your ad spend to peak in March/April. Factor in local delivery costs if applicable.',
      whyImportant: 'Gardening is a race against the season. If you don\'t capture the Spring demand with profitable margins, you can\'t survive the Winter.',
      proBenefit: 'Unlock the Seasonal Cash Flow Forecaster to manage inventory during the off-season.'
    }
  },
  books: {
    slug: 'books',
    title: 'Books & Media Profit Calculator: Low Margin, High Volume',
    description: 'Manage media margins. Factor in low unit prices, media mail shipping, and high competition. Focus on niche genres and rare finds for better profit.',
    benchmarks: [
      { label: 'Avg. Net Margin', value: '5-15%', status: 'Poor' },
      { label: 'Target ROAS', value: '6.0x', status: 'Good' },
      { label: 'Shipping Cost', value: 'Low', status: 'Good' },
    ],
    guide: {
      howTo: 'Use Media Mail for shipping to keep costs low. Focus on high-volume search terms or very specific niche genres where competition is lower.',
      whyImportant: 'Books are a commodity. You win on volume and low overhead. Every cent saved in shipping is a cent added to your profit.',
      proBenefit: 'Get the Genre Profitability Heatmap to see which book categories have the best margins.'
    }
  },
  baby: {
    slug: 'baby',
    title: 'Baby & Kids Margin Tracker: Safety, Trust & Lifetime Value',
    description: 'Track baby niche margins. Account for safety certifications, high return rates for sizing, and long-term customer value as kids grow. Trust is the primary currency.',
    benchmarks: [
      { label: 'Avg. Net Margin', value: '20-35%', status: 'Good' },
      { label: 'Target ROAS', value: '3.5x', status: 'Average' },
      { label: 'LTV', value: 'High', status: 'Good' },
    ],
    guide: {
      howTo: 'Include safety testing and liability insurance in your "Fees". Factor in high return rates for clothing and shoes.',
      whyImportant: 'Parents are high-value customers. If you win their trust with the first purchase, you have a customer for the next 5-10 years.',
      proBenefit: 'Unlock the Age-Based Retention Modeler to predict future revenue as your customers\' children grow.'
    }
  },
  luxury: {
    slug: 'luxury',
    title: 'Luxury Goods Profit Calculator: Exclusivity & High Margin',
    description: 'Calculate margins for luxury items. Focus on brand equity, white-glove service, and high perceived value. Low volume is offset by massive unit profit.',
    benchmarks: [
      { label: 'Avg. Net Margin', value: '60%+', status: 'Good' },
      { label: 'Target ROAS', value: '2.0x', status: 'Poor' },
      { label: 'AOV', value: '$500+', status: 'Good' },
    ],
    guide: {
      howTo: 'Include white-glove shipping and premium packaging in your "Shipping". Your "Ad Spend" will be high per conversion, but your unit profit is massive.',
      whyImportant: 'Luxury is about the experience. If your margins are thin, you can\'t afford the level of service that luxury customers expect.',
      proBenefit: 'Access the High-Net-Worth Targeting Guide to optimize your ad spend for affluent buyers.'
    }
  },
  subscription: {
    slug: 'subscription',
    title: 'Subscription Box Margin Tracker: Churn & Predictability',
    description: 'Manage subscription box margins. Focus on churn rate, box COGS, and shipping consistency. Predictable revenue allows for better inventory planning.',
    benchmarks: [
      { label: 'Avg. Net Margin', value: '25-40%', status: 'Good' },
      { label: 'Monthly Churn', value: '7%', status: 'Average' },
      { label: 'Target ROAS', value: '3.0x', status: 'Average' },
    ],
    guide: {
      howTo: 'Include the cost of the box, packing materials, and the items inside in your COGS. Track your monthly churn as a direct hit to your long-term margin.',
      whyImportant: 'Subscription boxes live and die by churn. If you lose 10% of your customers every month, you are constantly running just to stay in place.',
      proBenefit: 'Get the Churn Reduction Simulator to see how increasing retention by 2% affects your 12-month profit.'
    }
  }
};
