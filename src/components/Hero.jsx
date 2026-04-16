import { useEffect, useRef, useState } from 'react';
import heroImg from '../assets/hero-Images.png';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };

    const imageElement = imageRef.current;
    if (imageElement) {
      imageElement.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (imageElement) {
        imageElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] bg-white overflow-hidden pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0e8fa3]/5 rounded-full blur-3xl animate-float animate-delay-0"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0e8fa3]/3 rounded-full blur-3xl animate-float animate-delay-200"></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-amber-400/5 rounded-full blur-3xl animate-float animate-delay-400"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] bg-[#0e8fa3]/2 rounded-full blur-2xl animate-morph animate-delay-600"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className={`lg:col-span-7 order-2 lg:order-1 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-[#0e8fa3]/10 text-[#0e8fa3] px-4 py-2 rounded-full text-sm font-medium mb-6 animate-float-in hover:animate-glow-pulse transition-all duration-300">
              <span className="w-2 h-2 bg-[#0e8fa3] rounded-full animate-pulse"></span>
              الخبير العقاري الأول في المنطقة
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              حقق حلم{" "}
              <span className="text-[#0e8fa3] relative">
                <span className="relative z-10">إمتلاك منزلك</span>
                <span className="absolute -inset-1 bg-[#0e8fa3]/10 rounded-lg animate-pulse"></span>
              </span>
              {" "}اليوم
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-xl leading-relaxed">
              نوفر لك أفضل العقارات بأسعار منافسة. فريقنا المتخصص يضمن لك تجربة عقارية سلسة وآمنة نحو حلمك الجديد.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="group bg-[#0e8fa3] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#0a7580] transition-all duration-300 shadow-lg shadow-[#0e8fa3]/20 hover:shadow-xl hover:shadow-[#0e8fa3]/30 hover:scale-105 flex items-center justify-center gap-2">
                <svg className="w-5 h-5 group-hover:animate-bounce-subtle transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                استكشف العقارات
              </button>
              <button className="group bg-white text-gray-700 border-2 border-gray-200 px-8 py-4 rounded-2xl font-semibold hover:border-[#0e8fa3] hover:text-[#0e8fa3] transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105">
                <svg className="w-5 h-5 group-hover:animate-bounce-subtle transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                احجز استشارة
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 hover:scale-110 hover:z-10 transition-transform cursor-pointer">
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <div className="font-bold text-gray-900">500+ عميل سعيد</div>
                <div className="text-sm text-gray-500">تقييمات إيجابية</div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-400 animate-bounce-subtle" style={{ animationDelay: `${i * 0.1}s` }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm font-medium text-gray-700 mr-1">4.9</span>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-5 order-1 lg:order-2 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              <div 
                ref={imageRef}
                onMouseLeave={handleMouseLeave}
                className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#0e8fa3]/5 via-transparent to-transparent z-10 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src={heroImg} 
                  alt="مستشارك العقاري" 
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 border-2 border-white/20 rounded-3xl pointer-events-none"></div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl animate-float-in hover:animate-glow-pulse transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#0e8fa3]/10 rounded-full flex items-center justify-center animate-bounce-subtle">
                    <svg className="w-6 h-6 text-[#0e8fa3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">200+ صفقة</div>
                    <div className="text-sm text-gray-500">ناجحة</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg animate-float-in animate-delay-200">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">موثوق</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { number: '10+', label: 'سنوات خبرة', icon: <svg className="w-8 h-8 text-[#0e8fa3]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
            { number: '500+', label: 'عميل سعيد', icon: <svg className="w-8 h-8 text-[#0e8fa3]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
            { number: '200+', label: 'صفقة ناجحة', icon: <svg className="w-8 h-8 text-[#0e8fa3]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
            { number: '98%', label: 'رضا العملاء', icon: <svg className="w-8 h-8 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg> }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl hover:shadow-[#0e8fa3]/20 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-2 group-hover:animate-bounce-subtle transition-transform">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-[#0e8fa3] mb-1 group-hover:scale-110 transition-transform">{stat.number}</div>
              <div className="text-gray-500 text-sm group-hover:text-[#0e8fa3] transition-colors">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}