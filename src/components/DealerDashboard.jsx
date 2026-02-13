// import React, { useState } from 'react';
import { 
  TrendingUp, Users, Package, DollarSign, 
  Calendar, Download, Bell, Settings,
  BarChart3, PieChart, Activity, Award
} from 'lucide-react';

const DealerDashboard = () => {
//   const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Sales', value: '₹45.2L', change: '+12.5%', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Products Sold', value: '234', change: '+8.2%', icon: Package, color: 'bg-blue-500' },
    { label: 'Active Deals', value: '12', change: '+23%', icon: Activity, color: 'bg-purple-500' },
    { label: 'New Customers', value: '45', change: '+18%', icon: Users, color: 'bg-orange-500' }
  ];

  const recentDeals = [
    { customer: 'Rajesh Electronics', product: 'Home Inverter 1050VA', value: '₹15,500', status: 'completed' },
    { customer: 'Delhi Power Solutions', product: 'Tubular Battery 180Ah', value: '₹22,800', status: 'pending' },
    { customer: 'Green Energy Corp', product: 'Solar Panel 440W', value: '₹45,000', status: 'processing' }
  ];

  const performanceData = [
    { month: 'Jan', sales: 42 },
    { month: 'Feb', sales: 55 },
    { month: 'Mar', sales: 68 },
    { month: 'Apr', sales: 74 },
    { month: 'May', sales: 89 },
    { month: 'Jun', sales: 95 }
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dealer Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, Premium Dealer • Delhi NCR</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-white rounded-lg shadow hover:shadow-md transition relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 bg-white rounded-lg shadow hover:shadow-md transition">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
            <button className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-lg shadow hover:shadow-lg transition">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Performance Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-900">Sales Performance</h3>
              <select className="text-sm border rounded-lg px-3 py-1">
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
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Recent Deals</h3>
            <div className="space-y-4">
              {recentDeals.map((deal, idx) => (
                <div key={idx} className="flex items-start gap-3 pb-4 border-b last:border-0">
                  <div className={`p-2 rounded-lg ${
                    deal.status === 'completed' ? 'bg-green-100' : 
                    deal.status === 'pending' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <Package className={`h-4 w-4 ${
                      deal.status === 'completed' ? 'text-green-600' :
                      deal.status === 'pending' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-gray-900">{deal.customer}</p>
                    <p className="text-sm text-gray-600">{deal.product}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs font-semibold text-gray-900">{deal.value}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        deal.status === 'completed' ? 'bg-green-100 text-green-700' :
                        deal.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {deal.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              View All Deals →
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Create Order', icon: Package, color: 'bg-blue-500' },
            { label: 'Check Stock', icon: Activity, color: 'bg-purple-500' },
            { label: 'Customer List', icon: Users, color: 'bg-orange-500' },
            { label: 'Price List', icon: TrendingUp, color: 'bg-emerald-500' }
          ].map((action, idx) => {
            const Icon = action.icon;
            return (
              <button key={idx} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition group">
                <div className={`${action.color} w-10 h-10 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </button>
            );
          })}
        </div>

        {/* Achievement Badge */}
        <div className="mt-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-full">
              <Award className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Top Performer of the Month!</h3>
              <p className="text-white/90">You've achieved 150% of your monthly target. Keep up the great work!</p>
            </div>
            <button className="ml-auto bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition">
              Claim Reward
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerDashboard;