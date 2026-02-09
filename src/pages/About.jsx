import React from 'react';
import { CheckCircle, Award, Users, Shield } from 'lucide-react';

const About = () => {
  const companyDetails = [
    { icon: <Shield />, title: "ISO 9001:2015 Certified", description: "Quality Management System Certification" },
    { icon: <Users />, title: "500+ Authorized Dealers", description: "Pan-India certified dealer network" },
    { icon: <Award />, title: "15+ Years Experience", description: "Industry leadership since 2009" },
    { icon: <CheckCircle />, title: "BIS Approved Products", description: "Meeting national quality benchmarks" },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-neutral-dark mb-4">About Power Solutions Factory</h1>
          <p className="text-xl text-neutral-gray max-w-3xl mx-auto">
            India's trusted manufacturer of premium power equipment & energy solutions.
          </p>
        </div>

        {/* Mission */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-primary-dark to-primary-blue rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg">
              To deliver cutting-edge inverters, batteries, UPS systems, and solar solutions to homes and businesses across India. Our commitment to quality and innovation makes us the preferred choice for reliable power solutions.
            </p>
          </div>
        </div>

        {/* Company Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {companyDetails.map((detail, index) => (
            <div key={index} className="card text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-blue/10 text-primary-blue rounded-full mb-4">
                {detail.icon}
              </div>
              <h3 className="text-lg font-bold text-neutral-dark mb-2">{detail.title}</h3>
              <p className="text-neutral-gray">{detail.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-neutral-light rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-neutral-dark mb-6">Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-neutral-dark mb-3">Business Details</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-neutral-gray">Nature of Business:</span>
                  <span className="font-medium">Manufacturer</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-neutral-gray">Employees:</span>
                  <span className="font-medium">11 to 25 People</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-neutral-gray">Legal Status:</span>
                  <span className="font-medium">Proprietorship</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-dark mb-3">Values & Commitment</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-secondary-green mr-2" />
                  <span>Quality First Approach</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-secondary-green mr-2" />
                  <span>Customer Satisfaction</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-secondary-green mr-2" />
                  <span>Innovation & Technology</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-secondary-green mr-2" />
                  <span>Sustainable Solutions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;