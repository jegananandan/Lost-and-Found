import React from 'react';
import { School, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <School className="w-4 h-4" />
              </div>
              College Lost & Found Portal
            </div>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Official campus platform to report lost belongings, submit found items, connect owners with their property, and streamline claim verification with campus security.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="/items" className="hover:text-white transition-colors">Search All Items</a></li>
              <li><a href="/report-lost" className="hover:text-white transition-colors">Report Lost Item</a></li>
              <li><a href="/report-found" className="hover:text-white transition-colors">Report Found Item</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Campus Security</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Central Administration Office<br />
              Student Support Services Desk<br />
              Hours: Mon - Fri (8:00 AM - 5:00 PM)
            </p>
            <div className="mt-3 flex items-center gap-1 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Campus Product</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} College Lost & Found System. All rights reserved.</p>
          <p>Full-Stack Production System • Powered by Spring Boot & React</p>
        </div>
      </div>
    </footer>
  );
};
