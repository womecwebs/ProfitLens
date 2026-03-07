import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, DollarSign, TrendingUp, Percent, Share2, Lock, BarChart, Package, ShieldCheck, Globe, X } from 'lucide-react';
import { formatCurrency, formatPercent, cn } from '../utils/helpers';

interface Metrics {
  revenue: number;
  adSpend: number;
  cogs: number;
  shipping: number;
  fees: number;
}

export default function Calculator() {
  const [metrics, setMetrics] = useState<Metrics>({
    revenue: 10000,
    adSpend: 2000,
    cogs: 3000,
    shipping: 1000,
    fees: 300,
  });

  const [results, setResults] = useState({
    netProfit: 0,
    margin: 0,
    roas: 0,
  });

  const [showPro, setShowPro] = useState(false);
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newMetrics = { ...metrics };
    let hasParams = false;
    
    (Object.keys(metrics) as Array<keyof Metrics>).forEach(key => {
      const val = params.get(key);
      if (val) {
        newMetrics[key] = parseFloat(val);
        hasParams = true;
      }
    });
    
    if (hasParams) {
      setMetrics(newMetrics);
    }
  }, []);

  useEffect(() => {
    const totalCosts = metrics.adSpend + metrics.cogs + metrics.shipping + metrics.fees;
    const netProfit = metrics.revenue - totalCosts;
    const margin = (netProfit / metrics.revenue) * 100;
    const roas = metrics.revenue / (metrics.adSpend || 1);

    setResults({
      netProfit,
      margin: isNaN(margin) ? 0 : margin,
      roas: isNaN(roas) ? 0 : roas,
    });
  }, [metrics]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMetrics(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const copyLink = () => {
    const params = new URLSearchParams(Object.entries(metrics).map(([k, v]) => [k, v.toString()]));
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url);
    alert('Analysis link copied to clipboard!');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto p-4 md:p-8">
      {/* Input Form */}
      <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-black/5 p-6 space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <CalcIcon className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl font-semibold text-zinc-900">Store Metrics</h2>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Total Revenue', name: 'revenue', icon: DollarSign },
            { label: 'Ad Spend', name: 'adSpend', icon: TrendingUp },
            { label: 'COGS (Product Cost)', name: 'cogs', icon: DollarSign },
            { label: 'Shipping Costs', name: 'shipping', icon: DollarSign },
            { label: 'Processing Fees', name: 'fees', icon: Percent },
          ].map((field) => (
            <div key={field.name} className="space-y-1">
              <label className="text-sm font-medium text-zinc-600 flex items-center gap-1">
                <field.icon className="w-3 h-3" />
                {field.label}
              </label>
              <input
                type="number"
                name={field.name}
                value={metrics[field.name as keyof Metrics]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                aria-label={field.label}
              />
            </div>
          ))}
        </div>

        <button
          onClick={copyLink}
          className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-colors font-medium"
        >
          <Share2 className="w-4 h-4" />
          Copy Result Link
        </button>
      </div>

      {/* Results Display */}
      <div className="lg:col-span-2 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            label="Net Profit"
            value={formatCurrency(results.netProfit)}
            isPositive={results.netProfit > 0}
          />
          <ResultCard
            label="Profit Margin"
            value={formatPercent(results.margin)}
            isPositive={results.margin > 15}
          />
          <ResultCard
            label="ROAS"
            value={`${results.roas.toFixed(2)}x`}
            isPositive={results.roas > 3}
          />
        </div>

        {/* Pro Section (Blurred) */}
        <div className="relative group overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8">
          <div className={cn("space-y-8 transition-all duration-500", !showPro && "blur-md select-none pointer-events-none")}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-600">
                  <Package className="w-5 h-5" />
                  <h3 className="text-xl font-bold">Inventory Forecasting</h3>
                </div>
                <p className="text-zinc-600">Based on your current margins and sales velocity, we recommend ordering 542 units by April 15th to avoid stockouts during the Spring peak.</p>
                <div className="h-24 bg-zinc-50 rounded-lg border border-dashed border-zinc-200 flex items-center justify-center text-zinc-400 text-sm">
                  Demand Curve Projection: +12% YoY
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <Globe className="w-5 h-5" />
                  <h3 className="text-xl font-bold">Global Tax Estimation</h3>
                </div>
                <p className="text-zinc-600">Estimated VAT/GST liability for current revenue: <strong>{formatCurrency(metrics.revenue * 0.15)}</strong> (based on average 15% rate).</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">Nexus Detected: CA, NY, TX</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-100">
              <div className="flex items-center gap-2 text-purple-600 mb-4">
                <BarChart className="w-5 h-5" />
                <h3 className="text-xl font-bold">Competitor Price Monitoring</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { site: 'Amazon', price: '$24.99', status: 'Lower' },
                  { site: 'Walmart', price: '$29.99', status: 'Match' },
                  { site: 'Etsy', price: '$34.50', status: 'Higher' },
                ].map(comp => (
                  <div key={comp.site} className="p-3 bg-zinc-50 rounded-lg text-center">
                    <p className="text-xs text-zinc-500">{comp.site}</p>
                    <p className="font-bold">{comp.price}</p>
                    <p className={cn("text-[10px] font-medium", comp.status === 'Lower' ? 'text-rose-500' : 'text-emerald-500')}>
                      {comp.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {!showPro && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[2px] p-6 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Unlock ProfitLens Pro</h3>
              <p className="text-zinc-600 mb-8 max-w-sm">
                Get AI-powered inventory forecasting, global tax compliance, and real-time competitor price tracking.
              </p>
              <div className="w-full max-w-xs">
                <button
                  onClick={initiatePesapal}
                  className="w-full px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 active:scale-95"
                >
                  Upgrade to Pro - $29/mo
                </button>
              </div>
              <p className="mt-4 text-xs text-zinc-400">Secure payment powered by Pesapal</p>
            </div>
          )}
        </div>
      </div>

      {/* Pesapal Iframe Modal */}
      {pesapalUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setPesapalUrl(null)}
              className="absolute top-4 right-4 p-2 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-4 border-b border-zinc-100 bg-zinc-50">
              <h3 className="font-bold text-lg">Complete Your Payment</h3>
            </div>
            <iframe 
              src={pesapalUrl} 
              className="w-full h-[700px] border-none"
              title="Pesapal Payment"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ResultCard({ label, value, isPositive }: { label: string; value: string; isPositive: boolean }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
      <p className="text-sm font-medium text-zinc-500 mb-1">{label}</p>
      <p className={cn(
        "text-3xl font-bold tracking-tight",
        isPositive ? "text-emerald-600" : "text-rose-600"
      )}>
        {value}
      </p>
    </div>
  );
}
