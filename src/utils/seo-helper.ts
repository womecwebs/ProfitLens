export const SEO_CONFIG = {
  title: "Shopify Net Profit Calculator: Real-Time Margin Tracker 2026",
  description: "Calculate your Shopify store's net profit, margins, and ROAS instantly. Track hidden costs like shipping, processing fees, and ad spend.",
  keywords: "Shopify profit calculator, net profit tracker, ecommerce margin calculator, ROAS calculator, Shopify fees",
};

export const generateSchemaMarkup = () => {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ProfitLens",
    "operatingSystem": "Web",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "ProfitLens helps Shopify merchants track net profit after all hidden costs, enabling data-driven ad spend and inventory decisions."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How to calculate Shopify profit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate Shopify net profit, subtract COGS, shipping costs, processing fees, and ad spend from your total revenue."
        }
      },
      {
        "@type": "Question",
        "name": "What is a good Shopify profit margin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A healthy Shopify profit margin typically ranges between 15% and 25%, depending on the industry and scale."
        }
      }
    ]
  };

  return [softwareSchema, faqSchema];
};
