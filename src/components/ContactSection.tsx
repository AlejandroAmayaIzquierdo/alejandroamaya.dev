import { motion, useMotionValue, useTransform } from "motion/react";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import useScroll from "../hooks/useScroll";
import { useTranslation } from "react-i18next";

// interface ContactSectionProps {}
const ContactSection: React.FC = () => {
  const { t } = useTranslation();
  const { scroll } = useScroll();
  const scrollMotion = useMotionValue(scroll);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    scrollMotion.set(scroll);
  }, [scroll, scrollMotion]);

  const opacity = useTransform(scrollMotion, [3000, 3500], [0, 1]);
  const y = useTransform(scrollMotion, [3000, 3500], [100, 0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (integrate with your backend or email service)
    console.log("Form submitted:", formData);
    // You can use services like EmailJS, Formspree, or your own API here
    // alert("Thanks for reaching out! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //   const socialLinks = [
  //     {
  //       name: "GitHub",
  //       icon: Github,
  //       url: "https://github.com/AlejandroAmayaIzquierdo",
  //       color: "hover:text-[#333]",
  //     },
  //     {
  //       name: "LinkedIn",
  //       icon: Linkedin,
  //       url: "https://linkedin.com/in/yourusername",
  //       color: "hover:text-[#0077b5]",
  //     },
  //     {
  //       name: "Twitter",
  //       icon: Twitter,
  //       url: "https://twitter.com/yourusername",
  //       color: "hover:text-[#1da1f2]",
  //     },
  //     {
  //       name: "Email",
  //       icon: Mail,
  //       url: "mailto:your.email@example.com",
  //       color: "hover:text-primary",
  //     },
  //   ];

  return (
    <motion.section
      id="contact"
      style={{
        opacity: opacity.get(),
        transform: `translateY(${y.get()}px)`,
      }}
      className="min-h-screen flex items-center justify-center px-4 md:px-8 py-20 bg-background"
    >
      <div className="max-w-6xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-foreground font-[Space-Grotesk-Bold] mb-4">
            {t("contact.title")}
          </h1>
          {/* <p className="text-lg md:text-xl text-muted-foreground font-[manrope] max-w-2xl mx-auto">
            {t('contact.description')}
          </p> */}
        </motion.div>

        <div className="grid gap-12 md:gap-16">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2 font-[manrope]"
                >
                  {t("contact.form.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-foreground"
                  placeholder={t("contact.form.namePlaceholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2 font-[manrope]"
                >
                  {t("contact.form.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-foreground"
                  placeholder={t("contact.form.emailPlaceholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2 font-[manrope]"
                >
                  {t("contact.form.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-foreground"
                  placeholder={t("contact.form.messagePlaceholder")}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-foreground text-primary-foreground px-6 py-3 rounded-lg font-semibold font-[manrope] flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors"
              >
                {t("contact.form.sendButton")}
                <Send size={18} />
              </motion.button>
            </form>
          </motion.div>

          {/* Right: Info & Social Links */}
        </div>

        {/* Footer */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-20 pt-8 border-t border-border"
        >
          <p className="text-sm text-muted-foreground font-[manrope]">
            © {new Date().getFullYear()} Alejandro Amaya. Built with React,
            TypeScript & Tailwind CSS.
          </p>
        </motion.div> */}
      </div>
    </motion.section>
  );
};

export default ContactSection;
