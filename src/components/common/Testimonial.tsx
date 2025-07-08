import { useTranslation } from "react-i18next";

export const PremiumTestimonials = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-black text-white py-10 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="mx-auto">
        <div className="text-center mb-16 px-4 sm:px-6 md:px-10 lg:px-20">
          <span className="inline-block bg-emerald-500/10 text-white border-white border text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            {t("testimonials.trusted")}
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl mt-6 text-white">
            {t("testimonials.title")}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mt-6">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              quote: t("testimonials.items.0.quote"),
              text: t("testimonials.items.0.text"),
              author: t("testimonials.items.0.author"),
              role: t("testimonials.items.0.role"),
            },
            {
              quote: t("testimonials.items.1.quote"),
              text: t("testimonials.items.1.text"),
              author: t("testimonials.items.1.author"),
              role: t("testimonials.items.1.role"),
            },
            {
              quote: t("testimonials.items.2.quote"),
              text: t("testimonials.items.2.text"),
              author: t("testimonials.items.2.author"),
              role: t("testimonials.items.2.role"),
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
