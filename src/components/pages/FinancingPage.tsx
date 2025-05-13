
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, TrendingUp, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const FinancingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Flexible Page Solutions</h1>
            <p className="text-xl text-gray-300 mb-10">
              Get on the road with financing options tailored to your needs. Low rates, flexible terms, and quick approvals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
                Apply Now
              </Button>
              <Button variant="outline" className="border-white bg-transparent text-white hover:bg-white/10 px-8 py-6 text-lg">
                Calculate Payment
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Financing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We've partnered with leading financial institutions to offer you the best terms possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Competitive Rates</h3>
              <p className="text-gray-600">
                Our partnerships allow us to offer some of the most competitive rates in the industry.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Flexible Terms</h3>
              <p className="text-gray-600">
                Choose from a variety of term lengths to find a monthly payment that fits your budget.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Quick Approvals</h3>
              <p className="text-gray-600">
                Get approved in as little as 30 minutes so you can ride away on your new bike today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Financing Plans */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Financing Plans</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your budget and lifestyle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300">
              <div className="bg-gray-100 py-4 text-center">
                <h3 className="text-xl font-bold">Standard Financing</h3>
              </div>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">5.99%</span>
                  <span className="text-gray-600"> APR</span>
                  <p className="text-sm text-gray-500 mt-2">For qualified buyers</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    <span>Terms up to 60 months</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    <span>Fixed monthly payments</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    <span>No prepayment penalties</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    <span>$0 down for qualified buyers</span>
                  </li>
                </ul>
                
                <div className="text-center">
                  <Button className="w-full bg-primary hover:bg-primary/90">Apply Now</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-2 border-primary relative transform scale-105 shadow-lg">
              <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-semibold">
                POPULAR
              </div>
              <div className="bg-primary text-white py-4 text-center">
                <h3 className="text-xl font-bold">Premium Financing</h3>
              </div>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">3.99%</span>
                  <span className="text-gray-600"> APR</span>
                  <p className="text-sm text-gray-500 mt-2">For qualified buyers</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    <span>Terms up to 72 months</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    <span>Fixed monthly payments</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    <span>No prepayment penalties</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    <span>Free VIP maintenance package</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    <span>Extended warranty options</span>
                  </li>
                </ul>
                
                <div className="text-center">
                  <Button className="w-full">Apply Now</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300">
              <div className="bg-gray-100 py-4 text-center">
                <h3 className="text-xl font-bold">First-Time Buyers</h3>
              </div>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">6.99%</span>
                  <span className="text-gray-600"> APR</span>
                  <p className="text-sm text-gray-500 mt-2">For qualified buyers</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    <span>Terms up to 48 months</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    <span>Lower down payment</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    <span>No prepayment penalties</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span>
                    <span>Free riding lessons</span>
                  </li>
                </ul>
                
                <div className="text-center">
                  <Button className="w-full bg-primary hover:bg-primary/90">Apply Now</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Payment Calculator</h2>
              <p className="text-gray-600 mb-8">
                Use our easy payment calculator to estimate your monthly payments based on motorcycle price, down payment, and term length.
              </p>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Motorcycle Price</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input 
                      type="number" 
                      placeholder="10,000" 
                      className="w-full pl-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input 
                      type="number" 
                      placeholder="1,000" 
                      className="w-full pl-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Term (Months)</label>
                  <select className="w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="36">36 Months (3 Years)</option>
                    <option value="48">48 Months (4 Years)</option>
                    <option value="60">60 Months (5 Years)</option>
                    <option value="72">72 Months (6 Years)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
                  <input 
                    type="number" 
                    placeholder="5.99" 
                    step="0.01"
                    className="w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <Button className="w-full">Calculate Payment</Button>
              </form>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-center">Your Estimated Payment</h3>
              
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-primary">$187</div>
                <p className="text-gray-600 mt-2">per month</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Loan Amount:</span>
                  <span className="font-semibold">$9,000</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="font-semibold">5.99%</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Term Length:</span>
                  <span className="font-semibold">60 months</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Total Interest:</span>
                  <span className="font-semibold">$1,435</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-gray-600">Total Amount Paid:</span>
                  <span className="font-semibold">$10,435</span>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button className="bg-primary hover:bg-primary/90">Apply For This Rate</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Find answers to common questions about our financing options.
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "What credit score do I need to qualify?",
                answer: "While we work with buyers across the credit spectrum, a score of 660 or higher typically qualifies for our best rates. However, we have special programs for first-time buyers and those with less-than-perfect credit."
              },
              {
                question: "How long does the approval process take?",
                answer: "Most applications receive a response within 30 minutes during business hours. In some cases, additional documentation may be required which can extend this timeline."
              },
              {
                question: "Is there a penalty for paying off my loan early?",
                answer: "No, all of our financing options come with no prepayment penalties, so you're free to pay off your loan early and save on interest."
              },
              {
                question: "Can I include accessories and gear in my financing?",
                answer: "Yes! You can finance your motorcycle, accessories, extended warranty, and even riding gear all in one convenient monthly payment."
              },
              {
                question: "Do you offer financing for used motorcycles?",
                answer: "Absolutely! We offer competitive rates on certified pre-owned and quality used motorcycles."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Ride?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Apply today and get pre-approved for your dream motorcycle. Our financing specialists are ready to help you find the perfect payment plan.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold">
              Apply Now
            </Button>
            <Link to="/products">
              <Button variant="outline" className="border-white bg-transparent text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold">
                Browse Motorcycles
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinancingPage ;