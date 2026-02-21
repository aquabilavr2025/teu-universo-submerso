import { Link } from "react-router-dom";
import { Fish, Instagram, Facebook, MessageCircle, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const to = "aquabilavr2025@gmail.com";
    const subject = encodeURIComponent(`Mensagem via site de ${formData.name || "Cliente"}`);
    const body = encodeURIComponent(`Nome: ${formData.name}\nEmail: ${formData.email}\n\nMensagem:\n${formData.message}`);
    const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

    // Open user's mail client with prefilled message
    window.location.href = mailto;

    toast.success("Mensagem preparada no seu cliente de email.");
    setFormData({ name: "", email: "", message: "" });
  };

  const whatsappLink = "https://wa.me/351938589917";
  const instagramLink = "https://www.instagram.com/aquabila_vr/";
  const facebookLink = "https://www.facebook.com/profile.php?id=61587249702662";

  return (
    <footer className="bg-ocean-deep text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-teal flex items-center justify-center shadow-glow">
                <Fish className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-heading text-2xl font-semibold">
                O teu universo submerso
              </span>
            </Link>
            <p className="text-primary-foreground/80 font-body leading-relaxed">
              A tua loja especializada em aquariofilia. Trazemos a beleza do mundo subaquático para a tua casa.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-teal/20 hover:bg-teal flex items-center justify-center transition-smooth"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-teal/20 hover:bg-teal flex items-center justify-center transition-smooth"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-teal/20 hover:bg-teal flex items-center justify-center transition-smooth"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-heading text-xl font-semibold">Navegação</h3>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/", label: "Início" },
                { href: "/peixes", label: "Peixes" },
                { href: "/plantas", label: "Plantas" },
                { href: "/alimentacao", label: "Alimentação" },
                { href: "/condicionadores", label: "Condicionadores" },
                { href: "/equipamentos", label: "Equipamentos" },
                { href: "/substratos", label: "Substratos" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info & Legal */}
          <div className="space-y-6">
            <h3 className="font-heading text-xl font-semibold">Contactos</h3>
            <div className="space-y-4">
              <a
                href="tel:+351938589917"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
              >
                <Phone className="w-5 h-5 text-teal" />
                <span>+351 938 589 917</span>
              </a>
              <a
                href="mailto:aquabilavr2025@gmail.com"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
              >
                <Mail className="w-5 h-5 text-teal" />
                <span>aquabilavr2025@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                <span>Largo do Souto<br />5000-747 Torgueda-Vila Real</span>
              </div>
            </div>

            {/* Legal Links */}
            <div className="pt-4 border-t border-primary-foreground/20">
              <h4 className="font-heading text-lg font-medium mb-3">Informação Legal</h4>
              <nav className="flex flex-col gap-2">
                <Link
                  to="/termos-legais"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                >
                  Termos Legais
                </Link>
                <Link
                  to="/envios-devolucoes"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                >
                  Envios e Devoluções
                </Link>
                <a
                  href="https://www.livroreclamacoes.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                >
                  Livro de Reclamações
                  <ExternalLink className="w-3 h-3" />
                </a>
              </nav>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <h3 className="font-heading text-xl font-semibold">Envie-nos uma mensagem</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Nome"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Textarea
                placeholder="Mensagem"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={3}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 resize-none"
              />
              <Button type="submit" variant="teal" className="w-full">
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} O teu universo submerso. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
