import { useEffect, useState, useRef } from 'react';
import { 
  Menu, X, Github, Linkedin, Instagram, Facebook, 
  Download, Mail, Phone, MapPin, ExternalLink, 
  Code, Smartphone, Palette, Database, Globe, Layers,
  Calculator, CalendarDays
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// LinkedIn URL constant
const LINKEDIN_URL = 'https://www.linkedin.com/in/hamza-sattar-886169362?utm_source=share_via&utm_content=profile&utm_medium=member_android';

// Circular Progress Component
function CircularProgress({ 
  percentage, 
  label, 
  icon: Icon 
}: { 
  percentage: number; 
  label: string; 
  icon: React.ElementType 
}) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#2a2a2a"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isVisible ? strokeDashoffset : circumference}
            className="transition-all duration-1500 ease-out"
            style={{ transitionDuration: '1.5s' }}
          />
        </svg>
        {/* Icon in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-8 h-8 text-gray-400" />
        </div>
      </div>
      <span className="text-blue-500 font-bold text-xl">{percentage}%</span>
      <span className="text-gray-400 text-sm">{label}</span>
    </div>
  );
}

// Navigation Component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="text-2xl font-bold tracking-wider">
            <span className="text-blue-500">HAMZA</span>
            <span className="text-white">SATTAR</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-blue-500 transition-colors text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Contact Button */}
          <a href="#contact" className="hidden md:block">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">
              Contact Me
            </Button>
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-300 hover:text-blue-500 transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a href="#contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4">
                  Contact Me
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const handleDownloadCV = () => {
    toast.info('CV download coming soon!', {
      description: 'Please contact me via email for my CV.',
    });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Greeting */}
          <p className="text-gray-400 text-lg mb-2 animate-fade-in-up">Hi I am</p>
          
          {/* Name */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-fade-in-up stagger-1">
            Hamza Sattar
          </h1>
          
          {/* Title */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-blue-500 mb-8 animate-fade-in-up stagger-2">
            Flutter Developer
          </h2>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-10 animate-fade-in-up stagger-3">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110"
            >
              <Github className="w-5 h-5 text-white" />
            </a>
            <a 
              href={LINKEDIN_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-5 h-5 text-white" />
            </a>
            <a 
              href="https://www.facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110"
            >
              <Facebook className="w-5 h-5 text-white" />
            </a>
            <a 
              href="https://www.instagram.com/h_a_m_z_a_679?igsh=MTJ4c3Bqc2xib2FmNw==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fade-in-up stagger-4">
            <a href="#contact">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-full">
                Contact Me
              </Button>
            </a>
            <Button 
              variant="outline" 
              onClick={handleDownloadCV}
              className="border-2 border-gray-600 text-white hover:border-blue-500 hover:text-blue-500 px-8 py-6 text-lg rounded-full bg-transparent"
            >
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 animate-fade-in-up stagger-5">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-blue-500">1+</p>
              <p className="text-gray-400 text-sm mt-1">Experience</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-blue-500">10+</p>
              <p className="text-gray-400 text-sm mt-1">Projects Done</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-blue-500">80+</p>
              <p className="text-gray-400 text-sm mt-1">Contributions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  const handleDownloadCV = () => {
    toast.info('CV download coming soon!', {
      description: 'Please contact me via email for my CV.',
    });
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Blue glow background */}
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-3xl opacity-30 scale-110" />
              {/* Blue circle */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-900">
                  <img 
                    src="/images/profile.jpg" 
                    alt="Hamza Sattar" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              About <span className="text-blue-500">Me</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              I'm Hamza Sattar, a passionate 22-year-old Flutter Developer dedicated to creating 
              beautiful, functional, and user-friendly mobile applications. With a strong foundation 
              in Dart and Flutter framework, I specialize in building cross-platform apps that 
              deliver exceptional user experiences.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              I enjoy untangling difficult problems to ensure that every app I build is fast, 
              reliable, and easy for people to use. My goal is to transform ideas into reality 
              through clean code and innovative solutions.
            </p>
            
            {/* Personal Info */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <p className="text-gray-500 text-sm">Age</p>
                <p className="text-white font-medium">22 Years</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Experience</p>
                <p className="text-white font-medium">1+ Years</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Location</p>
                <p className="text-white font-medium">Pakistan</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Availability</p>
                <p className="text-white font-medium">Full-time</p>
              </div>
            </div>

            <Button 
              onClick={handleDownloadCV}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8"
            >
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Skills Section
function SkillsSection() {
  const skills = [
    { percentage: 95, label: 'Flutter', icon: Code },
    { percentage: 90, label: 'Dart', icon: Layers },
    { percentage: 85, label: 'Firebase', icon: Database },
    { percentage: 80, label: 'UI/UX Design', icon: Palette },
    { percentage: 75, label: 'REST APIs', icon: Globe },
    { percentage: 70, label: 'Git & GitHub', icon: Github },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My <span className="text-blue-500">Skills</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {skills.map((skill, index) => (
            <CircularProgress 
              key={index}
              percentage={skill.percentage}
              label={skill.label}
              icon={skill.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const services = [
    {
      icon: Smartphone,
      title: 'Flutter App Development',
      description: 'Cross-platform mobile applications built with Flutter for iOS and Android with stunning UI/UX.',
    },
    {
      icon: Code,
      title: 'Dart Programming',
      description: 'Clean, efficient, and maintainable Dart code following best practices and design patterns.',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces designed with user experience as the top priority.',
    },
    {
      icon: Database,
      title: 'Backend Integration',
      description: 'Seamless integration with Firebase, REST APIs, and third-party services.',
    },
    {
      icon: Layers,
      title: 'App Maintenance',
      description: 'Regular updates, bug fixes, and performance optimization for existing applications.',
    },
    {
      icon: Globe,
      title: 'API Development',
      description: 'Custom API design and integration to power your mobile applications.',
    },
  ];

  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My <span className="text-blue-500">Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Solutions I provide for your digital needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-gray-800/50 border border-gray-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                <service.icon className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Section
function ProjectsSection() {
  const projects = [
    {
      title: 'Calculator App',
      description: 'A sleek, gesture-driven calculator with a minimalist UI and fluid Flutter animations. Features scientific calculations, history tracking, and customizable themes.',
      image: '/images/calculator-app.png',
      icon: Calculator,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500',
      tags: ['Flutter', 'Dart', 'Material Design'],
    },
    {
      title: 'Calendar & Scheduler App',
      description: 'A comprehensive calendar and task management application with event scheduling, reminders, and intuitive drag-and-drop functionality.',
      image: '/images/calendar-app.png',
      icon: CalendarDays,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-500',
      tags: ['Flutter', 'Firebase', 'State Management'],
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My <span className="text-blue-500">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Showcasing some of my recent Flutter development work
          </p>
        </div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Project Image */}
              <div className={`relative ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className={`relative rounded-3xl overflow-hidden ${project.bgColor} p-8`}>
                  <div className="absolute top-4 left-4">
                    <project.icon className="w-8 h-8 text-white/80" />
                  </div>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full max-w-xs mx-auto rounded-2xl shadow-2xl"
                  />
                </div>
              </div>

              {/* Project Info */}
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <h3 className={`text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
                  {project.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Project Button - Links to LinkedIn */}
                <a 
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    variant="outline" 
                    className={`border-2 bg-transparent hover:bg-gradient-to-r ${project.color} hover:border-transparent hover:text-white transition-all`}
                  >
                    View Project
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get In <span className="text-blue-500">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Let's work together to bring your ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <a 
            href="mailto:hamzasattar849@gmail.com"
            className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 text-center hover:border-blue-500/50 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/20 transition-colors">
              <Mail className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-white font-semibold mb-2">Email</h3>
            <p className="text-gray-400">hamzasattar849@gmail.com</p>
          </a>

          <a 
            href="tel:03155030161"
            className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 text-center hover:border-blue-500/50 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/20 transition-colors">
              <Phone className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-white font-semibold mb-2">Phone</h3>
            <p className="text-gray-400">03155030161</p>
          </a>

          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 text-center hover:border-blue-500/50 transition-all">
            <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-white font-semibold mb-2">Location</h3>
            <p className="text-gray-400">Pakistan</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6">Connect with me on social media</p>
          <div className="flex justify-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110"
            >
              <Github className="w-6 h-6 text-white" />
            </a>
            <a 
              href={LINKEDIN_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-6 h-6 text-white" />
            </a>
            <a 
              href="https://www.facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110"
            >
              <Facebook className="w-6 h-6 text-white" />
            </a>
            <a 
              href="https://www.instagram.com/h_a_m_z_a_679?igsh=MTJ4c3Bqc2xib2FmNw==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110"
            >
              <Instagram className="w-6 h-6 text-white" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-2xl font-bold">
            <span className="text-blue-500">HAMZA</span>
            <span className="text-white">SATTAR</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 Hamza Sattar. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#home" className="text-gray-400 hover:text-blue-500 transition-colors text-sm">
              Home
            </a>
            <a href="#about" className="text-gray-400 hover:text-blue-500 transition-colors text-sm">
              About
            </a>
            <a href="#projects" className="text-gray-400 hover:text-blue-500 transition-colors text-sm">
              Projects
            </a>
            <a href="#contact" className="text-gray-400 hover:text-blue-500 transition-colors text-sm">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
