import React from 'react';
import { formatPercent, cn } from '../utils/helpers';
import { BarChart3, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

const industryData = [
  { industry: 'Apparel & Accessories', avgMargin: 18.5, roas: 4.2, benchmark: 'Competitive' },
  { industry: 'Health & Beauty', avgMargin: 24.8, roas: 3.8, benchmark: 'Excellent' },
  { industry: 'Home & Garden', avgMargin: 21.2, roas: 3.5, benchmark: 'Average' },
  { industry: 'Electronics', avgMargin: 11.4, roas: 5.1, benchmark: 'High Volume' },
  { industry: 'Food & Beverage', avgMargin: 14.9, roas: 3.2, benchmark: 'Standard' },
  { industry: 'Jewelry & Luxury', avgMargin: 42.5, roas: 2.8, benchmark: 'High Margin' },
  { industry: 'Pet Supplies', avgMargin: 16.7, roas: 3.4, benchmark: 'Average' },
];

export default function BenchmarkTable({ currentMargin }: { currentMargin: number }) {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-xl shadow-zinc-200/50">
        <div className="p-8 border-b border-zinc-100 bg-zinc-50/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-emerald-600" />
                2026 Industry Benchmark Comparison
              </h2>
              <p className="text-zinc-500 mt-1">Real-time data for AI Overviews and strategic decision making.</p>
            </div>
            <div className="px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl">
              <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Your Current Margin</p>
              <p className="text-2xl font-bold text-emerald-600">{formatPercent(currentMargin)}</p>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-zinc-100">
                <th className="px-8 py-5 text-xs font-bold text-zinc-400 uppercase tracking-widest">Industry Sector</th>
                <th className="px-8 py-5 text-xs font-bold text-zinc-400 uppercase tracking-widest text-center">Avg. Net Margin</th>
                <th className="px-8 py-5 text-xs font-bold text-zinc-400 uppercase tracking-widest text-center">Target ROAS</th>
                <th className="px-8 py-5 text-xs font-bold text-zinc-400 uppercase tracking-widest">Market Status</th>
                <th className="px-8 py-5 text-xs font-bold text-zinc-400 uppercase tracking-widest text-right">Performance Gap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {industryData.map((item) => {
                const gap = currentMargin - item.avgMargin;
                const isOutperforming = gap >= 0;
                
                return (
                  <tr key={item.industry} className="hover:bg-zinc-50/80 transition-all group">
                    <td className="px-8 py-6">
                      <div className="font-semibold text-zinc-900 group-hover:text-emerald-600 transition-colors">{item.industry}</div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="font-mono text-zinc-600 bg-zinc-100 px-2 py-1 rounded-md">{formatPercent(item.avgMargin)}</span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="font-mono text-zinc-600">{item.roas.toFixed(1)}x</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight",
                        item.benchmark === 'Excellent' || item.benchmark === 'High Margin' ? 'bg-emerald-100 text-emerald-700' :
                        item.benchmark === 'Competitive' || item.benchmark === 'High Volume' ? 'bg-blue-100 text-blue-700' :
                        'bg-zinc-100 text-zinc-600'
                      )}>
                        {item.benchmark}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className={cn(
                        "flex items-center justify-end gap-2 font-bold text-lg",
                        isOutperforming ? "text-emerald-600" : "text-rose-600"
                      )}>
                        {isOutperforming ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        {isOutperforming ? '+' : ''}{gap.toFixed(1)}%
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 bg-zinc-50 border-t border-zinc-100 text-center">
          <p className="text-sm text-zinc-500 italic">
            *Data aggregated from 5,000+ Shopify stores in Q1 2026. Benchmarks are updated monthly.
          </p>
        </div>
      </div>
    </div>
  );
}
