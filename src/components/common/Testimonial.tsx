export const PremiumTestimonials = () => {
  return (
    <section className="bg-black text-white py-10 px-20">
      <div className=" mx-auto">
        <div className="text-center mb-16 px-20">
          <span className="inline-block bg-emerald-500/10 text-white border-white border text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Trusted by Developers Worldwide
          </span>
          <h2 className="text-7xl mt-6 text-white">
            Building the Future of Tech Education
          </h2>
          <p className="text-slate-300 text-xl max-w-7xl mx-auto mt-6">
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
              <div className="text-[#f48a1c] text-xl font-medium mb-4 leading-snug">
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
      </div>
    </section>
  );
};

export default PremiumTestimonials;
