import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Award, Users, Shield, Phone, Mail, TrendingUp, Zap, Battery, Sun } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  const handleGetBestPrice = () => {
    // Navigate to home page with contact section hash
    navigate('/#contact');
    
    // Scroll to contact section after navigation
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-green-500 via-blue-500 to-blue-900 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-4 sm:mb-6">
            India's Trusted Manufacturer of Premium Power Equipment & Energy Solutions
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 text-center max-w-5xl mx-auto leading-relaxed px-4">
            We are a leading manufacturer delivering cutting-edge inverters, batteries, UPS systems, and solar solutions to homes and businesses across India. Our commitment to quality and innovation makes us the preferred choice for reliable power solutions.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Company Details */}
          <div className="lg:col-span-2 space-y-8 lg:space-y-12">
            {/* Company Details Section */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-2 h-6 sm:h-8 bg-blue-600 rounded-full"></div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Company Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Left Column - Certifications */}
                <div>
                  <div className="space-y-4 sm:space-y-6">
                    {/* ISO Certification */}
                    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl border border-blue-100">
                      <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-gray-900 text-base sm:text-lg">ISO 9001:2015 Certified Company</h3>
                        <p className="text-sm sm:text-base text-gray-600 mt-1">Quality Management System Certification</p>
                      </div>
                    </div>

                    {/* Authorized Dealers */}
                    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-green-50 rounded-lg sm:rounded-xl border border-green-100">
                      <Users className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-gray-900 text-base sm:text-lg">500+ Authorized Dealers Pan-India</h3>
                        <p className="text-sm sm:text-base text-gray-600 mt-1">Certified dealer network across all states</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Business Details */}
                <div>
                  <div className="space-y-4 sm:space-y-6">
                    {[
                      { label: "Nature of Business", value: "Manufacturer", icon: <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" /> },
                      { label: "Employees", value: "11 to 25 People", icon: <Users className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" /> },
                      { label: "Legal Status", value: "Proprietorship", icon: <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" /> },
                      { label: "Annual Turnover", value: "40 L - 1.5 Cr", icon: <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" /> }
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 gap-2 sm:gap-0">
                        <div className="flex items-center gap-2 sm:gap-3">
                          {item.icon}
                          <span className="text-sm sm:text-base text-gray-700 font-medium">{item.label}:</span>
                        </div>
                        <span className="font-bold text-sm sm:text-base text-gray-900 sm:text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Get Best Price Now Button */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
                <button 
                  onClick={handleGetBestPrice}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
                >
                  Get Best Price Now
                </button>
              </div>
            </div>

            {/* Contact & GST Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-blue-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Contact Information</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                      <a href="tel:+918045910957" className="text-sm sm:text-base text-gray-700 hover:text-blue-600 font-medium break-all">
                        +91-8045910957
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                      <a href="mailto:info@powersolutionsfactory.in" className="text-sm sm:text-base text-gray-700 hover:text-blue-600 font-medium break-all">
                        info@powersolutionsfactory.in
                      </a>
                    </div>
                    <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-white rounded-lg border border-blue-100">
                      <div className="text-xs sm:text-sm text-gray-600 mb-1">GST Number</div>
                      <div className="text-base sm:text-lg font-bold text-gray-900">07GLDPS6541G2ZS</div>
                      <div className="text-xs sm:text-sm text-green-600 font-medium mt-2">94% Response Rate</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Company Footer</h3>
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                    <div>Powered by DeepSeek</div>
                    <div>Updated Certificates Comp:</div>
                    <div>Emergent | Fullstack App</div>
                    <div>power-solutions-factory</div>
                    <div>Dealer Network Design Up:</div>
                    <div className="break-all">green-power-tech-3.preview.emergentagent.com/#certificates</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6 sm:space-y-8">
            {/* About Our Company Header */}
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">ABOUT OUR COMPANY</h2>
              <div className="w-16 sm:w-24 h-1 bg-white/50 mx-auto rounded-full mb-4 sm:mb-6"></div>
              <p className="text-xs sm:text-sm text-white/90">
                Trusted power solutions manufacturer with nationwide presence
              </p>
            </div>

            {/* Stats Grid */}
            <div className="space-y-4 sm:space-y-6">
              {[
                { value: "15+ Years", label: "Years of Excellence", icon: <Award className="h-6 w-6 sm:h-8 sm:w-8" />, color: "from-blue-500 to-blue-600" },
                { value: "5000+", label: "Happy Customers", icon: <Users className="h-6 w-6 sm:h-8 sm:w-8" />, color: "from-green-500 to-green-600" },
                { value: "500+", label: "Dealer Network", icon: <Shield className="h-6 w-6 sm:h-8 sm:w-8" />, color: "from-purple-500 to-purple-600" },
                { value: "50+", label: "Product Range", icon: <Zap className="h-6 w-6 sm:h-8 sm:w-8" />, color: "from-amber-500 to-amber-600" }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <div className="text-white">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</div>
                    </div>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-gray-800">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Company Details Mini */}
            <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Company Details</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between p-2 sm:p-3 bg-white rounded-lg">
                  <span className="text-xs sm:text-sm text-gray-700">Established:</span>
                  <span className="font-bold text-xs sm:text-sm text-gray-900">2009</span>
                </div>
                <div className="flex items-center justify-between p-2 sm:p-3 bg-white rounded-lg">
                  <span className="text-xs sm:text-sm text-gray-700">Headquarters:</span>
                  <span className="font-bold text-xs sm:text-sm text-gray-900">Delhi, India</span>
                </div>
                <div className="flex items-center justify-between p-2 sm:p-3 bg-white rounded-lg">
                  <span className="text-xs sm:text-sm text-gray-700">Product Range:</span>
                  <span className="font-bold text-xs sm:text-sm text-gray-900">50+ Models</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Our Values & Commitment</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              "Quality First Approach",
              "Customer Satisfaction",
              "Innovation & Technology", 
              "Sustainable Solutions"
            ].map((value, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white/10 rounded-lg sm:rounded-xl backdrop-blur-sm">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-300 flex-shrink-0" />
                <span className="text-sm sm:text-base font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;