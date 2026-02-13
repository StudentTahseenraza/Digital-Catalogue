import React, { useState } from 'react';
import { 
  TrendingUp, Users, Package, DollarSign, 
  Calendar, Download, Bell, Settings,
  Activity, Award, X, ChevronRight,
  BarChart3, PieChart, Clock, Phone, Mail
} from 'lucide-react';

const DealerDashboard = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('month');

  const stats = [
    { label: 'Total Sales', value: '₹45.2L', change: '+12.5%', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Products Sold', value: '234', change: '+8.2%', icon: Package, color: 'bg-blue-500' },
    { label: 'Active Deals', value: '12', change: '+23%', icon: Activity, color: 'bg-purple-500' },
    { label: 'New Customers', value: '45', change: '+18%', icon: Users, color: 'bg-orange-500' }
  ];

  const recentDeals = [
    { customer: 'Rajesh Electronics', product: 'Home Inverter 1050VA', value: '₹15,500', status: 'completed', date: '2024-02-13' },
    { customer: 'Delhi Power Solutions', product: 'Tubular Battery 180Ah', value: '₹22,800', status: 'pending', date: '2024-02-12' },
    { customer: 'Green Energy Corp', product: 'Solar Panel 440W', value: '₹45,000', status: 'processing', date: '2024-02-11' },
    { customer: 'Mumbai Electronics', product: 'Online UPS 3KVA', value: '₹32,500', status: 'completed', date: '2024-02-10' }
  ];

  const performanceData = [
    { month: 'Jan', sales: 42 },
    { month: 'Feb', sales: 55 },
    { month: 'Mar', sales: 68 },
    { month: 'Apr', sales: 74 },
    { month: 'May', sales: 89 },
    { month: 'Jun', sales: 95 }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="relative bg-white rounded-2xl max-w-7xl mx-auto shadow-2xl">
          
          {/* Header with Close Button */}
          <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-200 p-4 sm:p-6 flex justify-between items-center z-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Dealer Dashboard</h2>
              <p className="text-sm text-gray-600 mt-1">Welcome back, Premium Dealer • Delhi NCR</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition ml-2"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Date Range Selector */}
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-wrap gap-2 items-center justify-between">
              <div className="flex gap-2">
                {['day', 'week', 'month', 'year'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setDateRange(range)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition ${
                      dateRange === range
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                <Download className="h-4 w-4" />
                Export Report
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-4 sm:p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <span className={`text-sm font-medium ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Performance Chart */}
              <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-gray-900">Sales Performance</h3>
                  <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-white">
                    <option>Last 6 months</option>
                    <option>Last year</option>
                  </select>
                </div>
                <div className="h-64 flex items-end gap-3">
                  {performanceData.map((data, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-gradient-to-t from-emerald-500 to-teal-500 rounded-t-lg transition-all hover:from-emerald-600"
                        style={{ height: `${data.sales}px` }}
                      />
                      <span className="text-xs text-gray-600">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Deals */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Deals</h3>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {recentDeals.map((deal, idx) => (
                    <div key={idx} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                      <div className={`p-2 rounded-lg ${getStatusColor(deal.status)}`}>
                        <Package className="h-4 w-4" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-gray-900">{deal.customer}</p>
                        <p className="text-sm text-gray-600">{deal.product}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs font-semibold text-gray-900">{deal.value}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(deal.status)}`}>
                            {deal.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Create Order', icon: Package, color: 'bg-blue-500' },
                { label: 'Check Stock', icon: Activity, color: 'bg-purple-500' },
                { label: 'Customer List', icon: Users, color: 'bg-orange-500' },
                { label: 'Price List', icon: TrendingUp, color: 'bg-emerald-500' }
              ].map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition group">
                    <div className={`${action.color} w-10 h-10 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{action.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Achievement Badge */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="bg-white/20 p-4 rounded-full">
                  <Award className="h-8 w-8" />
                </div>
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-xl font-bold mb-1">Top Performer of the Month!</h3>
                  <p className="text-white/90">You've achieved 150% of your monthly target.</p>
                </div>
                <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition w-full sm:w-auto">
                  Claim Reward
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg flex flex-wrap gap-4 justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">+91-8045910957</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">dealer@powersolutions.in</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-600">Support: 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerDashboard;