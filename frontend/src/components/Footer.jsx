import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#003366] text-white py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">

                {/* Logo and Tagline */}
                <div className="space-y-4">
                    <div className="text-2xl font-bold flex items-center gap-2">
                        SWAHILIPOT <span className="text-blue-400">HUB</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                        Empowering youth through technology, arts, and entrepreneurship across East Africa.
                    </p>
                    <div className="flex space-x-4 mt-6">
                        <a href="https://web.facebook.com/Swahilipothub?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors"><i className="fab fa-facebook-f"></i></a>
                        <a href="https://x.com/swahilipothub" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors"><i className="fab fa-x-twitter"></i></a>
                        <a href="https://www.instagram.com/swahilipothub/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors"><i className="fab fa-instagram"></i></a>
                        <a href="https://www.linkedin.com/company/swahilipot-hub/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors"><i className="fab fa-linkedin-in"></i></a>
                        <a href="https://www.youtube.com/@swahilipothubfoundation" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>

                {/* Programs */}
                <div>
                    <h3 className="text-lg font-semibold mb-6">Programs</h3>
                    <ul className="space-y-4 text-gray-300">
                        <li><a href="#" className="hover:text-white transition-colors">Mombasa Tourism Innovation Hub</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Arts & Culture</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Entrepreneurship</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Youth Mentorship</a></li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                    <ul className="space-y-4 text-gray-300">
                        <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Our Impact</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Our Team</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                    </ul>
                </div>

                {/* Contact Information */}
                <div>
                    <h3 className="text-lg font-semibold mb-6">Contact</h3>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start gap-3">
                            <span className="mt-1"><i className="fas fa-map-marker-alt"></i></span>
                            <span>Opp. Governor's Office, Butterfly House, Mombasa, Kenya</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span><i className="fas fa-envelope"></i></span>
                            <a href="mailto:info@swahilipothub.co.ke" className="hover:text-white transition-colors">info@swahilipothub.co.ke</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <span><i className="fas fa-phone"></i></span>
                            <a href="tel:+254114635505" className="hover:text-white transition-colors">+254 11 4635505</a>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                <p>&copy; 2026 Swahilipot Hub Foundation. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
