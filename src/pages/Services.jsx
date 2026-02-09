import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Wrench, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  GraduationCap,
  Settings,
  Headphones,
  Calendar
} from 'lucide-react';

const Services = () => {
  const mainServices = [
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "Installation Services",
      description: "Professional installation by certified technicians ensuring optimal performance and safety.",
      features: ["Site Assessment", "Professional Setup", "Safety Compliance"],
      cta: "Schedule Installation",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Annual Maintenance",
      description: "Comprehensive maintenance contracts to keep your systems running at peak efficiency.",
      features: ["Regular Checkups", "Preventive Maintenance", "Performance Optimization"],
      cta: "View Plans",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support with quick response times and expert assistance.",
      features: ["Emergency Support", "Technical Assistance", "Remote Diagnostics"],
      cta: "Contact Support",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const additionalServices = [
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Warranty Services",
      description: "Hassle-free warranty claims and replacements with genuine parts guarantee."
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Site Survey",
      description: "Free site assessment and customized solutions based on your power requirements."
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Training Programs",
      description: "Technical training for dealers and technicians on product handling and maintenance."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Emergency Repairs",
      description: "Quick response team for emergency repairs and system restoration."
    }
  ];

  const serviceProcess = [
    {
      step: "01",
      title: "Consultation",
      description: "Discuss your power requirements and site conditions"
    },
    {
      step: "02",
      title: "Site Survey",
      description: "Free technical assessment and solution design"
    },
    {
      step: "03",
      title: "Installation",
      description: "Professional setup by certified technicians"
    },
    {
      step: "04",
      title: "Support",
      description: "Ongoing maintenance and 24/7 technical support"
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-neutral-dark mb-4">OUR SERVICES</h1>
          <p className="text-xl text-neutral-gray max-w-3xl mx-auto">
            Comprehensive Support & Services - From installation to maintenance, we provide end-to-end solutions.
          </p>
        </div>

        {/* Main Services */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-neutral-dark mb-8">
            Core Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <div key={index} className="card hover:shadow-xl transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} text-white rounded-2xl mb-6`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-dark mb-4">{service.title}</h3>
                <p className="text-neutral-gray mb-6">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-neutral-dark mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-neutral-gray">
                        <div className="w-1.5 h-1.5 bg-secondary-green rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className={`btn-primary w-full text-center`}
                >
                  {service.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Service Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-neutral-dark mb-8">
            Our Service Process
          </h2>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 -translate-y-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {serviceProcess.map((process, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative z-10 w-16 h-16 bg-white border-4 border-primary-blue rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-primary-dark">{process.step}</span>
                    </div>
                    <h3 className="text-lg font-bold text-neutral-dark mb-2">{process.title}</h3>
                    <p className="text-neutral-gray text-sm">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-neutral-dark mb-8">
            Additional Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="card hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-blue/10 text-primary-blue rounded-xl mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-neutral-dark mb-3">{service.title}</h3>
                <p className="text-neutral-gray text-sm">{service.description}</p>
                <Link
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="inline-block mt-4 text-primary-blue hover:text-primary-dark font-medium text-sm"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-dark to-primary-blue rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Calendar className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Schedule a Service Today</h2>
            <p className="text-white/90 mb-6">
              Our team of certified technicians is ready to assist you with installation, maintenance, or emergency repairs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+918045910957" className="bg-white text-primary-dark hover:bg-neutral-light font-semibold px-8 py-3 rounded-lg transition-colors">
                Call Now: +91-8045910957
              </a>
              <Link to="/contact" className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg transition-colors">
                Request Service
              </Link>
            </div>
            <p className="text-white/70 text-sm mt-6">
              Response Rate: 94% | Average Response Time: 2 Hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;