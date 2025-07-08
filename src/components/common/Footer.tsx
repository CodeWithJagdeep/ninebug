import { motion } from "framer-motion";
import Logo from "@/assets/logo4.png";
import { FaDiscord, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  const platformLinks = t("footer.links.platform", {
    returnObjects: true,
  }) as string[];

  const resourceLinks = t("footer.links.resources", {
    returnObjects: true,
  }) as string[];

  const legalLinks = t("footer.links.legal", {
    returnObjects: true,
  }) as string[];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-[#ffffff] border-t border-slate-800"
    >
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-2 lg:gap-2 px-14 pt-16 pb-10">
          {/* Branding */}
          <div className="md:col-span-4">
            <motion.div className="flex items-center space-x-2 mb-4">
              <img src={Logo} alt="app_logo" className="w-44" />
            </motion.div>
            <p className="text-black/70 text-base leading-relaxed max-w-lg">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4 mt-6">
              {[
                { icon: <FaTwitter className="w-4 h-4" />, label: "Twitter" },
                { icon: <FaGithub className="w-4 h-4" />, label: "GitHub" },
                { icon: <FaLinkedin className="w-4 h-4" />, label: "LinkedIn" },
                { icon: <FaDiscord className="w-4 h-4" />, label: "Discord" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={`https://${social.label.toLowerCase()}.com/ninebug`}
                  aria-label={social.label}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-black hover:text-orange-400 hover:bg-slate-700 transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 text-black flex items-center">
              {t("footer.sections.platform")}
            </h3>
            <ul className="space-y-3">
              {platformLinks.map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-black/70 hover:text-orange-400 transition-colors text-sm flex items-center"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 text-black flex items-center">
              {t("footer.sections.resources")}
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-black/70 hover:text-orange-400 transition-colors text-sm flex items-center"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 text-black flex items-center">
              {t("footer.sections.legal")}
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-black/70 hover:text-orange-400 transition-colors text-sm flex items-center"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="py-4 px-16 border-t border-black/30 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-black/70 text-sm mb-4 md:mb-0">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex space-x-6">
            <a
              href="/privacy"
              className="text-black/70 hover:text-black/50 text-sm transition-colors"
            >
              {t("footer.links.privacy")}
            </a>
            <a
              href="/terms"
              className="text-black/70 hover:text-black/50 text-sm transition-colors"
            >
              {t("footer.links.terms")}
            </a>
            <a
              href="/cookies"
              className="text-black/70 hover:text-black/50 text-sm transition-colors"
            >
              {t("footer.links.cookies")}
            </a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;
