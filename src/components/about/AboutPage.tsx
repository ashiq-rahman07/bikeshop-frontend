

const AboutPage = () => {
    return (
      <div className="text-gray-800">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center text-center bg-gray-900 text-white">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1600&h=800&fit=crop"
              alt="About Hero"
              className="w-full h-full object-cover brightness-[0.4]"
            />
          </div>
          <div className="relative z-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-extrabold">About VelocityVibe</h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
              Passion. Precision. Performance. We're here to revolutionize your ride.
            </p>
          </div>
        </section>
  
        {/* Our Story Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Founded in 2010 by motorcycle enthusiasts, VelocityVibe started as a small repair shop in Seattle. Fueled by passion and precision, we quickly became a trusted name in the biking community.
              </p>
              <p className="mb-4 text-gray-700 leading-relaxed">
                By 2015, we expanded into sales and partnered with top manufacturers to offer high-performance bikes. Today, we’re one of the nation’s leading motorcycle retailers with locations across several states.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Despite our growth, our core values remain: passion for bikes, unmatched quality, and customer-first service.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1558980394-dbb977039a2e?w=800&h=600&fit=crop"
                alt="Our Story"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>
  
        {/* Mission Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-700 mb-12">
              Connecting riders with machines that define their lifestyle, and offering support throughout their biking journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Quality Assurance',
                  desc: 'Every bike is rigorously tested for performance and safety before it reaches your hands.',
                  icon: (
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  ),
                },
                {
                  title: 'Customer Focus',
                  desc: 'We tailor every experience to match the lifestyle and needs of our riders.',
                  icon: (
                    <>
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </>
                  ),
                },
                {
                  title: 'Ongoing Support',
                  desc: 'From maintenance to community events, our support continues long after your first ride.',
                  icon: (
                    <>
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    </>
                  ),
                },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the Team</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                The driving force behind VelocityVibe’s success and commitment to excellence.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  name: 'Michael Thompson',
                  role: 'CEO & Founder',
                  img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop',
                },
                {
                  name: 'Sarah Johnson',
                  role: 'Marketing Director',
                  img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
                },
                {
                  name: 'James Rodriguez',
                  role: 'Head Technician',
                  img: 'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=300&h=300&fit=crop',
                },
                {
                  name: 'Emily Chen',
                  role: 'Customer Service Manager',
                  img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
                },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
                  />
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-gray-500">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Experience the VelocityVibe Difference</h2>
            <p className="text-lg mb-8">
              Visit our store or reach out to discover your perfect ride today.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="#"
                className="bg-white text-primary font-medium px-6 py-3 rounded-md hover:bg-gray-100 transition"
              >
                Find a Store
              </a>
              <a
                href="#"
                className="bg-white/10 border border-white text-white font-medium px-6 py-3 rounded-md hover:bg-white/20 transition"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default AboutPage;
  

