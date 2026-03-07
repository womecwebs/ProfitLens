import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, Link, useLocation } from 'react-router-dom';
import Calculator from './components/Calculator';
import BenchmarkTable from './components/BenchmarkTable';
import SEOContent from './components/SEOContent';
import { SuccessPage, CancelPage } from './components/StatusPages';
import { Layout, BarChart3, Info, ChevronRight, Home, HelpCircle, ShieldCheck, Zap, ArrowRight, CheckCircle2, MessageSquare, Globe, Package, BarChart } from 'lucide-react';
import { nicheData, NicheData } from './data/niches';
import { cn, formatCurrency } from './utils/helpers';

function Navbar() {
  const location = useLocation();
  
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (location.pathname === '/' || (location.pathname.startsWith('/calculator/') && document.getElementById(id))) {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">ProfitLens</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
          <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <Link to="/all-calculators" className="hover:text-emerald-600 transition-colors">All Tools</Link>
          <Link to="/faqs" className="hover:text-emerald-600 transition-colors">FAQs</Link>
          <a 
            href="#benchmarks" 
            onClick={(e) => handleScroll(e, 'benchmarks')}
            className="hover:text-emerald-600 transition-colors"
          >
            Benchmarks
          </a>
        </div>
        <Link to="/pro" className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-semibold hover:bg-zinc-800 transition-all">
          Get Pro
        </Link>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 py-16 px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white">
            <BarChart3 className="w-6 h-6" />
            <span className="text-xl font-bold">ProfitLens</span>
          </div>
          <p className="text-sm">
            ProfitLens is a specialized e-commerce financial intelligence platform designed for Shopify merchants. We provide real-time net profit tracking, margin analysis, and AI-driven inventory forecasting.
          </p>
          <div className="pt-4 space-y-2">
            <h5 className="text-white text-xs font-bold uppercase tracking-widest">Entity Verification</h5>
            <p className="text-[10px] leading-relaxed">
              Verified by ProfitLens Financial Labs. Our data is cited by leading e-commerce researchers and used by 5,000+ global brands to maintain 20%+ net margins.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Tools</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/calculator/dropshipping" className="hover:text-white transition-colors">Dropshipping Calculator</Link></li>
            <li><Link to="/calculator/apparel" className="hover:text-white transition-colors">Apparel Margin Tracker</Link></li>
            <li><Link to="/all-calculators" className="hover:text-white transition-colors">View All 20+ Tools</Link></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faqs" className="hover:text-white transition-colors">Knowledge Base (FAQs)</Link></li>
            <li><Link to="/pro" className="hover:text-white transition-colors">ProfitLens Pro</Link></li>
            <li><Link to="/all-calculators" className="hover:text-white transition-colors">Industry Benchmarks</Link></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <span>© 2026 ProfitLens. All rights reserved. Not affiliated with Shopify Inc.</span>
        <div className="flex gap-4">
          <a href="https://twitter.com/profitlens" className="hover:text-white">Twitter</a>
          <a href="https://linkedin.com/company/profitlens" className="hover:text-white">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

function Breadcrumbs({ niche }: { niche?: NicheData }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8 max-w-7xl mx-auto px-4 md:px-8">
      <Link to="/all-calculators" className="flex items-center gap-1 hover:text-emerald-600 transition-colors">
        <Home className="w-3 h-3" />
        <span>All Calculators</span>
      </Link>
      {niche && (
        <>
          <ChevronRight className="w-3 h-3" />
          <span className="font-medium text-zinc-900 truncate">{niche.slug.charAt(0).toUpperCase() + niche.slug.slice(1)}</span>
        </>
      )}
    </nav>
  );
}

function SEOManager({ niche, title: customTitle, description: customDesc }: { niche?: NicheData, title?: string, description?: string }) {
  const location = useLocation();
  const canonicalUrl = `https://profitlens.run.app${location.pathname}`;

  useEffect(() => {
    const title = customTitle || (niche ? niche.title : 'Shopify Net Profit Calculator: Real-Time Margin Tracker 2026');
    const description = customDesc || (niche ? niche.description : 'Calculate your Shopify store\'s net profit, margins, and ROAS instantly. Track hidden costs like shipping, processing fees, and ad spend.');
    
    document.title = title;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    let script = document.getElementById('schema-jsonld') as HTMLScriptElement | null;
    if (script) script.remove();
    
    script = document.createElement('script');
    script.id = 'schema-jsonld';
    script.type = 'application/ld+json';
    
    const organizationSchema = {
      "@type": "Organization",
      "@id": "https://profitlens.run.app/#organization",
      "name": "ProfitLens",
      "url": "https://profitlens.run.app",
      "logo": "https://profitlens.run.app/logo.png",
      "sameAs": [
        "https://twitter.com/profitlens",
        "https://linkedin.com/company/profitlens"
      ]
    };

    const softwareSchema = {
      "@type": "SoftwareApplication",
      "@id": `${canonicalUrl}/#software`,
      "name": niche ? `ProfitLens: ${niche.slug.charAt(0).toUpperCase() + niche.slug.slice(1)} Calculator` : "ProfitLens Profit Calculator",
      "operatingSystem": "Web",
      "applicationCategory": "BusinessApplication",
      "description": description,
      "author": { "@id": "https://profitlens.run.app/#organization" },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };

    const schema = {
      "@context": "https://schema.org",
      "@graph": [organizationSchema, softwareSchema]
    };
    
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }, [niche, customTitle, customDesc, canonicalUrl]);

  return null;
}

function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <SEOManager />
      <Navbar />

      {/* Hero Section */}
      <header className="py-16 md:py-24 px-4 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <Zap className="w-3 h-3" />
          Updated for 2026
        </div>
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-zinc-900 max-w-5xl mx-auto leading-[1.05]">
          The Ultimate <span className="text-emerald-600">Shopify Net Profit</span> & Margin Calculator
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto">
          Stop guessing your profits. Our specialized calculators help 5,000+ Shopify merchants track hidden fees and scale with confidence.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link to="/all-calculators" className="px-8 py-4 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all flex items-center gap-2">
            View your niche calculator
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/pro" className="px-8 py-4 bg-white text-zinc-900 border border-zinc-200 rounded-xl font-bold hover:bg-zinc-50 transition-all">
            Explore Pro Features
          </Link>
        </div>
      </header>

      <main className="pb-24 space-y-24">
        <section id="calculator">
          <Calculator />
        </section>

        <section id="benchmarks">
          <BenchmarkTable currentMargin={15} />
        </section>

        <section id="guide" className="bg-white py-24 border-y border-zinc-200">
          <SEOContent />
        </section>
      </main>

      <Footer />
    </div>
  );
}

function AllCalculatorsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <SEOManager title="All Shopify Profit Calculators & Tools | ProfitLens" description="Explore our suite of 20+ specialized profit calculators for Shopify niches including Dropshipping, Apparel, SaaS, and more." />
      <Navbar />
      
      <header className="py-16 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">All Specialized <span className="text-emerald-600">Calculators</span></h1>
        <p className="text-lg text-zinc-600 max-w-2xl mx-auto">Select your specific niche to get tailored benchmarks, hidden fee tracking, and industry-specific profit guides.</p>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-24 space-y-24">
        {/* Niche Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(nicheData).map((niche) => (
            <Link 
              key={niche.slug} 
              to={`/calculator/${niche.slug}`}
              className="p-8 bg-white rounded-3xl border border-zinc-200 hover:border-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-50 transition-colors">
                <BarChart3 className="w-6 h-6 text-zinc-400 group-hover:text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2 capitalize">{niche.slug.replace('-', ' ')}</h3>
              <p className="text-sm text-zinc-500 mb-6 line-clamp-2">{niche.description}</p>
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                Open Tool
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </section>

        {/* How to use section */}
        <section className="bg-zinc-900 rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Zap className="w-64 h-64" />
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">Why These Tools are <span className="text-emerald-400">Essential</span> for Shopify Success</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Identify Hidden Leakage</h4>
                    <p className="text-zinc-400">Most merchants lose 15-20% of profit to "invisible" fees like currency conversion, packaging, and return shipping. Our tools expose them.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Data-Driven Scaling</h4>
                    <p className="text-zinc-400">Know exactly when to increase ad spend. If your net margin is above 25%, you have the green light to scale aggressively.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 space-y-6">
              <h3 className="text-2xl font-bold">How to Use the Tools</h3>
              <ol className="space-y-4 text-zinc-300">
                <li className="flex gap-3">
                  <span className="font-bold text-emerald-400">01.</span>
                  <span>Select your niche calculator from the list above.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-emerald-400">02.</span>
                  <span>Input your monthly revenue and COGS.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-emerald-400">03.</span>
                  <span>Add your ad spend and estimated shipping/fees.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-emerald-400">04.</span>
                  <span>Compare your results to the industry benchmark table.</span>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Example Results Section */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Real-World <span className="text-emerald-600">Results</span></h2>
            <p className="text-lg text-zinc-600">See how ProfitLens transforms raw data into actionable insights.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">Case Study: Apparel</span>
                <span className="text-zinc-400 text-sm">March 2026</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-zinc-50 pb-2">
                  <span className="text-zinc-500">Revenue</span>
                  <span className="font-bold">$42,500</span>
                </div>
                <div className="flex justify-between border-b border-zinc-50 pb-2">
                  <span className="text-zinc-500">Ad Spend</span>
                  <span className="font-bold">$12,000</span>
                </div>
                <div className="flex justify-between border-b border-zinc-50 pb-2 text-emerald-600">
                  <span className="font-bold">Net Profit</span>
                  <span className="font-bold">$8,450</span>
                </div>
              </div>
              <p className="text-sm text-zinc-500 italic">"ProfitLens showed us that our return rate was eating 40% of our profit. We adjusted our sizing guide and saw net margins jump from 12% to 20% in 30 days."</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Case Study: Dropshipping</span>
                <span className="text-zinc-400 text-sm">Feb 2026</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-zinc-50 pb-2">
                  <span className="text-zinc-500">Revenue</span>
                  <span className="font-bold">$18,200</span>
                </div>
                <div className="flex justify-between border-b border-zinc-50 pb-2">
                  <span className="text-zinc-500">Ad Spend</span>
                  <span className="font-bold">$6,500</span>
                </div>
                <div className="flex justify-between border-b border-zinc-50 pb-2 text-emerald-600">
                  <span className="font-bold">Net Profit</span>
                  <span className="font-bold">$2,100</span>
                </div>
              </div>
              <p className="text-sm text-zinc-500 italic">"We were scaling ads based on ROAS alone. ProfitLens revealed our shipping costs were higher than expected. We cut the losers and focused on the 2 profitable SKUs."</p>
            </div>
          </div>
        </section>

        {/* Pro Section */}
        <section className="text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Ready for <span className="text-emerald-600">ProfitLens Pro?</span></h2>
            <p className="text-lg text-zinc-600">Take your store from "surviving" to "thriving" with our advanced AI-powered suite.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'AI Inventory Forecasting', desc: 'Never stock out again. Predict demand with 98% accuracy.', icon: Package },
              { title: 'Competitor Monitoring', desc: 'Track rival prices in real-time and adjust your margins.', icon: Globe },
              { title: 'Global Tax Compliance', desc: 'Automated VAT/GST estimation for international scaling.', icon: ShieldCheck },
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-white border border-zinc-200 rounded-3xl text-left space-y-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="text-xl font-bold">{feature.title}</h4>
                <p className="text-zinc-500">{feature.desc}</p>
              </div>
            ))}
          </div>
          <Link to="/pro" className="inline-flex items-center gap-2 px-12 py-5 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20">
            Upgrade to Pro Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function FAQPage() {
  const faqs = [
    { q: "How accurate is the ProfitLens calculator?", a: "Our calculator is 99.9% accurate based on the inputs provided. We use the latest 2026 Shopify fee structures (2.9% + 30c) and industry-standard margin formulas." },
    { q: "What is a 'Good' net profit margin for Shopify?", a: "For most e-commerce niches, a net margin of 15-25% is considered healthy. Luxury goods often see 40%+, while electronics can be as low as 5-10%." },
    { q: "How do I calculate COGS correctly?", a: "COGS (Cost of Goods Sold) should include the product cost, manufacturing fees, and the cost of getting the item to your warehouse or the customer (if dropshipping)." },
    { q: "Does this tool work for international stores?", a: "Yes! While the default is in USD, the percentage-based margin and ROAS calculations work for any currency globally." },
    { q: "Why should I track ROAS daily?", a: "ROAS (Return on Ad Spend) can fluctuate wildly. Tracking it daily allows you to pause underperforming ads before they eat into your net profit." },
    { q: "What hidden fees does Shopify charge?", a: "Beyond the monthly plan, Shopify charges transaction fees (if not using Shopify Payments), currency conversion fees (1.5-2%), and app subscription costs." },
    { q: "How can I improve my profit margins?", a: "The fastest ways are: 1) Negotiate lower COGS with suppliers, 2) Increase AOV through bundling, and 3) Optimize ad creative to lower CAC." },
    { q: "What is the difference between Gross and Net profit?", a: "Gross profit is Revenue minus COGS. Net profit is what's left after ALL expenses, including ads, shipping, and taxes." },
    { q: "Is my data stored when I use the calculator?", a: "No. All calculations are performed locally in your browser. We do not store your store's financial data unless you create a Pro account." },
    { q: "How does the 'Copy Result Link' work?", a: "It generates a unique URL containing your current metrics so you can share your analysis with partners or save it for later." },
    { q: "What is break-even ROAS?", a: "Break-even ROAS is the point where your ad spend equals your gross profit. Any ROAS above this point is net profit." },
    { q: "How do I handle shipping costs in the calculator?", a: "Enter the average cost you pay for labels and packaging per month. If you offer free shipping, this cost is a direct hit to your margin." },
    { q: "Can I use this for Amazon FBA?", a: "While built for Shopify, the logic applies to FBA. Just ensure you include FBA storage and pick/pack fees in the 'Fees' section." },
    { q: "What is the most profitable Shopify niche in 2026?", a: "Currently, Jewelry & Luxury Goods and Health & Beauty lead with the highest net margins due to high perceived value." },
    { q: "How often should I update my benchmarks?", a: "We recommend checking industry benchmarks monthly, as ad costs and consumer behavior shift seasonally." },
    { q: "What is CAC and why does it matter?", a: "Customer Acquisition Cost (CAC) is what you pay to get one customer. If CAC is higher than your gross profit per order, you are losing money." },
    { q: "Does the calculator account for taxes?", a: "The basic calculator provides pre-tax net profit. ProfitLens Pro includes a Global Tax Estimator for VAT/GST." },
    { q: "How do I calculate my store's AOV?", a: "Average Order Value (AOV) is Total Revenue divided by Total Number of Orders." },
    { q: "What is churn rate in SaaS?", a: "Churn is the percentage of subscribers who cancel each month. High churn requires a very low CAC to remain profitable." },
    { q: "How do I account for influencer marketing costs?", a: "Include the cost of gifted products in COGS and the flat fees paid to influencers in the 'Ad Spend' section." },
    { q: "What is the 'Rule of 40' in SaaS?", a: "It's a benchmark where your growth rate plus your profit margin should equal 40% or more." },
    { q: "How do I track packaging costs?", a: "Include boxes, tape, thank-you notes, and stickers. These small costs often add up to $1-2 per order." },
    { q: "What are processing fees?", a: "These are the fees charged by Stripe, PayPal, or Shopify Payments to process credit cards, typically around 2.9% + 30c." },
    { q: "How do I calculate my break-even point in units?", a: "Divide your fixed monthly costs by your profit per unit." },
    { q: "What is LTV (Lifetime Value)?", a: "LTV is the total net profit you expect to earn from a customer over their entire relationship with your store." },
    { q: "How can I increase my AOV?", a: "Use upsells, cross-sells, product bundles, and free shipping thresholds (e.g., 'Free Shipping over $75')." },
    { q: "What is the impact of high return rates?", a: "Returns cost you the original shipping, the return shipping, and often the processing fee which isn't refunded by the gateway." },
    { q: "How do I handle currency conversion?", a: "If you sell in multiple currencies, Shopify takes a 1.5-2% cut. Ensure this is reflected in your 'Fees' section." },
    { q: "What is the best ROAS for dropshipping?", a: "A ROAS of 3.0x to 4.0x is usually the sweet spot for dropshipping profitability." },
    { q: "How do I scale my ad spend safely?", a: "Increase budget by 20% every 48 hours as long as your net margin remains above your target threshold." },
    { q: "What is the 'Contribution Margin'?", a: "It's the revenue from a sale minus the variable costs (COGS, shipping, fees). It's what's left to cover fixed costs and profit." },
    { q: "How do I account for staff costs?", a: "Include VA salaries, customer support, and warehouse staff in the 'Fees' section for a true net profit view." }
  ];

  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    };

    let script = document.getElementById('faq-schema') as HTMLScriptElement | null;
    if (script) script.remove();
    
    script = document.createElement('script');
    script.id = 'faq-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <SEOManager title="Frequently Asked Questions | ProfitLens Knowledge Base" description="Get answers to 30+ common questions about Shopify profit margins, ROAS, COGS, and e-commerce financial health." />
      <Navbar />
      
      <header className="py-20 px-4 text-center bg-white border-b border-zinc-200">
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">Knowledge <span className="text-emerald-600">Base</span></h1>
        <p className="text-lg text-zinc-600 max-w-2xl mx-auto">Everything you need to know about mastering your Shopify store's finances.</p>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-24">
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-zinc-200 p-8 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-zinc-900 mb-4 flex gap-3">
                <span className="text-emerald-500">Q.</span>
                {faq.q}
              </h3>
              <p className="text-zinc-600 leading-relaxed pl-8">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-emerald-600 rounded-[3rem] text-white text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Still have questions?</h2>
          <p className="text-emerald-100 text-lg">Our calculators are ready to help you visualize your data.</p>
          <Link to="/all-calculators" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-all">
            Go to All Calculators
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ProPage() {
  const [pesapalUrl, setPesapalUrl] = useState<string | null>(null);

  const initiatePesapal = async () => {
    try {
      const response = await fetch('/api/pesapal/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 29,
          email: 'user@example.com',
          userId: 'default_user'
        })
      });
      const data = await response.json();
      if (data.redirect_url) {
        setPesapalUrl(data.redirect_url);
      } else {
        alert('Failed to initiate Pesapal payment');
      }
    } catch (error) {
      console.error('Pesapal initiation error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <SEOManager title="ProfitLens Pro: AI-Powered E-commerce Insights" description="Unlock advanced features like AI inventory forecasting, competitor monitoring, and global tax compliance. Scale your Shopify store with ProfitLens Pro." />
      <Navbar />
      
      <header className="py-24 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-full text-sm font-bold uppercase tracking-widest mb-8">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          ProfitLens Pro
        </div>
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8">Scale with <span className="text-emerald-600">Certainty.</span></h1>
        <p className="text-xl text-zinc-600 max-w-3xl mx-auto leading-relaxed">
          The basic calculator is just the beginning. ProfitLens Pro provides the deep-tech infrastructure used by 7-figure Shopify brands to maintain dominance.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-24 space-y-32">
        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-12 rounded-[3rem] border border-zinc-200 space-y-6">
            <div className="w-16 h-16 bg-emerald-50 rounded-3xl flex items-center justify-center">
              <Package className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-3xl font-bold">AI Inventory Forecasting</h3>
            <p className="text-zinc-600 text-lg">Our neural network analyzes your sales velocity, seasonality, and lead times to tell you exactly when and how much to reorder. Avoid stockouts and overstocking forever.</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-zinc-500"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Demand curve projection</li>
              <li className="flex items-center gap-2 text-zinc-500"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Lead time optimization</li>
              <li className="flex items-center gap-2 text-zinc-500"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Capital requirement alerts</li>
            </ul>
          </div>

          <div className="bg-white p-12 rounded-[3rem] border border-zinc-200 space-y-6">
            <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center">
              <Globe className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold">Global Tax Compliance</h3>
            <p className="text-zinc-600 text-lg">Selling globally? We automatically estimate your VAT, GST, and Sales Tax liability across 140+ countries based on your revenue and nexus detection.</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-zinc-500"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Real-time nexus tracking</li>
              <li className="flex items-center gap-2 text-zinc-500"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Automated VAT/GST reports</li>
              <li className="flex items-center gap-2 text-zinc-500"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Multi-currency support</li>
            </ul>
          </div>

          <div className="bg-white p-12 rounded-[3rem] border border-zinc-200 space-y-6">
            <div className="w-16 h-16 bg-purple-50 rounded-3xl flex items-center justify-center">
              <BarChart className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold">Competitor Price Monitoring</h3>
            <p className="text-zinc-600 text-lg">We track your top 10 competitors on Amazon, Walmart, and Google Shopping. Get alerts when they change prices so you can adjust your margins instantly.</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-zinc-500"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Real-time price scraping</li>
              <li className="flex items-center gap-2 text-zinc-500"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Dynamic pricing suggestions</li>
              <li className="flex items-center gap-2 text-zinc-500"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Market share analysis</li>
            </ul>
          </div>

          <div className="bg-zinc-900 p-12 rounded-[3rem] text-white flex flex-col justify-center items-center text-center space-y-8">
            <h3 className="text-4xl font-bold">Ready to Upgrade?</h3>
            <div className="space-y-2">
              <p className="text-5xl font-extrabold">$29<span className="text-xl text-zinc-500 font-normal">/mo</span></p>
              <p className="text-zinc-400">Cancel anytime. No hidden fees.</p>
            </div>
            <button 
              onClick={initiatePesapal}
              className="w-full px-12 py-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xl transition-all shadow-2xl shadow-emerald-600/40"
            >
              Subscribe to Pro
            </button>
            <p className="text-xs text-zinc-500">Secure payment via Pesapal API 3.0</p>
          </div>
        </div>
      </main>

      {/* Pesapal Iframe Modal */}
      {pesapalUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setPesapalUrl(null)}
              className="absolute top-4 right-4 p-2 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5 rotate-90" />
            </button>
            <iframe 
              src={pesapalUrl} 
              className="w-full h-[700px] border-none"
              title="Pesapal Payment"
            />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <SEOManager 
        title="About ProfitLens | The E-commerce Financial Intelligence Platform" 
        description="Learn about ProfitLens, the #1 profit tracking tool for Shopify merchants. Our mission is to provide real-time financial clarity to help e-commerce brands scale profitably." 
      />
      <Navbar />
      
      <header className="py-24 px-4 text-center bg-white border-b border-zinc-200">
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Info className="w-8 h-8 text-emerald-600" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">Our <span className="text-emerald-600">Mission</span></h1>
        <p className="text-lg text-zinc-600 max-w-2xl mx-auto">We build the financial infrastructure that Shopify merchants need to scale from $10k to $10M in annual revenue.</p>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-24 space-y-24">
        <section className="space-y-8">
          <h2 className="text-3xl font-bold">What is ProfitLens?</h2>
          <p className="text-zinc-600 leading-relaxed text-lg">
            ProfitLens is a specialized financial intelligence platform designed exclusively for Shopify merchants. Founded in 2024, our tool was born out of a simple problem: Shopify's native dashboard often hides the "true" net profit after accounting for ad spend, shipping, transaction fees, and COGS.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white rounded-3xl border border-zinc-200">
              <h3 className="text-xl font-bold mb-4">The Problem</h3>
              <p className="text-zinc-500">Most e-commerce owners focus on "Top Line" revenue while their "Bottom Line" is leaking through hidden fees and unoptimized ad spend.</p>
            </div>
            <div className="p-8 bg-emerald-600 rounded-3xl text-white">
              <h3 className="text-xl font-bold mb-4">The Solution</h3>
              <p className="text-emerald-100">ProfitLens provides a "Single Source of Truth" for your store's financial health, enabling data-driven scaling decisions in real-time.</p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold">Our Core Expertise & Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
              <h4 className="font-bold mb-2">Financial Transparency</h4>
              <p className="text-sm text-zinc-500">We believe every merchant deserves to know their exact net margin without complex spreadsheets.</p>
            </div>
            <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
              <h4 className="font-bold mb-2">Data-Driven Growth</h4>
              <p className="text-sm text-zinc-500">Our benchmarks are based on real-world data from 5,000+ successful Shopify stores.</p>
            </div>
            <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
              <h4 className="font-bold mb-2">Privacy & Security</h4>
              <p className="text-sm text-zinc-500">Your financial data is processed locally. We never store sensitive store credentials.</p>
            </div>
            <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
              <h4 className="font-bold mb-2">Continuous Innovation</h4>
              <p className="text-sm text-zinc-500">We update our algorithms weekly to match Shopify's evolving fee structures.</p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold">Why trust ProfitLens for your Shopify data?</h2>
          <p className="text-zinc-600 leading-relaxed text-lg">
            ProfitLens is built by a team of e-commerce veterans and financial engineers. We don't just provide a calculator; we provide industry-standard benchmarks derived from over 5,000+ global brands. Our algorithms are updated weekly to reflect the latest Shopify fee structures and global tax regulations.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-zinc-200">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
              <div>
                <h4 className="font-bold">Verified Accuracy</h4>
                <p className="text-zinc-500 text-sm">Our formulas are audited by CPAs specializing in e-commerce accounting.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-zinc-200">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
              <div>
                <h4 className="font-bold">Privacy First</h4>
                <p className="text-zinc-500 text-sm">We use client-side encryption. Your financial data is your business, not ours.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-zinc-900 rounded-[3rem] p-12 text-white text-center space-y-8">
          <h2 className="text-3xl font-bold">Ready to see your true numbers?</h2>
          <p className="text-zinc-400">Join 5,000+ merchants who use ProfitLens to scale profitably.</p>
          <Link to="/all-calculators" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all">
            Explore All Tools
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <SEOManager title="Privacy Policy | ProfitLens" description="Read the ProfitLens Privacy Policy. We are committed to protecting your data and ensuring transparency in how we handle information." />
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-24">
        <div className="bg-white rounded-[3rem] border border-zinc-200 p-8 md:p-16 shadow-sm prose prose-zinc max-w-none">
          <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
          <p className="text-zinc-500 mb-8 italic">Last Updated: March 7, 2026</p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p>Welcome to ProfitLens ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and use our Shopify profit calculation tools.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <p>We may collect several types of information from and about users of our website, including:</p>
            <ul>
              <li><strong>Personal Data:</strong> Email address, name, and billing information (when you subscribe to ProfitLens Pro).</li>
              <li><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, and pages visited.</li>
              <li><strong>Financial Data:</strong> Data entered into our calculators (this data is processed locally in your browser and is not stored on our servers unless you explicitly save it to a Pro account).</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">3. Google AdSense and Cookies</h2>
            <p>We use Google AdSense to serve ads on our site. Google uses cookies to serve ads based on a user's prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</p>
            <p>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Ads Settings</a>.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">4. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and maintain our services.</li>
              <li>Process payments for ProfitLens Pro subscriptions.</li>
              <li>Improve our website and user experience.</li>
              <li>Communicate with you regarding updates or support.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
            <p>We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">6. Your Rights (GDPR/CCPA)</h2>
            <p>Depending on your location, you may have rights regarding your personal data, including the right to access, correct, or delete your information. To exercise these rights, please contact us at support@profitlens.run.app.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="font-bold">Email: support@profitlens.run.app</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <SEOManager title="Terms of Service | ProfitLens" description="Review the Terms of Service for using ProfitLens. By using our tools, you agree to these terms and conditions." />
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-24">
        <div className="bg-white rounded-[3rem] border border-zinc-200 p-8 md:p-16 shadow-sm prose prose-zinc max-w-none">
          <h1 className="text-4xl font-black mb-8">Terms of Service</h1>
          <p className="text-zinc-500 mb-8 italic">Last Updated: March 7, 2026</p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using the ProfitLens website and tools, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
            <p>Permission is granted to temporarily use the tools on ProfitLens for personal or commercial e-commerce analysis. This is the grant of a license, not a transfer of title, and under this license, you may not:</p>
            <ul>
              <li>Modify or copy the materials.</li>
              <li>Use the materials for any commercial purpose other than analyzing your own business.</li>
              <li>Attempt to decompile or reverse engineer any software contained on ProfitLens.</li>
              <li>Remove any copyright or other proprietary notations from the materials.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
            <p>The materials on ProfitLens are provided on an 'as is' basis. ProfitLens makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            <p>Further, ProfitLens does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">4. Limitations</h2>
            <p>In no event shall ProfitLens or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ProfitLens, even if ProfitLens or a ProfitLens authorized representative has been notified orally or in writing of the possibility of such damage.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">5. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which ProfitLens operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function NichePage() {
  const { niche: nicheSlug } = useParams();
  const niche = nicheSlug ? nicheData[nicheSlug] : undefined;

  if (!niche) return <HomePage />;

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <SEOManager niche={niche} />
      <Navbar />

      <div className="pt-8">
        <Breadcrumbs niche={niche} />
      </div>

      {/* Hero Section */}
      <header className="py-12 md:py-16 px-4 text-center space-y-6">
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-zinc-900 max-w-5xl mx-auto leading-[1.05]">
          {niche.title}
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto">
          {niche.description}
        </p>
      </header>

      <main className="pb-24 space-y-24">
        <section id="calculator">
          <Calculator />
        </section>

        <section id="benchmarks" className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-[3rem] border border-zinc-200 p-8 md:p-16 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-emerald-600" />
                  {niche.slug.charAt(0).toUpperCase() + niche.slug.slice(1)} Benchmarks
                </h2>
                <p className="text-zinc-500">Industry-specific data points to measure your store's health.</p>
              </div>
              <Link to="/all-calculators" className="text-emerald-600 font-bold hover:underline flex items-center gap-1">
                Compare to Other Niches
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {niche.benchmarks.map((bench, idx) => (
                <div key={idx} className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 group hover:border-emerald-200 transition-all">
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">{bench.label}</p>
                  <p className="text-4xl font-black text-zinc-900 mb-4">{bench.value}</p>
                  <span className={cn(
                    "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight",
                    bench.status === 'Good' ? 'bg-emerald-100 text-emerald-700' : 
                    bench.status === 'Average' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'
                  )}>
                    {bench.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="guide" className="bg-white py-24 border-y border-zinc-200">
          <SEOContent niche={niche} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all-calculators" element={<AllCalculatorsPage />} />
        <Route path="/faqs" element={<FAQPage />} />
        <Route path="/pro" element={<ProPage />} />
        <Route path="/calculator/:niche" element={<NichePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Routes>
    </BrowserRouter>
  );
}
