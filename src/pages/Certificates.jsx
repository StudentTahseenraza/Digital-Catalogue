import React, { useState } from 'react';
import {
  Award,
  ChevronRight,
  Check,
  ExternalLink,
  Download
} from 'lucide-react';

// Import certificate images (you'll need to add these images to your project)
// For demo purposes, I'm using placeholder image URLs
const certificateImages = {
  iso9001: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop",
  excellenceAward: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w-800&auto=format&fit=crop",
  dealerNetwork: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w-800&auto=format&fit=crop",
  bisCertification: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w-800&auto=format&fit=crop",
  manufacturerAward: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w-800&auto=format&fit=crop",
  yearsExcellence: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w-800&auto=format&fit=crop"
};

const Certificates = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  const certificates = [
    {
      id: 1,
      title: "ISO 9001:2015 Certified",
      category: "quality",
      description: "Quality Management System Certification ensuring highest standards in manufacturing",
      shortDesc: "Quality Management System Certification ensuring:",
      year: "2024",
      issuer: "International Standards Organization",
      verification: "Certificate No: ISO9001-2024-0567",
      image: certificateImages.iso9001,
      featured: true,
    },
    {
      id: 2,
      title: "Excellence Award 2024",
      category: "award",
      description: "Recognized for outstanding contribution to the power solutions industry",
      shortDesc: "Recognized for outstanding contribution to the power solutions industry",
      year: "2024",
      issuer: "Energy Excellence Federation",
      verification: "Award ID: EEF-2024-089",
      image: certificateImages.excellenceAward,
      featured: true,
    },
    {
      id: 3,
      title: "Authorized Dealer Network",
      category: "recognition",
      description: "Pan-India certified dealer network with 500+ authorized partners",
      shortDesc: "Pan-India certified dealer network with 500+ authorized partners",
      year: "2024",
      issuer: "National Dealer Association",
      verification: "NAD Certified Network",
      image: certificateImages.dealerNetwork,
    },
    {
      id: 4,
      title: "BIS Certification",
      category: "quality",
      description: "Bureau of Indian Standards certified products meeting national quality benchmarks",
      shortDesc: "Bureau of Indian Standards certified products meeting national quality benchmarks",
      year: "2023",
      issuer: "Bureau of Indian Standards",
      verification: "BIS Mark: IS 1651",
      image: certificateImages.bisCertification,
    },
    {
      id: 5,
      title: "Top Manufacturer Award",
      category: "award",
      description: "Awarded as one of the top power equipment manufacturers in North India",
      shortDesc: "Awarded as one of the top power equipment manufacturers in North India",
      year: "2023",
      issuer: "Industrial Excellence Council",
      verification: "TOP OF INDIA 2023",
      image: certificateImages.manufacturerAward,
    },
    {
      id: 6,
      title: "15 Years of Excellence",
      category: "milestone",
      description: "Celebrating 15 years of delivering premium power solutions across India",
      shortDesc: "Celebrating 15 years of delivering premium power solutions across India",
      year: "2024",
      issuer: "Industry Recognition Board",
      verification: "PREMIUM QUALITY 2024",
      image: certificateImages.yearsExcellence,
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Certificates', count: certificates.length },
    { id: 'quality', label: 'Quality Certifications', count: certificates.filter(c => c.category === 'quality').length },
    { id: 'award', label: 'Awards & Recognition', count: certificates.filter(c => c.category === 'award').length },
    { id: 'recognition', label: 'Recognition', count: certificates.filter(c => c.category === 'recognition').length },
    { id: 'milestone', label: 'Milestones', count: certificates.filter(c => c.category === 'milestone').length },
  ];

  const filteredCertificates =
    activeTab === 'all'
      ? certificates
      : certificates.filter(cert => cert.category === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-900 rounded-full mb-6 shadow-lg">
            <Award className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">TRUST & CREDIBILITY</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Dealer Certificates & Accreditations</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our certifications and awards reflect our commitment to quality, reliability, and customer satisfaction in the power solutions industry.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 border ${activeTab === tab.id
                ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:shadow-md'
                }`}
            >
              <span className="font-semibold">{tab.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100 text-gray-600'
                }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Certificates Grid with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredCertificates.map((cert) => (
            <div
              key={cert.id}
              className="group relative"
              onMouseEnter={() => setHoveredCard(cert.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Container */}
              <div className={`
                bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl 
                transition-all duration-500 transform group-hover:-translate-y-1
                border border-gray-200 hover:border-gray-900
                ${hoveredCard === cert.id ? 'border-gray-900' : ''}
              `}>

                {/* Image Container with Zoom Effect */}
                <div className="relative h-56 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gray-100 transition-all duration-700 ease-out
                      ${hoveredCard === cert.id ? 'scale-110' : 'scale-100'}
                    `}
                    style={{
                      backgroundImage: `url(${cert.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Featured Badge */}
                  {cert.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 shadow-md">
                        <Award className="h-3 w-3" />
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Year Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                    <span className="text-sm font-bold text-gray-900">{cert.year}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                    {cert.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Bullet Points (for ISO certificate) */}
                  {cert.bulletPoints && (
                    <ul className="space-y-2 mb-4">
                      {cert.bulletPoints.map((point, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <Check className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Verification Code */}
                  <div className="mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <code className="text-xs text-gray-600 font-mono">{cert.verification}</code>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button className="flex-1 flex items-center justify-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg transition-all duration-300">
                      <ExternalLink className="h-4 w-4" />
                      <span className="text-sm font-medium">View Certificate</span>
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Thin Border Effect on Hover */}
                <div className={`
                  absolute inset-0 border-2 border-transparent rounded-xl
                  transition-all duration-300 pointer-events-none
                  ${hoveredCard === cert.id ? 'border-gray-900' : ''}
                `} />
              </div>
            </div>
          ))}
        </div>

        {/* Dealer Network Section */}
        <div className="
  relative
  bg-gradient-to-br 
  from-blue-100/70 
  via-white 
  to-emerald-100/70
  rounded-3xl 
  p-10 
  shadow-2xl 
  mb-20 
  border border-blue-200
">

          {/* Soft inner overlay for depth */}
          <div className="absolute inset-0 rounded-3xl bg-white/40 pointer-events-none" />

          <div className="relative max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* LEFT CONTENT */}
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-5">
                  Join Our Trusted Dealer Network
                </h3>

                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                  Become an authorized dealer and grow your business with India’s
                  leading power solutions manufacturer.
                </p>

                {/* BENEFITS */}
                <div className="mb-10">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    Dealer Benefits:
                  </h4>

                  <ul className="grid grid-cols-2 gap-4">
                    {[
                      "Certified Products",
                      "Technical Training",
                      "Marketing Support",
                      "Competitive Pricing",
                      "Warranty Coverage",
                      "Business Growth",
                    ].map((benefit, idx) => (
                      <li
                        key={idx}
                        className="
                  flex items-center gap-3 
                  bg-white 
                  px-4 py-3 
                  rounded-xl 
                  shadow-sm 
                  hover:shadow-md 
                  transition
                "
                      >
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-gray-800 font-medium">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA BUTTON */}
                <button
                  className="
            bg-gradient-to-r 
            from-blue-600 
            to-green-500
            hover:from-green-500 
            hover:to-blue-600
            text-white 
            font-bold 
            px-8 py-4 
            rounded-xl 
            text-lg 
            flex items-center gap-2
            transition-all duration-300
            transform hover:scale-105
            shadow-lg hover:shadow-2xl
          "
                >
                  Become a Dealer
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* RIGHT – CERTIFICATE GRID */}
              <div className="grid grid-cols-2 gap-5">
                {certificates.slice(0, 4).map((cert, idx) => (
                  <div
                    key={idx}
                    className="
              relative 
              rounded-2xl 
              overflow-hidden 
              shadow-lg 
              group
            "
                  >
                    {/* IMAGE */}
                    <div
                      className="
                h-44 
                bg-cover bg-center
                transform 
                transition-transform duration-500
                group-hover:scale-110
              "
                      style={{ backgroundImage: `url(${cert.image})` }}
                    />

                    {/* GRADIENT OVERLAY */}
                    <div className="
              absolute inset-0 
              bg-gradient-to-t 
              from-blue-900/70 
              via-green-800/40 
              to-transparent
            " />

                    {/* TEXT */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="text-white text-sm font-semibold tracking-wide">
                        {cert.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>



        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Years of Excellence", value: "15+" },
            { label: "Quality Certifications", value: "12+" },
            { label: "Industry Awards", value: "8+" },
            { label: "Certified Products", value: "50+" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow border border-gray-200 group hover:border-gray-900"
            >
              <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-500 text-sm border-t border-gray-200 pt-8">
          <p>All certificates are verified and can be authenticated through their respective issuing authorities.</p>
        </div>

      </div>
    </div>
  );
};

export default Certificates;