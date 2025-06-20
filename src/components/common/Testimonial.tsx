export const PremiumTestimonials = () => {
  return (
    <section className="bg-black text-white py-20 px-4 sm:px-8">
      <div className=" mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-emerald-500/10 text-emerald-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Trusted by Developers Worldwide
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            Building the Future of Tech Education
          </h2>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Join hundreds of developers who are accelerating their learning with
            our platform. We're shaping the next generation of tech education -
            be part of the journey.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              quote: "Feels like having a senior developer guiding me 24/7.",
              text: "I'm solving complex problems in half the time. The personalized feedback is game-changing.",
              author: "Early Beta User",
              role: "Full-stack Developer",
            },
            {
              quote: "The learning paths are incredibly well-structured",
              text: "Finally found a platform that breaks down advanced concepts without oversimplifying them.",
              author: "Discord Community Member",
              role: "Frontend Engineer",
            },
            {
              quote: "Real-time feedback transformed my workflow",
              text: "Submitting code and getting AI-powered analysis within seconds has dramatically improved my skills.",
              author: "Private Alpha Tester",
              role: "Backend Developer",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-emerald-400/30 transition-all duration-300"
            >
              <div className="text-emerald-400 text-xl font-medium mb-4 leading-snug">
                "{testimonial.quote}"
              </div>
              <p className="text-slate-300 mb-6">{testimonial.text}</p>
              <div>
                <div className="text-white font-medium">
                  {testimonial.author}
                </div>
                <div className="text-slate-400 text-sm">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-300 mb-6 text-lg">
            Ready to elevate your development skills?
          </p>
          <button className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20">
            Join Beta Waitlist
            <span className="ml-2">→</span>
          </button>
          <p className="text-slate-400 text-sm mt-4">
            Limited spots available for our next cohort
          </p>
        </div>
      </div>
    </section>
  );
};

export default PremiumTestimonials;
