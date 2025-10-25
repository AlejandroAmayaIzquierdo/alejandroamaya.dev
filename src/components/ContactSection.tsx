import { motion, useMotionValue, useTransform } from "motion/react";
import { Send, Github, Linkedin } from "lucide-react";
import React, { useEffect, useState } from "react";
import useScroll from "../hooks/useScroll";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { status } = await sendMail(formData);

    console.log("EmailJS response status:", status);

    if (status === 200) toast.success(t("contact.toast.success"));
    else toast.error(t("contact.toast.error"));

    setFormData({ name: "", email: "", message: "" });
  };

  const sendMail = async (data: {
    name: string;
    email: string;
    message: string;
  }) => {
    try {
      const { status, text } = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      return { status, text };
    } catch (error) {
      console.error("EmailJS error:", error);
      return { status: 500, text: "Internal Error" };
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/AlejandroAmayaIzquierdo",
      color: "hover:text-[#333] dark:hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/alejandro-amaya-1168422a2",
      color: "hover:text-[#0077b5]",
    },
  ];

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
          <p className="text-lg md:text-xl text-secondary font-[manrope] max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
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
                className="w-full bg-foreground text-background px-6 py-3 rounded-lg font-semibold font-[manrope] flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors"
              >
                {t("contact.form.sendButton")}
                <Send size={18} />
              </motion.button>
            </form>
          </motion.div>

          {/* Right: Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8 pt-6"
          >
            {/* Info Box */}
            <div className="bg-foreground/5 border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold text-foreground font-[Space-Grotesk-Bold] mb-3">
                {t("contact.infoBox.title")}
              </h3>
              <p className="text-secondary font-[manrope] leading-relaxed">
                {t("contact.infoBox.description")}
              </p>
            </div>

            {/* Response Time Card */}
            {/* <motion.div
              className="bg-primary/10 border border-primary/20 rounded-lg p-6 flex items-start gap-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-primary/20 p-3 rounded-lg">
                <Clock className="text-primary" size={24} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground font-[Space-Grotesk-Bold] mb-1">
                  {t("contact.responseTime.title")}
                </h4>
                <p className="text-sm text-secondary font-[manrope]">
                  {t("contact.responseTime.description")}
                </p>
              </div>
            </motion.div> */}

            {/* Social Links */}
            <div>
              {/* <h3 className="text-xl font-bold text-foreground font-[Space-Grotesk-Bold] mb-4">
                {t("contact.socialLinks.title")}
              </h3> */}
              <div className="grid grid-cols-1 gap-4">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-3 p-4 bg-secondary/10 border border-border rounded-lg hover:border-primary/50 transition-all ${link.color}`}
                    >
                      <Icon size={24} />
                      <span className="font-medium font-[manrope]">
                        {link.name}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-20 pt-8 border-t border-border"
        >
          <p className="text-sm text-secondary font-[manrope]">
            {t("contact.footer.copyright", {
              year: new Date().getFullYear(),
            })}
          </p>
        </motion.div> */}
      </div>
    </motion.section>
  );
};

export default ContactSection;
