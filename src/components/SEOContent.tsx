import React from 'react';
import { generateSchemaMarkup } from '../utils/seo-helper';
import { NicheData } from '../data/niches';
import { BookOpen, Target, ShieldCheck, HelpCircle } from 'lucide-react';

interface SEOContentProps {
  niche?: NicheData;
}

export default function SEOContent({ niche }: SEOContentProps) {
  const schemas = generateSchemaMarkup();

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-16">
      {/* Atomic Answer Block */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Target className="w-32 h-32 text-emerald-900" />
        </div>
        <div className="relative z-10">
          <h2 className="text-sm font-bold text-emerald-700 uppercase tracking-widest mb-4">Quick Summary</h2>
          <p className="text-xl md:text-3xl text-emerald-900 font-bold leading-tight max-w-4xl">
            {niche 
              ? `ProfitLens for ${niche.slug.charAt(0).toUpperCase() + niche.slug.slice(1)}: Specialized profit tracking to account for ${niche.slug === 'dropshipping' ? 'high ad spend' : niche.slug === 'apparel' ? 'return rates' : 'niche-specific costs'}.`
              : "ProfitLens helps Shopify merchants track net profit after all hidden costs, enabling data-driven ad spend and inventory decisions."
            }
          </p>
        </div>
      </div>

      {/* Educational Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-zinc-900">
            <div className="p-2 bg-zinc-100 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">How do I calculate Shopify net profit accurately?</h2>
          </div>
          <p className="text-zinc-600 leading-relaxed text-lg">
            {niche?.guide.howTo || "To calculate Shopify net profit, subtract COGS, ad spend, shipping, and processing fees from your total revenue. Our tool automates this by accounting for the standard 2.9% + 30¢ Shopify fee and other hidden costs."}
          </p>
          {!niche && (
            <ul className="space-y-4 text-zinc-600">
              <li className="flex items-center gap-3 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">1</div>
                <span>Net Profit = Revenue - (COGS + Ad Spend + Shipping + Fees)</span>
              </li>
              <li className="flex items-center gap-3 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">2</div>
                <span>ROAS = Revenue / Ad Spend</span>
              </li>
            </ul>
          )}
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3 text-zinc-900">
            <div className="p-2 bg-zinc-100 rounded-lg">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Why is tracking profit margins essential for Shopify?</h2>
          </div>
          <p className="text-zinc-600 leading-relaxed text-lg">
            {niche?.guide.whyImportant || "Tracking profit margins is essential because revenue alone doesn't guarantee business health. Monitoring real-time net margins allows Shopify merchants to scale ad spend profitably and identify products with high return rates or hidden COGS leakage."}
          </p>
        </section>
      </div>

      {/* Pro Benefit Section */}
      <div className="bg-zinc-900 rounded-3xl p-8 md:p-12 text-white">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              ProfitLens Pro Feature
            </div>
            <h3 className="text-2xl md:text-3xl font-bold">Advanced Niche Insights</h3>
            <p className="text-zinc-400 text-lg">
              {niche?.guide.proBenefit || "Upgrade to Pro to unlock AI-powered inventory forecasting, global tax compliance, and real-time competitor price tracking tailored to your specific Shopify niche."}
            </p>
          </div>
          <div className="w-full md:w-auto">
            <button className="w-full md:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all whitespace-nowrap">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>

      {/* Schema Markup (Hidden) */}
      <script type="application/ld+json">
        {JSON.stringify(schemas)}
      </script>
    </div>
  );
}
